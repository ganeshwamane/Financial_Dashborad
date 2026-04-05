import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { groupByCategory, fmt } from "../../utils/helpers";
import { CATEGORIES } from "../../data/mockData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, darkMode }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className={`rounded-xl p-3 shadow-xl border text-xs ${
      darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
    }`}>
      <p className="font-semibold">{CATEGORIES[d.name]?.label || d.name}</p>
      <p className="mt-1">{fmt(d.value)}</p>
    </div>
  );
};

export default function SpendingBreakdown() {
  const { state } = useApp();
  const { darkMode, transactions } = state;
  const [active, setActive] = useState(null);
  const data = groupByCategory(transactions).slice(0, 8);

  if (!data.length) {
    return (
      <div className={`rounded-2xl p-6 border ${darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200"}`}>
        <p className={`text-center py-12 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No expense data</p>
      </div>
    );
  }

  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className={`rounded-2xl p-5 border transition-colors ${
      darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm"
    }`}>
      <div className="mb-4">
        <h3 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Spending Breakdown
        </h3>
        <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          By category
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative w-40 h-40 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={45} outerRadius={65}
                dataKey="amount"
                nameKey="category"
                onMouseEnter={(_, i) => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {data.map(({ category }, i) => (
                  <Cell
                    key={category}
                    fill={CATEGORIES[category]?.color || "#6b7280"}
                    opacity={active === null || active === i ? 1 : 0.4}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Total</span>
            <span className={`text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {fmt(total, true)}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-1.5 max-h-44 overflow-y-auto">
          {data.map(({ category, amount }, i) => {
            const cat = CATEGORIES[category];
            const pct = Math.round((amount / total) * 100);
            return (
              <div
                key={category}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-default transition-colors
                  ${active === i ? (darkMode ? "bg-gray-700/50" : "bg-gray-50") : ""}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="text-sm flex-shrink-0">{cat?.icon || "•"}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-xs font-medium truncate ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {cat?.label || category}
                    </span>
                    <span className={`text-xs flex-shrink-0 ml-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className={`w-full h-1 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <div
                      className="h-1 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, background: cat?.color || "#6b7280" }}
                    />
                  </div>
                </div>
                <span className={`text-xs flex-shrink-0 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {fmt(amount, true)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
