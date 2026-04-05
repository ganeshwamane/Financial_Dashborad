import React from "react";
import { useApp } from "../../context/AppContext";
import { groupByMonth, fmt } from "../../utils/helpers";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`rounded-xl p-3 shadow-xl border text-xs ${
      darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
    }`}>
      <p className="font-semibold mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium">{fmt(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function BalanceTrend() {
  const { state } = useApp();
  const { darkMode, transactions } = state;
  const data = groupByMonth(transactions);

  if (!data.length) {
    return (
      <div className={`rounded-2xl p-6 border ${darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200"}`}>
        <p className={`text-center py-12 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No data to display</p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl p-5 border transition-colors ${
      darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm"
    }`}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Monthly Cash Flow
          </h3>
          <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Income vs Expenses over time
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}   />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#f0f0f0"}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => fmt(v, true)}
            width={55}
          />
          <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
          <Legend
            wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
            formatter={(v) => <span style={{ color: darkMode ? "#9ca3af" : "#6b7280", textTransform: "capitalize" }}>{v}</span>}
          />
          <Area type="monotone" dataKey="income"   stroke="#10b981" strokeWidth={2} fill="url(#incomeGrad)"  name="income"   dot={false} activeDot={{ r: 4, fill: "#10b981" }} />
          <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fill="url(#expenseGrad)" name="expenses" dot={false} activeDot={{ r: 4, fill: "#ef4444" }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
