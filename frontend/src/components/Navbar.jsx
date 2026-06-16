import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ currency }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1
            onClick={() => navigate("/home")}
            className="cursor-pointer text-2xl sm:text-3xl font-extrabold text-yellow-300 drop-shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Quizora 🧠
          </h1>

          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <FaCoins className="text-yellow-300 text-xl animate-bounce" />
              <span className="text-white font-bold">{currency} currency</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-200 hover:scale-105"
            >
              Logout
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-white text-2xl focus:outline-none"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-indigo-800/95 backdrop-blur-sm overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <FaCoins className="text-yellow-300 text-xl animate-bounce" />
                <span className="text-white font-bold">{currency} currency</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-full font-semibold shadow-md transition-all duration-200 w-full"
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
