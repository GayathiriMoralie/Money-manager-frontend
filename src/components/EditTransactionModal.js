import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

const categories = [
  "Fuel",
  "Movie",
  "Food",
  "Loan",
  "Medical",
  "Rent",
  "Salary",
  "Others",
];

const accounts = ["Cash", "Bank", "Wallet"];

function EditTransactionModal({ transaction, close }) {
  const { editTransaction } = useTransactions();
  const [data, setData] = useState({
    ...transaction,
    amount: transaction.amount || "",
    description: transaction.description || "",
    category: transaction.category || "",
    division: transaction.division || "Personal",
    account: transaction.account || "Cash",
  });

  const handleSubmit = () => {
    // Ensure amount is a number
    if (!data.amount || !data.description || !data.category) {
      alert("Please fill all required fields");
      return;
    }

    editTransaction(transaction._id || transaction.id, {
      ...data,
      amount: Number(data.amount),
    });

    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Edit Transaction</h2>
          <button
            onClick={close}
            className="text-xl font-bold text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />

          <input
            type="text"
            placeholder="Description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />

          {/* Category */}
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Division */}
          <select
            value={data.division}
            onChange={(e) => setData({ ...data, division: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="Personal">Personal</option>
            <option value="Office">Office</option>
          </select>

          {/* Account */}
          <select
            value={data.account}
            onChange={(e) => setData({ ...data, account: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          >
            {accounts.map((acc) => (
              <option key={acc} value={acc}>
                {acc}
              </option>
            ))}
          </select>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={close}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTransactionModal;
