import { useState } from "react";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [activeView, setActiveView] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <h1 className="text-xl font-bold">Money Manager</h1>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveView("home")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeView === "home"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveView("dashboard")}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              activeView === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeView === "home" && <Home />}
        {activeView === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
}
