// import React, { useState } from "react";
// import { useApp } from "../../context/AppContext";
// import {
//   LayoutDashboard, ArrowLeftRight, Lightbulb,
//   ChevronLeft, ChevronRight, Shield, Eye, X, Sun, Moon
// } from "lucide-react";
// import Logo from "../shared/Logo";

// const NAV = [
//   { id: "dashboard",     label: "Dashboard",     icon: LayoutDashboard },
//   { id: "transactions",  label: "Transactions",  icon: ArrowLeftRight  },
//   { id: "insights",      label: "Insights",      icon: Lightbulb       },
// ];

// export default function Sidebar({ mobileOpen, onClose }) {
//   const { state, dispatch } = useApp();
//   const { activeTab, darkMode, currentUser, role } = state;
//   const [collapsed, setCollapsed] = useState(false);
//   const isMobileOpen = mobileOpen === true;

//   return (
//     <>
//       <div
//         className={`fixed inset-0 z-30 transition-opacity duration-300 md:hidden ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
//         onClick={onClose}
//       />

//       <aside className={`fixed inset-y-0 left-0 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} md:static md:translate-x-0 ${collapsed ? "w-24" : "w-72 md:w-60"} ${darkMode ? "bg-slate-950/95 border-r border-slate-800/80" : "bg-white/95 border-r border-slate-200"} shadow-2xl md:shadow-none backdrop-blur-xl`}>
//         <div className={`relative flex items-center ${collapsed ? "justify-center px-4" : "gap-3 px-5"} py-5`}>
//             <Logo />
            

//           {isMobileOpen && (
//             <button
//               onClick={onClose}
//               className="md:hidden absolute right-4 top-4 rounded-full p-2 text-slate-200 transition hover:bg-slate-800/70"
//             >
//               <X size={18} />
//             </button>
//           )}
//         </div>

//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className={`hidden md:inline-flex items-center justify-between gap-2 px-4 py-3 mx-4 mb-4 rounded-2xl text-sm font-medium transition duration-200 ${collapsed ? "bg-slate-800 text-slate-200" : darkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
//         >
//           <span>{collapsed ? "Expand" : "Collapse"}</span>
//           {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//         </button>

//         <nav className="flex-1 px-3 pb-3 space-y-1 overflow-y-auto">
//           {NAV.map(({ id, label, icon: Icon }) => {
//             const active = activeTab === id;
//             return (
//               <button
//                 key={id}
//                 onClick={() => {
//                   dispatch({ type: "SET_TAB", payload: id });
//                   onClose?.();
//                 }}
//                 title={collapsed ? label : ""}
//                 className={`w-full flex items-center ${collapsed ? "justify-center gap-0 px-3" : "gap-3 px-4"} py-3 rounded-3xl text-sm font-medium transition duration-200 ${active ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20 shadow-sm" : darkMode ? "text-slate-300 hover:bg-slate-800/80 hover:text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"}`}
//               >
//                 <Icon size={18} />
//                 {!collapsed && <span>{label}</span>}
//               </button>
//             );
//           })}
//         </nav>

//         <div className={`px-4 py-4 border-t ${darkMode ? "border-slate-800" : "border-slate-200"}`}>
//           {collapsed ? (
//             <div className="flex items-center justify-center gap-2">
//               <button
//                 title={`Switch role (${role})`}
//                 onClick={() => dispatch({ type: "SET_ROLE", payload: role === "admin" ? "viewer" : "admin" })}
//                 className={`w-10 h-10 rounded-2xl flex items-center justify-center transition ${role === "admin" ? "bg-emerald-500/15 text-emerald-400" : "bg-blue-500/15 text-blue-400"}`}
//               >
//                 {role === "admin" ? <Shield size={14} /> : <Eye size={14} />}
//               </button>
//               <button
//                 onClick={() => dispatch({ type: "TOGGLE_DARK" })}
//                 className={`w-10 h-10 rounded-2xl flex items-center justify-center transition ${darkMode ? "bg-slate-800 text-slate-200 hover:bg-slate-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
//               >
//                 {darkMode ? <Sun size={16} /> : <Moon size={16} />}
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               <div className={`rounded-3xl p-3 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
//                 <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? "text-slate-400" : "text-slate-500"}`}>Role</p>
//                 <div className={`mt-3 flex rounded-3xl p-1 ${darkMode ? "bg-slate-900" : "bg-slate-100"}`}>
//                   {['admin', 'viewer'].map((r) => (
//                     <button
//                       key={r}
//                       onClick={() => dispatch({ type: "SET_ROLE", payload: r })}
//                       className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-3xl text-xs font-medium transition ${role === r ? r === 'admin' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-blue-500 text-white shadow-sm' : darkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
//                     >
//                       {r === "admin" ? <Shield size={10} /> : <Eye size={10} />}
//                       {r}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <button
//                 onClick={() => dispatch({ type: "TOGGLE_DARK" })}
//                 className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-3xl text-sm transition duration-200 ${darkMode ? "bg-slate-900 text-slate-200 hover:bg-slate-800" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
//               >
//                 {darkMode ? <Sun size={16} /> : <Moon size={16} />}
//                 <span>{darkMode ? "Switch to Light" : "Switch to Dark"}</span>
//               </button>

//               <div className={`flex items-center gap-3 rounded-3xl px-4 py-3 ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
//                 <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold ${role === "admin" ? "bg-emerald-500/15 text-emerald-300" : "bg-blue-500/15 text-blue-300"}`}>
//                   {currentUser.avatar}
//                 </div>
//                 <div className="min-w-0">
//                   <p className={`text-sm font-semibold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>
//                     {currentUser.name}
//                   </p>
//                   <p className={`text-xs capitalize ${role === "admin" ? "text-emerald-400" : "text-blue-400"}`}>
//                     {role}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }
import React from "react";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Shield,
  Eye,
  X,
  Sun,
  Moon,
} from "lucide-react";
import Logo from "../shared/Logo";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { state, dispatch } = useApp();
  const { activeTab, darkMode, currentUser, role } = state;
  const isMobileOpen = mobileOpen === true;

  return (
    <>
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 md:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-60 w-72 ${
          darkMode
            ? "bg-slate-950/95 border-r border-slate-800/80"
            : "bg-white/95 border-r border-slate-200"
        } shadow-2xl md:shadow-none backdrop-blur-xl`}
      >
        <div className="flex flex-col min-h-0 flex-1">
          <div className="relative flex items-center gap-3 px-5 py-5">
            <Logo />

            {isMobileOpen && (
              <button
                onClick={onClose}
                className="md:hidden absolute right-4 top-4 rounded-full p-2 text-slate-200 transition hover:bg-slate-800/70"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <nav className="flex-1 px-3 pb-3 space-y-1 overflow-y-auto">
            {NAV.map(({ id, label, icon: Icon }) => {
              const active = activeTab === id;

              return (
                <button
                  key={id}
                  onClick={() => {
                    dispatch({ type: "SET_TAB", payload: id });
                    onClose?.();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-3xl text-sm font-medium transition duration-200 ${
                    active
                      ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/20 shadow-sm"
                      : darkMode
                      ? "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          <div
            className={`px-4 py-4 border-t ${
              darkMode ? "border-slate-800" : "border-slate-200"
            }`}
          >
            <div className="space-y-3">
              <div
                className={`rounded-3xl p-3 ${
                  darkMode ? "bg-slate-900" : "bg-slate-50"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Role
                </p>

                <div
                  className={`mt-3 flex rounded-3xl p-1 ${
                    darkMode ? "bg-slate-900" : "bg-slate-100"
                  }`}
                >
                  {["admin", "viewer"].map((r) => (
                    <button
                      key={r}
                      onClick={() => dispatch({ type: "SET_ROLE", payload: r })}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-3xl text-xs font-medium transition ${
                        role === r
                          ? r === "admin"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "bg-blue-500 text-white shadow-sm"
                          : darkMode
                          ? "text-slate-400 hover:text-slate-200"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {r === "admin" ? <Shield size={10} /> : <Eye size={10} />}
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => dispatch({ type: "TOGGLE_DARK" })}
                className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-3xl text-sm transition duration-200 ${
                  darkMode
                    ? "bg-slate-900 text-slate-200 hover:bg-slate-800"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                <span>{darkMode ? "Switch to Light" : "Switch to Dark"}</span>
              </button>

              <div
                className={`flex items-center gap-3 rounded-3xl px-4 py-3 ${
                  darkMode ? "bg-slate-900" : "bg-slate-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold ${
                    role === "admin"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-blue-500/15 text-blue-300"
                  }`}
                >
                  {currentUser.avatar}
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold truncate ${
                      darkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {currentUser.name}
                  </p>
                  <p
                    className={`text-xs capitalize ${
                      role === "admin" ? "text-emerald-400" : "text-blue-400"
                    }`}
                  >
                    {role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}