import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const TransactionContext = createContext();
export const useTransactions = () => useContext(TransactionContext);

// API URL from .env
const API_URL = process.env.REACT_APP_API_URL|| "http://localhost:5000/api/transactions";

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL); // now points to your backend
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
    setTransactions((prev) => [res.data, ...prev]);
    return res.data;
  } catch (err) {
    console.error("Error adding transaction:", err);
    throw err; // ✅ rethrow so your modal can catch it
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
