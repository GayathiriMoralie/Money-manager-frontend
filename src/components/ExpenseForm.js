import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

const categories = ["Fuel", "Movie", "Food", "Loan", "Medical"];

function ExpenseForm({ close }) {
  const { addTransaction } = useTransactions();

  const [data, setData] = useState({
    amount: "",
    category: "Fuel",
    division: "Personal",
    description: "",
  });

  const submit = async () => {
    const newTxn = {
      ...data,
      amount: Number(data.amount),
      type: "expense",
      createdAt: new Date().toISOString(),
    };

    await addTransaction(newTxn); // use backend response
    close();
  };

  return (
    <>
      <input
        placeholder="Amount"
        onChange={(e) => setData({ ...data, amount: e.target.value })}
      />
      <input
        placeholder="Description"
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <select onChange={(e) => setData({ ...data, category: e.target.value })}>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select onChange={(e) => setData({ ...data, division: e.target.value })}>
        <option>Personal</option>
        <option>Office</option>
      </select>

      <button onClick={submit}>Add Expense</button>
    </>
  );
}

export default ExpenseForm;
