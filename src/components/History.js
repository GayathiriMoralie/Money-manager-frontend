import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import Filters from "./Filters";
import EditTransactionModal from "./EditTransactionModal";

// Centralized categories (same as AddTransactionModal)
const categories = [
  "Fuel",
  "Food",
  "Movie",
  "Loan",
  "Medical",
  "Salary",
  "Rent",
  "Others",
];

const divisions = ["Office", "Personal"];

function History() {
  const { transactions, editTransaction, deleteTransaction } = useTransactions();
  const [filters, setFilters] = useState({ category: "", division: "" });
  const [editTxn, setEditTxn] = useState(null);

  // Only allow editing within 12 hours
  const canEdit = (date) =>
    Date.now() - new Date(date).getTime() <= 12 * 60 * 60 * 1000;

  // Filter transactions based on dropdowns and date range
  const filtered = transactions.filter((t) => {
    if (filters.category && t.category !== filters.category) return false;
    if (filters.division && t.division !== filters.division) return false;
    if (filters.from && new Date(t.createdAt) < new Date(filters.from)) return false;
    if (filters.to && new Date(t.createdAt) > new Date(filters.to)) return false;
    return true;
  });

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold">Transaction History</h3>

      {/* Custom Filters */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-4">
        {/* Category Filter */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Division Filter */}
        <select
          value={filters.division}
          onChange={(e) => setFilters({ ...filters, division: e.target.value })}
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All Divisions</option>
          {divisions.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* From Date */}
        <input
          type="date"
          value={filters.from || ""}
          onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          className="rounded-lg border px-3 py-2"
        />

        {/* To Date */}
        <input
          type="date"
          value={filters.to || ""}
          onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          className="rounded-lg border px-3 py-2"
        />
      </div>

      {/* TABLE HEADER */}
      <div className="mt-4 grid grid-cols-6 border-b pb-2 text-xs font-semibold text-gray-500">
        <span>TYPE</span>
        <span>AMOUNT</span>
        <span>CATEGORY</span>
        <span>DIVISION</span>
        <span>ACCOUNT</span>
        <span className="text-right">ACTION</span>
      </div>

      {/* TRANSACTIONS */}
      <div className="mt-2 space-y-2">
        {filtered.map((t) => (
          <div
            key={t._id || t.id}
            className="grid grid-cols-6 items-center rounded border p-2 text-sm"
          >
            <span className="uppercase">{t.type}</span>
            <span>₹{t.amount}</span>
            <span>{t.category || "-"}</span>
            <span>{t.division || "-"}</span>
            <span className="font-medium">{t.account || "Cash"}</span>
            <span className="text-right space-x-2">
              {canEdit(t.createdAt) ? (
                <>
                  <button
                    onClick={() => setEditTxn(t)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(t._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </>
              ) : (
                <span className="text-xs text-gray-400">Locked</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editTxn && (
        <EditTransactionModal
          transaction={editTxn}
          close={() => setEditTxn(null)}
        />
      )}
    </div>
  );
}

export default History;
