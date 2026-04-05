import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import { generateTransactions, MOCK_USERS } from "../data/mockData";

const AppContext = createContext();

const initialState = {
  transactions: [],
  role: "admin",
  currentUser: MOCK_USERS.admin,
  darkMode: true,
  activeTab: "dashboard",
  filters: {
    search: "",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
    sortBy: "date",
    sortOrder: "desc",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, transactions: action.payload };

    case "ADD_TRANSACTION": {
      const tx = { ...action.payload, id: String(Date.now()) };
      const next = [tx, ...state.transactions];
      localStorage.setItem("fd_transactions", JSON.stringify(next));
      return { ...state, transactions: next };
    }

    case "EDIT_TRANSACTION": {
      const next = state.transactions.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      localStorage.setItem("fd_transactions", JSON.stringify(next));
      return { ...state, transactions: next };
    }

    case "DELETE_TRANSACTION": {
      const next = state.transactions.filter((t) => t.id !== action.payload);
      localStorage.setItem("fd_transactions", JSON.stringify(next));
      return { ...state, transactions: next };
    }

    case "SET_ROLE":
      return { ...state, role: action.payload, currentUser: MOCK_USERS[action.payload] };

    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, [action.key]: action.value } };

    case "RESET_FILTERS":
      return { ...state, filters: { ...initialState.filters } };

    case "TOGGLE_DARK":
      return { ...state, darkMode: !state.darkMode };

    case "SET_TAB":
      return { ...state, activeTab: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("fd_transactions");
    if (saved) {
      try { dispatch({ type: "INIT", payload: JSON.parse(saved) }); }
      catch { dispatch({ type: "INIT", payload: generateTransactions() }); }
    } else {
      const data = generateTransactions();
      dispatch({ type: "INIT", payload: data });
      localStorage.setItem("fd_transactions", JSON.stringify(data));
    }
  }, []);

  const filteredTransactions = useMemo(() => {
    let list = [...state.transactions];
    const { search, type, category, dateFrom, dateTo, sortBy, sortOrder } = state.filters;
    if (search) list = list.filter((t) =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    );
    if (type !== "all") list = list.filter((t) => t.type === type);
    if (category !== "all") list = list.filter((t) => t.category === category);
    if (dateFrom) list = list.filter((t) => t.date >= dateFrom);
    if (dateTo) list = list.filter((t) => t.date <= dateTo);
    list.sort((a, b) => {
      let va = sortBy === "amount" ? Number(a[sortBy]) : a[sortBy];
      let vb = sortBy === "amount" ? Number(b[sortBy]) : b[sortBy];
      return sortOrder === "asc" ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return list;
  }, [state.transactions, state.filters]);

  const summary = useMemo(() => {
    const income = state.transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = state.transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [state.transactions]);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions, summary }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
