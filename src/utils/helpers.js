export const fmt = (n, compact = false) => {
  if (compact) {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(n);
};

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

export const monthLabel = (m) => {
  const [y, mo] = m.split("-");
  return new Date(y, mo - 1).toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
};

export const groupByMonth = (transactions) => {
  const map = {};
  transactions.forEach(({ date, type, amount }) => {
    const m = date.slice(0, 7);
    if (!map[m]) map[m] = { income: 0, expenses: 0 };
    type === "income" ? (map[m].income += amount) : (map[m].expenses += amount);
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([m, d]) => ({ month: m, label: monthLabel(m), ...d, balance: d.income - d.expenses }));
};

export const groupByCategory = (transactions) => {
  const map = {};
  transactions.filter((t) => t.type === "expense").forEach(({ category, amount }) => {
    map[category] = (map[category] || 0) + amount;
  });
  return Object.entries(map)
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({ category, amount }));
};

export const exportCSV = (transactions) => {
  const rows = [
    ["Date", "Description", "Category", "Type", "Amount"],
    ...transactions.map((t) => [t.date, t.description, t.category, t.type, t.amount]),
  ];
  const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], { type: "text/csv" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "transactions.csv" });
  a.click();
};

export const exportJSON = (transactions) => {
  const blob = new Blob([JSON.stringify(transactions, null, 2)], { type: "application/json" });
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "transactions.json" });
  a.click();
};
