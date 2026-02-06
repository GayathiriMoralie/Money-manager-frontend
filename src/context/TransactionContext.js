// TransactionContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TransactionContext = createContext();
export const useTransactions = () => useContext(TransactionContext);

const API_URL = process.env.REACT_APP_API_URL;

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTransactions(res.data);
      setLoading(false);
      console.log("Fetched transactions:", res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setLoading(false);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post(API_URL, transaction);
      setTransactions((prev) => [res.data, ...prev]);
      console.log("Saved transaction:", res.data);
      return res.data; // <- important to return for modal
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const editTransaction = async (id, updatedTransaction) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedTransaction);
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
      console.log("Edited transaction:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error editing transaction:", err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      console.log("Deleted transaction:", id);
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  useEffect(() => {
    if (!API_URL) {
      console.error(
        "REACT_APP_API_URL is not defined! Check your .env file."
      );
      return;
    }
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
