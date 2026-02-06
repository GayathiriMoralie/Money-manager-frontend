import { useTransactions } from "../context/TransactionContext";

function Charts() {
  const { transactions } = useTransactions();

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    t.type === "income"
      ? (income += Number(t.amount))
      : (expense += Number(t.amount));
  });

  const total = income + expense;
  const incomeWidth = total ? (income / total) * 100 : 0;
  const expenseWidth = total ? (expense / total) * 100 : 0;

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
