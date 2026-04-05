import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES } from "../../data/mockData";
import { fmt, fmtDate, exportCSV, exportJSON } from "../../utils/helpers";
import TransactionModal from "../shared/TransactionModal";
import {
  Search, SlidersHorizontal, Plus, Download,
  ArrowUpDown, Pencil, Trash2, ChevronUp, ChevronDown, X
} from "lucide-react";

const SORT_FIELDS = [
  { value: "date",        label: "Date"        },
  { value: "amount",      label: "Amount"      },
  { value: "description", label: "Description" },
  { value: "category",    label: "Category"    },
];

export default function TransactionsPage() {
  const { state, dispatch, filteredTransactions } = useApp();
  const { darkMode, role, filters } = state;

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const setFilter = (key, value) => {
    dispatch({ type: "SET_FILTER", key, value });
    setPage(1);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
    setDeleteConfirm(null);
  };

  const handleEdit = (tx) => {
    setEditData(tx);
    setShowModal(true);
  };

  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      setFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    } else {
      setFilter("sortBy", field);
      setFilter("sortOrder", "desc");
    }
  };

  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field) return <ArrowUpDown size={12} className="opacity-30" />;
    return filters.sortOrder === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />;
  };

  const total = filteredTransactions.length;
  const pages = Math.ceil(total / PER_PAGE);
  const paged = filteredTransactions.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const activeFilterCount = [
    filters.type !== "all", filters.category !== "all",
    filters.dateFrom, filters.dateTo
  ].filter(Boolean).length;

  const card = `rounded-2xl border transition-colors ${darkMode ? "bg-gray-800/60 border-gray-700/50" : "bg-white border-gray-200 shadow-sm"}`;
  const inputCls = `w-full px-3 py-2 rounded-xl text-sm outline-none border transition-all
    ${darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-emerald-500" : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500"}`;
  const labelCls = `block text-xs font-medium mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Transactions</h1>
          <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {total} record{total !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Export */}
          <div className="relative group">
            <button className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors
              ${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              <Download size={14} /> Export
            </button>
            <div className={`absolute right-0 top-full mt-1 w-36 rounded-xl shadow-xl border z-20 overflow-hidden hidden group-hover:block
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              <button onClick={() => exportCSV(filteredTransactions)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"}`}>
                Export CSV
              </button>
              <button onClick={() => exportJSON(filteredTransactions)}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"}`}>
                Export JSON
              </button>
            </div>
          </div>

          {/* Filters toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors
              ${showFilters || activeFilterCount > 0
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-500 text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Add (admin only) */}
          {role === "admin" && (
            <button
              onClick={() => { setEditData(null); setShowModal(true); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm"
            >
              <Plus size={14} /> Add
            </button>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          className={`${inputCls} pl-9 pr-4`}
        />
        {filters.search && (
          <button onClick={() => setFilter("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className={`${card} p-4`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className={labelCls}>Type</label>
              <select value={filters.type} onChange={(e) => setFilter("type", e.target.value)} className={inputCls}>
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select value={filters.category} onChange={(e) => setFilter("category", e.target.value)} className={inputCls}>
                <option value="all">All Categories</option>
                {Object.entries(CATEGORIES).map(([k, c]) => (
                  <option key={k} value={k}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>From Date</label>
              <input type="date" value={filters.dateFrom} onChange={(e) => setFilter("dateFrom", e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>To Date</label>
              <input type="date" value={filters.dateTo} onChange={(e) => setFilter("dateTo", e.target.value)} className={inputCls} />
            </div>
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={() => { dispatch({ type: "RESET_FILTERS" }); setPage(1); }}
              className="mt-3 text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
            >
              <X size={12} /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className={card}>
        <div className="md:hidden p-2">
          {paged.length === 0 ? (
            <div className={`rounded-3xl border border-dashed p-8 text-center ${darkMode ? "border-slate-700 bg-slate-900/70 text-slate-400" : "border-slate-200 bg-white/90 text-slate-500"}`}>
              No transactions match your filters.
            </div>
          ) : (
            <div className="space-y-4">
              {paged.map((tx) => {
                const cat = CATEGORIES[tx.category];
                return (
                  <div key={tx.id} className={`rounded-3xl border p-4 shadow-sm transition-colors ${darkMode ? "border-slate-700 bg-slate-900/80 hover:border-slate-600" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className={`text-xs uppercase tracking-[0.24em] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>{fmtDate(tx.date)}</p>
                        <p className={`mt-2 font-semibold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>{tx.description}</p>
                      </div>
                      <span className={`text-sm font-semibold ${tx.type === "income" ? "text-emerald-400" : "text-rose-400"}`}>
                        {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${darkMode ? "bg-slate-800 text-slate-200" : "bg-slate-100 text-slate-600"}`}>
                        <span>{cat?.icon || "•"}</span>
                        {cat?.label || tx.category}
                      </span>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 ${tx.type === "income" ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}>
                        {tx.type}
                      </span>
                    </div>
                    {role === "admin" && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <button onClick={() => handleEdit(tx)}
                          className={`inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium transition ${darkMode ? "bg-slate-800 text-slate-100 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                          <Pencil size={14} />
                          <span className="ml-2">Edit</span>
                        </button>
                        <button onClick={() => setDeleteConfirm(tx.id)}
                          className="inline-flex items-center justify-center rounded-2xl px-3 py-2 text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/15 transition">
                          <Trash2 size={14} />
                          <span className="ml-2">Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="overflow-x-auto hidden md:block">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                {[
                  { key: "date",        label: "Date"        },
                  { key: "description", label: "Description" },
                  { key: "category",    label: "Category"    },
                  { key: "type",        label: "Type"        },
                  { key: "amount",      label: "Amount"      },
                ].map(({ key, label }) => (
                  <th key={key}
                    onClick={() => toggleSort(key)}
                    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-left cursor-pointer select-none transition-colors ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    <span className="flex items-center gap-1">
                      {label} <SortIcon field={key} />
                    </span>
                  </th>
                ))}
                {role === "admin" && (
                  <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-transparent">
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={role === "admin" ? 6 : 5}
                    className={`px-4 py-12 text-center text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    No transactions match your filters.
                  </td>
                </tr>
              ) : (
                paged.map((tx) => {
                  const cat = CATEGORIES[tx.category];
                  return (
                    <tr key={tx.id}
                      className={`transition-colors ${darkMode ? "hover:bg-gray-700/30" : "hover:bg-gray-50"}`}>
                      <td className={`px-4 py-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {fmtDate(tx.date)}
                      </td>
                      <td className={`px-4 py-3 text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{cat?.icon || "•"}</span>
                          <span className="truncate max-w-[160px]">{tx.description}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium" style={{ background: `${cat?.color}22`, color: cat?.color }}>
                          {cat?.label || tx.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${tx.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-sm font-semibold ${tx.type === "income" ? "text-emerald-400" : darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                      </td>
                      {role === "admin" && (
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => handleEdit(tx)}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${darkMode ? "hover:bg-gray-600 text-gray-400 hover:text-gray-200" : "hover:bg-gray-100 text-gray-500"}`}>
                              <Pencil size={12} />
                            </button>
                            <button onClick={() => setDeleteConfirm(tx.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10 text-gray-400 hover:text-red-400">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className={`flex flex-col gap-3 px-4 py-3 border-t ${darkMode ? "border-gray-700" : "border-gray-100"} md:flex-row md:items-center md:justify-between`}>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)} of {total}
            </p>
            <div className="flex flex-wrap items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                Prev
              </button>
              {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
                const p = i + 1;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-2xl text-xs font-medium transition-colors ${page === p ? "bg-emerald-500 text-white" : darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(Math.min(pages, page + 1))} disabled={page === pages}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${darkMode ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-gray-600"}`}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className={`relative w-full max-w-sm rounded-2xl p-6 shadow-2xl border z-10
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`text-base font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Delete Transaction?</h3>
            <p className={`text-sm mb-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteConfirm(null)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <TransactionModal
          editData={editData}
          onClose={() => { setShowModal(false); setEditData(null); }}
        />
      )}
    </div>
  );
}
