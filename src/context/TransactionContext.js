import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TransactionContext = createContext();
export const useTransactions = () => useContext(TransactionContext);

// Make sure this includes /api/transactions
const API_URL = process.env.REACT_APP_API_URL;

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(REACT_APP_API_URL);
      setTransactions(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setLoading(false);
    }
  };

  // Add transaction
  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post(API_URL, transaction);
      // Always use backend response
      setTransactions((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  // Edit transaction
  const editTransaction = async (id, updatedTransaction) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedTransaction);
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (err) {
      console.error("Error editing transaction:", err);
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        fetchTransactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
