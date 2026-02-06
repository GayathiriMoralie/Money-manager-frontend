import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

function ExpenseForm({ close }) {
  const { addTransaction } = useTransactions();

  const [data, setData] = useState({
    amount: "",
    category: "Fuel",
    division: "Personal",
    description: ""
  });

  const submit = () => {
    addTransaction({
      ...data,
      id: Date.now(),
      type: "expense",
      date: new Date().toISOString()
    });
    close();
  };

  return (
    <>
      <input placeholder="Amount" onChange={e => setData({...data, amount: e.target.value})} />
      <input placeholder="Description" onChange={e => setData({...data, description: e.target.value})} />

      <select onChange={e => setData({...data, category: e.target.value})}>
        <option>Fuel</option>
        <option>Movie</option>
        <option>Food</option>
        <option>Medical</option>
        <option>Loan</option>
      </select>

      <select onChange={e => setData({...data, division: e.target.value})}>
        <option>Personal</option>
        <option>Office</option>
      </select>

      <button onClick={submit}>Add Expense</button>
    </>
  );
}

export default ExpenseForm;
