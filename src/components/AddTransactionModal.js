import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

const categories = ["Fuel","Movie","Food","Loan","Medical","Rent","Salary","Others"];
const accounts = ["Cash","Bank","Wallet"];

export default function AddTransactionModal({ onClose, onSave, transaction }) {
  const { addTransaction, editTransaction } = useTransactions();
  const isEdit = !!transaction;

  const [type, setType] = useState(transaction?.type || "income");
  const [division, setDivision] = useState(transaction?.division || "Personal");
  const [account, setAccount] = useState(transaction?.account || "Cash");

  const [form, setForm] = useState({
    amount: transaction?.amount || "",
    datetime: transaction?.createdAt
      ? new Date(transaction.createdAt).toISOString().slice(0,16)
      : new Date().toISOString().slice(0,16),
    description: transaction?.description || "",
    category: transaction?.category || categories[0],
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleSubmit = async () => {
  console.log("Submitting transaction...");
  const payload = {
    ...form,
    amount: Number(form.amount),
    type,
    division,
    account,
    createdAt: new Date(form.datetime).toISOString(),
  };
  console.log(payload);

  try {
    let savedTransaction;
    if (isEdit) {
      savedTransaction = await editTransaction(transaction._id, payload);
    } else {
      savedTransaction = await addTransaction(payload);
    }
    console.log("Saved transaction:", savedTransaction);

    if (onSave) onSave(savedTransaction);
    onClose();
  } catch (err) {
    console.error("Error saving transaction:", err);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{isEdit ? "Edit Transaction" : "Add Transaction"}</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-500 hover:text-black">×</button>
        </div>

        <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
          <button className={`w-1/2 rounded-md py-2 text-sm font-medium ${type === "income" ? "bg-green-500 text-white" : "text-gray-600"}`} onClick={() => setType("income")}>Income</button>
          <button className={`w-1/2 rounded-md py-2 text-sm font-medium ${type === "expense" ? "bg-red-500 text-white" : "text-gray-600"}`} onClick={() => setType("expense")}>Expense</button>
        </div>

        <div className="space-y-4">
          <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} className="w-full rounded-lg border px-4 py-2" />
          <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} className="w-full rounded-lg border px-4 py-2" />
          <input type="text" name="description" placeholder="One line description" value={form.description} onChange={handleChange} className="w-full rounded-lg border px-4 py-2" />

          <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-lg border px-4 py-2">
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select value={account} onChange={(e) => setAccount(e.target.value)} className="w-full rounded-lg border px-4 py-2">
            {accounts.map((acc) => <option key={acc} value={acc}>{acc}</option>)}
          </select>

          <div>
            <p className="mb-2 text-sm font-medium">Division</p>
            <div className="flex rounded-lg bg-gray-100 p-1">
              {["Office","Personal"].map((d) => (
                <button key={d} onClick={() => setDivision(d)} className={`w-1/2 rounded-md py-2 text-sm font-medium ${division===d?"bg-blue-600 text-white":"text-gray-600"}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm">Cancel</button>
          <button onClick={handleSubmit} className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700">{isEdit ? "Update":"Save"}</button>
        </div>
      </div>
    </div>
  );
}
