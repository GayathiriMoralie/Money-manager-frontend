import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

// GET all transactions
export const fetchTransactions = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching transactions:", err);
    throw err;
  }
};

// POST a new transaction
export const addTransaction = async (transaction) => {
  try {
    const res = await axios.post(API_URL, transaction);
    return res.data;
  } catch (err) {
    console.error("Error adding transaction:", err);
    throw err;
  }
};
