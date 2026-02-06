import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../context/TransactionContext";
import Summary from "../components/Summary";
import AddTransactionModal from "../components/AddTransactionModal";
import History from "../components/History";

const categories = [
  "All",
  "Fuel",
  "Food",
  "Movie",
  "Loan",
  "Medical",
  "Salary",
  "Others",
];

export default function Dashboard() {
  const { transactions, addTransaction } = useTransactions();

  const [view, setView] = useState("Weekly");
  const [category, setCategory] = useState("All");
  const [division, setDivision] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ---------------- FILTERED TRANSACTIONS ----------------
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const txDate = new Date(tx.createdAt);
      if (category !== "All" && tx.category !== category) return false;
      if (division !== "All" && tx.division !== division) return false;
      if (fromDate && txDate < new Date(fromDate)) return false;
      if (toDate && txDate > new Date(toDate)) return false;
      return true;
    });
  }, [transactions, category, division, fromDate, toDate]);

  // ---------------- SUMMARY ----------------
  const income = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const balance = income - expense;

  // ---------------- CHART DATA ----------------
  const chartData = useMemo(() => {
    const map = {};
    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.createdAt);
      let key = "";

      const normalizedView = view.toLowerCase();
      if (normalizedView === "weekly") {
        key = date.toLocaleDateString("en-US", { weekday: "short" });
      } else if (normalizedView === "monthly") {
        key = date.toLocaleDateString("en-US", { month: "short" });
      } else {
        key = date.getFullYear().toString();
      }

      if (!map[key]) map[key] = { name: key, income: 0, expense: 0 };
      map[key][tx.type] += Number(tx.amount);
    });

    return Object.values(map);
  }, [filteredTransactions, view]);

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Summary view={view} />
        <Summary view={view} />
        <Summary view={view} />
      </div>

       {/* FILTERS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 rounded-xl bg-white p-4 shadow">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="rounded-lg border px-3 py-2"
        >
          <option value="All">All Divisions</option>
          <option value="Office">Office</option>
          <option value="Personal">Personal</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="rounded-lg border px-3 py-2"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="rounded-lg border px-3 py-2"
        />
      </div>

      {/* CHART */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 font-semibold">Income vs Expense ({view})</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#16a34a" />
            <Bar dataKey="expense" fill="#dc2626" />
          </BarChart>
        </ResponsiveContainer>
      </div>

     

      {/* HISTORY */}
      <div className="mt-6">
        <History />
      </div>

      {/* MODAL */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSave={addTransaction}
        />
      )}
    </div>
  );
}
