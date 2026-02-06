import { useState } from "react";
import { useNavigate } from "react-router-dom"; // for dashboard navigation
import AddTransactionModal from "../components/AddTransactionModal";
import logo from "../images/clglogo.png"; // your logo path
import bgImage from "../images/home-bg.jpg"; // your background image path

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSave = (transaction) => {
    console.log("Saved transaction:", transaction);
    // later: add to state / history
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Navbar / Top Buttons */}
      <nav className="flex items-center justify-between p-6 bg-white bg-opacity-80 shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold">Money Manager</span>
        </div>

        {/* Top Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm shadow hover:bg-blue-700 transition"
          >
            Add Transaction
          </button>
          
        </div>
      </nav>

      {/* Center Text */}
<div className="flex flex-col items-center justify-center text-center mt-32 px-4">
  <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
    Welcome !! Let’s make every rupee count.
  </h1>

  <p className="mt-6 text-2xl md:text-2xl font-extrabold text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
    You can view your expense dashboard by clicking the dashboard button on the top.
  </p>
</div>


      {/* Add Transaction Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
