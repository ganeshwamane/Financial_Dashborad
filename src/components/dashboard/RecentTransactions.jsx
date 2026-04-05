import React from "react";
import { useApp } from "../../context/AppContext";
import { fmt, fmtDate } from "../../utils/helpers";
import { CATEGORIES } from "../../data/mockData";
import { ArrowRight } from "lucide-react";

export default function RecentTransactions() {
  const { state, dispatch } = useApp();
  const { darkMode, transactions } = state;

  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className={`rounded-2xl p-5 border transition-colors ${
      darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm"
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Recent Transactions
          </h3>
          <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Latest activity
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: "SET_TAB", payload: "transactions" })}
          className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          View all <ArrowRight size={12} />
        </button>
      </div>

      {recent.length === 0 ? (
        <p className={`text-center py-8 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          No transactions yet
        </p>
      ) : (
        <div className="space-y-1">
          {recent.map((tx) => {
            const cat = CATEGORIES[tx.category];
            return (
              <div
                key={tx.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                  darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0`}
                  style={{ background: `${cat?.color}22` }}>
                  {cat?.icon || "•"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    {tx.description}
                  </p>
                  <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    {fmtDate(tx.date)}
                  </p>
                </div>
                <span className={`text-sm font-semibold flex-shrink-0 ${
                  tx.type === "income" ? "text-emerald-400" : darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  {tx.type === "income" ? "+" : "-"}{fmt(tx.amount, true)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
