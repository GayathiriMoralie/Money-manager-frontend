import { useTransactions } from "../context/TransactionContext";
import { isSameWeek, isSameMonth, isSameYear } from "../utils/dateUtils";

function Summary({ view }) {
  const { transactions } = useTransactions();

  // Normalize view to lowercase
  const currentView = view?.toLowerCase() || "weekly";

  // Filter transactions based on view
  const filtered = transactions.filter((t) => {
    const txnDate = new Date(t.createdAt);
    if (currentView === "weekly") return isSameWeek(txnDate);
    if (currentView === "monthly") return isSameMonth(txnDate);
    if (currentView === "yearly") return isSameYear(txnDate);
    return true;
  });

  // Calculate totals
  const income = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="font-semibold text-lg mb-4">
        {currentView.charAt(0).toUpperCase() + currentView.slice(1)} SUMMARY
      </h3>

      <div className="space-y-2">
        <p className="flex justify-between">
          <span>Income</span>
          <span className="text-green-600 font-semibold">₹{income}</span>
        </p>

        <p className="flex justify-between">
          <span>Expense</span>
          <span className="text-red-600 font-semibold">₹{expense}</span>
        </p>

        <hr />

        <p className="flex justify-between font-bold">
          <span>Balance</span>
          <span>₹{balance}</span>
        </p>
      </div>
    </div>
  );
}

export default Summary;
