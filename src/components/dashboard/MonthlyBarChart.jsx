import React from "react";
import { useApp } from "../../context/AppContext";
import { groupByMonth, fmt } from "../../utils/helpers";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`rounded-xl p-3 shadow-xl border text-xs ${
      darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
    }`}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium">{fmt(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function MonthlyBarChart() {
  const { state } = useApp();
  const { darkMode, transactions } = state;
  const data = groupByMonth(transactions);

  if (!data.length) return null;

  return (
    <div className={`rounded-2xl p-5 border transition-colors ${
      darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm"
    }`}>
      <div className="mb-4">
        <h3 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
          Net Balance by Month
        </h3>
        <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          Monthly savings trend
        </p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 11 }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 11 }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => fmt(v, true)}
            width={55}
          />
          <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
          <Bar dataKey="balance" radius={[4, 4, 0, 0]} name="balance">
            {data.map(({ balance }, i) => (
              <Cell key={i} fill={balance >= 0 ? "#10b981" : "#ef4444"} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
