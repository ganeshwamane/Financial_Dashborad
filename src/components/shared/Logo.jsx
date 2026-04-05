import React from "react";

export default function Logo({ compact = false }) {
  return (
    <div className={`inline-flex items-center ${compact ? "" : "gap-3"}`}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-500 shadow-inner">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l7 4v6.5c0 4-3 7.5-7 8-4-0.5-7-4-7-8V7l7-4Z" />
          <path d="M9.5 9.5h5" />
          <path d="M9.5 12.5h4" />
          <path d="M11.5 15.5h2" />
          <path d="M14 15l1.5-1.5 2 2" />
        </svg>
      </div>

      {!compact && (
        <div className="min-w-0">
          <p className="text-sm font-bold tracking-tight text-slate-500 dark:text-white">MoneyIT</p>
        </div>
      )}
    </div>
  );
}
