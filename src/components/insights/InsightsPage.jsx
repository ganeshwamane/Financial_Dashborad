import React from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import { fmt, groupByMonth, groupByCategory } from "../../utils/helpers";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, Cell
} from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Info } from "lucide-react";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={`rounded-xl p-3 shadow-xl border text-xs ${
      darkMode ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-800"
    }`}>
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: p.fill || p.color }} />
          <span className="capitalize">{p.name}:</span>
          <span className="font-medium">{fmt(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function InsightsPage() {
  const { state } = useApp();
  const { darkMode, transactions } = state;

  const monthly = groupByMonth(transactions);
  const catData = groupByCategory(transactions);
  const totalExpenses = catData.reduce((s, d) => s + d.amount, 0);
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);

  const topCat = catData[0];
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  // Month-over-month comparison (last 2 months)
  const lastTwo = monthly.slice(-2);
  const momChange = lastTwo.length === 2
    ? Math.round(((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100)
    : null;

  // Best month (highest savings)
  const bestMonth = [...monthly].sort((a, b) => b.balance - a.balance)[0];
  const worstMonth = [...monthly].sort((a, b) => a.balance - b.balance)[0];

  // Radar chart data (top 6 expense cats)
  const radarData = catData.slice(0, 6).map(({ category, amount }) => ({
    cat: CATEGORIES[category]?.icon + " " + (CATEGORIES[category]?.label?.split(" ")[0] || category),
    value: amount,
  }));

  const card = `rounded-2xl border p-5 transition-colors ${darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm"}`;
  const titleCls = `text-sm font-semibold mb-0.5 ${darkMode ? "text-white" : "text-gray-900"}`;
  const subCls = `text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`;

  const insights = [
    topCat && {
      icon: AlertCircle,
      color: "orange",
      title: `Top spending: ${CATEGORIES[topCat.category]?.label}`,
      body: `You spent ${fmt(topCat.amount)} — ${Math.round((topCat.amount / totalExpenses) * 100)}% of total expenses.`,
    },
    momChange !== null && {
      icon: momChange > 0 ? TrendingUp : TrendingDown,
      color: momChange > 0 ? "red" : "green",
      title: `Expenses ${momChange > 0 ? "up" : "down"} ${Math.abs(momChange)}% this month`,
      body: `${lastTwo[1].label}: ${fmt(lastTwo[1].expenses, true)} vs ${lastTwo[0].label}: ${fmt(lastTwo[0].expenses, true)}`,
    },
    savingsRate >= 20 && {
      icon: CheckCircle,
      color: "green",
      title: `Great savings rate: ${savingsRate}%`,
      body: "You're saving more than 20% of your income. Keep it up!",
    },
    savingsRate < 10 && savingsRate >= 0 && {
      icon: AlertCircle,
      color: "red",
      title: `Low savings rate: ${savingsRate}%`,
      body: "Try to aim for at least 20% savings. Review discretionary spending.",
    },
    bestMonth && {
      icon: Info,
      color: "blue",
      title: `Best month: ${bestMonth.label}`,
      body: `Saved ${fmt(bestMonth.balance, true)} — income ${fmt(bestMonth.income, true)} minus expenses ${fmt(bestMonth.expenses, true)}.`,
    },
  ].filter(Boolean);

  const colorMap = {
    orange: { bg: "bg-orange-500/10", text: "text-orange-400" },
    red:    { bg: "bg-red-500/10",    text: "text-red-400"    },
    green:  { bg: "bg-emerald-500/10", text: "text-emerald-400" },
    blue:   { bg: "bg-blue-500/10",   text: "text-blue-400"   },
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Insights</h1>
        <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          Smart observations from your financial data
        </p>
      </div>

      {/* Key Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map(({ icon: Icon, color, title, body }, i) => {
          const c = colorMap[color];
          return (
            <div key={i} className={card}>
              <div className={`w-8 h-8 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
                <Icon size={16} className={c.text} />
              </div>
              <p className={`text-sm font-semibold mb-1 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{title}</p>
              <p className={`text-xs leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{body}</p>
            </div>
          );
        })}
      </div>

      {/* Monthly Comparison Chart */}
      <div className={card}>
        <div className="mb-4">
          <h3 className={titleCls}>Monthly Comparison</h3>
          <p className={subCls}>Income vs Expenses per month</p>
        </div>
        {monthly.length === 0 ? (
          <p className={`text-center py-8 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthly} barGap={4} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#f0f0f0"} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => fmt(v, true)} width={55} />
              <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
              <Bar dataKey="income"   fill="#10b981" fillOpacity={0.85} radius={[4, 4, 0, 0]} name="income"   barSize={16} />
              <Bar dataKey="expenses" fill="#ef4444" fillOpacity={0.85} radius={[4, 4, 0, 0]} name="expenses" barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Categories Table */}
        <div className={card}>
          <div className="mb-4">
            <h3 className={titleCls}>Category Breakdown</h3>
            <p className={subCls}>Total spend per category</p>
          </div>
          {catData.length === 0 ? (
            <p className={`text-center py-6 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No data</p>
          ) : (
            <div className="space-y-2">
              {catData.slice(0, 7).map(({ category, amount }) => {
                const cat = CATEGORIES[category];
                const pct = Math.round((amount / totalExpenses) * 100);
                return (
                  <div key={category} className="flex items-center gap-3">
                    <span className="text-lg flex-shrink-0">{cat?.icon || "•"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {cat?.label || category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>{pct}%</span>
                          <span className={`text-xs font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {fmt(amount, true)}
                          </span>
                        </div>
                      </div>
                      <div className={`w-full h-1.5 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: cat?.color || "#6b7280" }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Spending Radar */}
        <div className={card}>
          <div className="mb-4">
            <h3 className={titleCls}>Spending Pattern</h3>
            <p className={subCls}>Top categories radar view</p>
          </div>
          {radarData.length > 2 ? (
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <PolarAngleAxis dataKey="cat" tick={{ fill: darkMode ? "#9ca3af" : "#6b7280", fontSize: 10 }} />
                <Radar dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <p className={`text-center py-12 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Need more data for radar
            </p>
          )}
        </div>
      </div>

      {/* Month Summary Table */}
      <div className={card}>
        <div className="mb-4">
          <h3 className={titleCls}>Month-by-Month Summary</h3>
          <p className={subCls}>Detailed income, expenses, and net savings</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                {["Month", "Income", "Expenses", "Net Savings", "Rate"].map((h) => (
                  <th key={h} className={`px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-left ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthly.length === 0 ? (
                <tr><td colSpan={5} className={`px-3 py-8 text-center text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>No data</td></tr>
              ) : (
                monthly.map(({ month, label, income, expenses, balance }) => {
                  const rate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
                  return (
                    <tr key={month} className={`border-b transition-colors ${
                      darkMode ? "border-gray-700/50 hover:bg-gray-700/30" : "border-gray-50 hover:bg-gray-50"
                    }`}>
                      <td className={`px-3 py-3 text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>{label}</td>
                      <td className="px-3 py-3 text-sm text-emerald-400 font-medium">{fmt(income, true)}</td>
                      <td className="px-3 py-3 text-sm text-red-400 font-medium">{fmt(expenses, true)}</td>
                      <td className={`px-3 py-3 text-sm font-semibold ${balance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {balance >= 0 ? "+" : ""}{fmt(balance, true)}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                          ${rate >= 20 ? "bg-emerald-500/10 text-emerald-400" :
                            rate >= 0 ? "bg-yellow-500/10 text-yellow-400" :
                            "bg-red-500/10 text-red-400"}`}>
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
