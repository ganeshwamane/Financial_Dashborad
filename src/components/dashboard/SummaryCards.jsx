import React from "react";
import { useApp } from "../../context/AppContext";
import { fmt } from "../../utils/helpers";
import { TrendingUp, TrendingDown, PiggyBank, Star } from "lucide-react";

export default function SummaryCards() {
  const { summary, state } = useApp();
  const { income, expenses } = summary;
  const { darkMode, transactions } = state;
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
  const incomeCount = (state.transactions || []).filter((t) => t.type === "income").length;
  const expenseCount = (state.transactions || []).filter((t) => t.type === "expense").length;

  const civicScore = Math.min(100, Math.max(45, Math.round(savingsRate + 40)));

  const cards = [
    {
      label: "Total Income",
      value: fmt(income),
      sub: `${incomeCount} transactions`,
      icon: TrendingDown,
      color: "green",
      positive: true,
    },
    {
      label: "Total Expenses",
      value: fmt(expenses),
      sub: `${expenseCount} transactions`,
      icon: TrendingUp,
      color: "red",
      positive: false,
    },
    {
      label: "Net Savings",
      value: fmt(income - expenses),
      sub: income > 0 ? `${savingsRate}% of income` : "No income recorded",
      icon: PiggyBank,
      color: income - expenses >= 0 ? "emerald" : "red",
      positive: income - expenses >= 0,
    },
    {
      label: "Civil Score",
      value: `${civicScore}`,
      sub: "Based on spending habits",
      icon: Star,
      color: "blue",
      positive: true,
    },
  ];

  const colorMap = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    green:   { bg: "bg-green-500/10",   text: "text-green-400",   border: "border-green-500/20"   },
    red:     { bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/20"     },
    blue:    { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/20"    },
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, icon: Icon, color, positive }) => {
        const c = colorMap[color];
        return (
          <div
            key={label}
            className={`
              relative rounded-2xl p-5 border transition-all duration-200 hover:scale-[1.02]
              ${darkMode
                ? `bg-gray-800/60 border-gray-700/50 hover:border-gray-600`
                : `bg-white border-gray-200 hover:border-gray-300 shadow-sm`}
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                {label}
              </p>
              <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                <Icon size={16} className={c.text} />
              </div>
            </div>
            <p className={`text-2xl font-bold mb-1 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {value}
            </p>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{sub}</p>

            {/* Bottom accent bar */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl ${c.bg}`} />
          </div>
        );
      })}
    </div>
  );
}
