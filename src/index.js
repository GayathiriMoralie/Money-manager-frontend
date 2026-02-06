import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TransactionProvider } from "./context/TransactionContext";
import { BrowserRouter } from "react-router-dom"; // ✅ add this
import "./index.css"; // keep this for TailwindCSS

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
