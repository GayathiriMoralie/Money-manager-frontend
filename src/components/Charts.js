import { useTransactions } from "../context/TransactionContext";

function Charts() {
  const { transactions } = useTransactions();

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const amt = Number(t.amount) || 0;
    t.type === "income" ? (income += amt) : (expense += amt);
  });

  const total = income + expense || 1; // avoid division by zero
  const incomeWidth = (income / total) * 100;
  const expenseWidth = (expense / total) * 100;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold text-lg mb-4">Income vs Expense</h3>

      <div className="mb-3">
        <div className="h-4 bg-gray-200 rounded">
          <div
            className="h-4 bg-green-500 rounded"
            style={{ width: `${incomeWidth}%` }}
          />
        </div>
        <p className="text-sm mt-1">Income: ₹{income}</p>
      </div>

      <div>
        <div className="h-4 bg-gray-200 rounded">
          <div
            className="h-4 bg-red-500 rounded"
            style={{ width: `${expenseWidth}%` }}
          />
        </div>
        <p className="text-sm mt-1">Expense: ₹{expense}</p>
      </div>
    </div>
  );
}

export default Charts;
