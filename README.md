# MoneyIT
It is a Finance Dashboard UI only the frontend portion, where you will manage your income and expanse.

A modern, interactive personal finance dashboard built with **React** and **Tailwind CSS**. Designed for clarity, performance, and a polished user experience — without looking like a generic template.

GITHUB LINK : https://github.com/Sanketmaity/Expance_Tracker_MoneyIT

Live Link : https://moneyit.netlify.app/
---

## 🖼️ Overview

FinTrack lets users track income, expenses, and financial patterns through an intuitive interface with smart insights, role-based access, and persistent data storage.

## ✅ Features Implemented

| Requirement | Status |
|---|---|
| Dashboard Overview with Summary Cards | ✅ |
| Time-Based Visualization (Balance Trend) | ✅ |
| Categorical Visualization (Spending Breakdown Donut) | ✅ |
| Transaction List with Date, Amount, Category, Type | ✅ |
| Transaction Filtering (type, category, date range) | ✅ |
| Transaction Sorting & Search | ✅ |
| Role-Based UI (Admin / Viewer) | ✅ |
| Insights Section | ✅ |
| State Management (React Context + useReducer) | ✅ |
| Responsive Design | ✅ |
| Dark / Light Mode | ✅ |
| Data Persistence (localStorage) | ✅ |
| Export Functionality (CSV + JSON) | ✅ |
| Empty / No Data States | ✅ |
| Add / Edit / Delete Transactions (Admin only) | ✅ |
| Pagination | ✅ |

---

## 🗂️ Folder Structure

```
finance-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardPage.jsx      # Main dashboard layout
│   │   │   ├── SummaryCards.jsx       # Balance / Income / Expense cards
│   │   │   ├── BalanceTrend.jsx       # Area chart – income vs expenses over time
│   │   │   ├── SpendingBreakdown.jsx  # Donut chart – category breakdown
│   │   │   ├── MonthlyBarChart.jsx    # Bar chart – net savings by month
│   │   │   └── RecentTransactions.jsx # Quick view of latest 6 transactions
│   │   ├── transactions/
│   │   │   └── TransactionsPage.jsx   # Full transaction table with filter/sort/search
│   │   ├── insights/
│   │   │   └── InsightsPage.jsx       # Smart insights, radar, monthly table
│   │   ├── layout/
│   │   │   └── Sidebar.jsx            # Collapsible sidebar nav + role + theme toggle
│   │   └── shared/
            |__Logo.jsx
            |
│   │       └── TransactionModal.jsx   # Add / Edit transaction modal
│   ├── context/
│   │   └── AppContext.jsx             # Global state – useReducer + Context API
│   ├── data/
│   │   └── mockData.js                # 72 mock transactions, categories, users
│   ├── utils/
│   │   └── helpers.js                 # Currency format, date format, group utils, export
│   ├── styles/
│   │   └── index.css                  # Tailwind base + custom fonts + scrollbar
│   ├── App.jsx                        # Root component
│   └── index.js                       # React DOM entry point
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **v16+**
- npm **v7+** or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app opens at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

Output goes to the `/build` folder — ready to deploy on Vercel, Netlify, or any static host.

---

## 🏗️ Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Tailwind CSS | Utility-first styling |
| Recharts | Data visualizations |
| Lucide React | Icon library |
| Context API + useReducer | State management |
| localStorage | Data persistence |

---

## 🧠 Architecture & Approach

### State Management
All application state lives in a single `AppContext` (Context API + `useReducer`). Actions are dispatched for every state change — adding/editing/deleting transactions, switching roles, updating filters, toggling dark mode, and tab navigation. `useMemo` ensures derived values (filtered transactions, summary totals) are only recomputed when dependencies change.

### Role-Based UI
Roles are simulated entirely on the frontend via a toggle in the sidebar:

- **Admin** — can add, edit, and delete transactions. Sees action buttons in the table.
- **Viewer** — read-only. Add/Edit/Delete buttons are hidden. A "View Only" badge appears on the dashboard.

No backend or auth is involved — this is a pure UI simulation as required.

### Data Persistence
On first load, 72 realistic mock transactions (Jan–Jun 2025, Indian Rupee, across 10 categories) are seeded into `localStorage`. All subsequent add/edit/delete operations persist to `localStorage` immediately, so data survives page refreshes.

### Visualizations
Four charts are implemented using **Recharts**:
1. **Area Chart** — Monthly income vs expenses trend (time-based)
2. **Donut/Pie Chart** — Spending breakdown by category (categorical)
3. **Bar Chart** — Net balance per month (monthly comparison)
4. **Radar Chart** — Spending pattern across top categories (insights)

### Responsiveness
- Sidebar collapses to icon-only mode on smaller screens
- Summary cards switch from 4-column to 2-column grid
- Charts use `ResponsiveContainer` to fill available width
- Table scrolls horizontally on mobile

---

## 📊 Insights Logic

The Insights page auto-generates observations from the data:

- **Top spending category** — highest total expense category with % share
- **Month-over-month change** — % change in expenses between the last two months
- **Savings rate alert** — flags if savings rate drops below 10% or celebrates if ≥ 20%
- **Best month** — month with the highest net balance
- **Monthly table** — full breakdown with income, expenses, net savings, and rate badge

---

## 🌗 Dark / Light Mode

Toggle available in the sidebar footer. The preference is applied immediately and persists through the session (can be extended to localStorage easily).

---

## 📤 Export

From the Transactions page, use the **Export** dropdown to download:
- `transactions.csv` — filtered results as CSV
- `transactions.json` — filtered results as JSON

Exports always reflect the current filter state.

---

## 🔮 Potential Enhancements

- Connect to a real backend (Node + Express, Supabase, Firebase)
- Persist dark mode preference in localStorage
- Add budget/goal tracking per category
- Email summary reports
- Multi-currency support
- Advanced date range presets (This Month, Last 30 Days, YTD)

---

## 👤 Author

Built as part of a frontend development evaluation assignment.  
Feel free to reach out with feedback or questions.

---

## 📄 License

MIT — free to use, modify, and distribute.
