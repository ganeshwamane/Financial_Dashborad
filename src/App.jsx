// import React, { useState } from "react";
// import { AppProvider, useApp } from "./context/AppContext";
// import Sidebar from "./components/layout/Sidebar";
// import DashboardPage from "./components/dashboard/DashboardPage";
// import TransactionsPage from "./components/transactions/TransactionsPage";
// import InsightsPage from "./components/insights/InsightsPage";
// import Logo from "./components/shared/Logo";
// import { Menu, Sun, Moon } from "lucide-react";

// function AppContent() {
//   const { state, dispatch } = useApp();
//   const { activeTab, darkMode } = state;
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const pages = {
//     dashboard:    <DashboardPage />,
//     transactions: <TransactionsPage />,
//     insights:     <InsightsPage />,
//   };

//   return (
//     <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100" : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-900"}`}>
//       <div className={`md:hidden sticky top-0 z-30 border-b px-4 py-3 transition-colors duration-300 ${darkMode ? "border-slate-700/50 bg-slate-950/95" : "border-slate-200/80 bg-white/95"}`}>
//         <div className="flex items-center justify-between gap-3">
//           <button
//             onClick={() => setMobileOpen(true)}
//             className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition-colors duration-200 ${darkMode ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
//           >
//             <Menu size={18} />
//           </button>

//           <div className="min-w-0">
//             <Logo />
//           </div>

//           <button
//             onClick={() => dispatch({ type: "TOGGLE_DARK" })}
//             className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition-colors duration-200 ${darkMode ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}
//           >
//             {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-1 min-h-0">
//         <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
//         <main className="flex-1 overflow-y-auto">
//           <div className="max-w-7xl mx-auto p-4 sm:p-6">
//             {pages[activeTab] || <DashboardPage />}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AppProvider>
//       <AppContent />
//     </AppProvider>
//   );
// }
// import React, { useState } from "react";
// import { AppProvider, useApp } from "./context/AppContext";
// import Sidebar from "./components/layout/Sidebar";
// import DashboardPage from "./components/dashboard/DashboardPage";
// import TransactionsPage from "./components/transactions/TransactionsPage";
// import InsightsPage from "./components/insights/InsightsPage";
// import Logo from "./components/shared/Logo";
// import { Menu, Sun, Moon } from "lucide-react";

// function AppContent() {
//   const { state, dispatch } = useApp();
//   const { activeTab, darkMode } = state;
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const pages = {
//     dashboard: <DashboardPage />,
//     transactions: <TransactionsPage />,
//     insights: <InsightsPage />,
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         darkMode
//           ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100"
//           : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-900"
//       }`}
//     >
//       {/* Mobile top bar - unchanged */}
//       <div
//         className={`md:hidden sticky top-0 z-30 border-b px-4 py-3 transition-colors duration-300 ${
//           darkMode
//             ? "border-slate-700/50 bg-slate-950/95"
//             : "border-slate-200/80 bg-white/95"
//         }`}
//       >
//         <div className="flex items-center justify-between gap-3">
//           <button
//             onClick={() => setMobileOpen(true)}
//             className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition-colors duration-200 ${
//               darkMode
//                 ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
//                 : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//             }`}
//           >
//             <Menu size={18} />
//           </button>

//           <div className="min-w-0">
//             <Logo />
//           </div>

//           <button
//             onClick={() => dispatch({ type: "TOGGLE_DARK" })}
//             className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition-colors duration-200 ${
//               darkMode
//                 ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
//                 : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
//             }`}
//           >
//             {darkMode ? <Sun size={18} /> : <Moon size={18} />}
//           </button>
//         </div>
//       </div>

//       {/* Desktop: sidebar fixed, main content scrolls */}
//       <div className="flex flex-1 min-h-0 md:h-screen">
//         <div className="md:sticky md:top-0 md:h-screen md:flex-shrink-0">
//           <Sidebar
//             mobileOpen={mobileOpen}
//             onClose={() => setMobileOpen(false)}
//           />
//         </div>

//         <main className="flex-1 overflow-visible md:overflow-y-auto md:h-screen">
//           <div className="max-w-7xl mx-auto p-4 sm:p-6">
//             {pages[activeTab] || <DashboardPage />}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AppProvider>
//       <AppContent />
//     </AppProvider>
//   );
// }
import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/layout/Sidebar";
import DashboardPage from "./components/dashboard/DashboardPage";
import TransactionsPage from "./components/transactions/TransactionsPage";
import InsightsPage from "./components/insights/InsightsPage";
import Logo from "./components/shared/Logo";
import { Menu, Sun, Moon } from "lucide-react";

function AppContent() {
  const { state, dispatch } = useApp();
  const { activeTab, darkMode } = state;
  const [mobileOpen, setMobileOpen] = useState(false);

  const pages = {
    dashboard: <DashboardPage />,
    transactions: <TransactionsPage />,
    insights: <InsightsPage />,
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100"
          : "bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-900"
      }`}
    >
      {/* Mobile top bar - unchanged */}
      <div
        className={`md:hidden sticky top-0 z-30 border-b px-4 py-3 transition-colors duration-300 ${
          darkMode
            ? "border-slate-700/50 bg-slate-950/95"
            : "border-slate-200/80 bg-white/95"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition-colors duration-200 ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <Logo />
          </div>

          <button
            onClick={() => dispatch({ type: "TOGGLE_DARK" })}
            className={`flex items-center justify-center w-10 h-10 rounded-2xl border transition-colors duration-200 ${
              darkMode
                ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

        <main className="flex-1 overflow-y-auto md:ml-60">
          <div className="max-w-7xl mx-auto p-4 sm:p-6">
            {pages[activeTab] || <DashboardPage />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}