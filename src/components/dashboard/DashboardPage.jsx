import React from "react";
import { useApp } from "../../context/AppContext";
import SummaryCards from "./SummaryCards";
import BalanceTrend from "./BalanceTrend";
import SpendingBreakdown from "./SpendingBreakdown";
import RecentTransactions from "./RecentTransactions";
import MonthlyBarChart from "./MonthlyBarChart";

export default function DashboardPage() {
  const { state } = useApp();
  const { darkMode, currentUser, role } = state;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-5">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            {greeting}, {currentUser.name.split(" ")[0]}
          </h1>
          <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Here's your financial overview
          </p>
        </div>
        {role === "viewer" && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
            👁 View Only
          </span>
        )}
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceTrend />
        </div>
        <div>
          <SpendingBreakdown />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div>
          <MonthlyBarChart />
        </div>
      </div>
    </div>
  );
}
