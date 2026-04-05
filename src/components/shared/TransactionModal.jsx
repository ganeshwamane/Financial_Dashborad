import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import { X } from "lucide-react";

const EMPTY = {
  description: "",
  amount: "",
  category: "food",
  type: "expense",
  date: new Date().toISOString().split("T")[0],
};

export default function TransactionModal({ editData, onClose }) {
  const { dispatch, state } = useApp();
  const { darkMode } = state;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) setForm({ ...editData, amount: String(editData.amount) });
  }, [editData]);

  const set = (k, v) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    if (!validate()) return;
    const payload = { ...form, amount: Number(form.amount) };
    dispatch({
      type: editData ? "EDIT_TRANSACTION" : "ADD_TRANSACTION",
      payload: editData ? { ...payload, id: editData.id } : payload,
    });
    onClose();
  };

  const field = (label, key, type = "text", placeholder = "") => (
    <div>
      <label className={`block text-xs font-medium mb-1.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all border
          ${errors[key] ? "border-red-500" : darkMode ? "border-gray-600 focus:border-emerald-500" : "border-gray-200 focus:border-emerald-500"}
          ${darkMode ? "bg-gray-700 text-white placeholder-gray-500" : "bg-gray-50 text-gray-900 placeholder-gray-400"}
        `}
      />
      {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-md rounded-2xl shadow-2xl border z-10
          ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <h2 className={`text-base font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {editData ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
              ${darkMode ? "hover:bg-gray-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {field("Description", "description", "text", "e.g. Grocery Store")}

          <div className="grid grid-cols-2 gap-3">
            {field("Amount (₹)", "amount", "number", "0")}
            {field("Date", "date", "date")}
          </div>

          {/* Type toggle */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Type
            </label>
            <div className={`flex rounded-xl p-1 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              {["expense", "income"].map((t) => (
                <button
                  key={t}
                  onClick={() => set("type", t)}
                  className={`
                    flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all
                    ${form.type === t
                      ? t === "expense"
                        ? "bg-red-500 text-white shadow-sm"
                        : "bg-emerald-500 text-white shadow-sm"
                      : darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}
                  `}
                >
                  {t === "expense" ? "↑ Expense" : "↓ Income"}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Category
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => set("category", key)}
                  title={cat.label}
                  className={`
                    flex flex-col items-center py-2 px-1 rounded-xl text-xs transition-all border
                    ${form.category === key
                      ? "border-transparent shadow-sm"
                      : darkMode ? "border-gray-600 hover:border-gray-500" : "border-gray-200 hover:border-gray-300"}
                  `}
                  style={form.category === key ? { background: `${cat.color}22`, borderColor: cat.color } : {}}
                >
                  <span className="text-base">{cat.icon}</span>
                </button>
              ))}
            </div>
            <p className={`text-xs mt-1.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Selected: {CATEGORIES[form.category]?.label}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex gap-2 px-5 py-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
          <button
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors
              ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
          >
            {editData ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
