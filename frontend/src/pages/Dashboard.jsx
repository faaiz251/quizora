import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaBrain, FaCoins } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaBrain className="text-4xl sm:text-5xl text-pink-400 animate-pulse" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6FD8] via-[#3813C2] to-[#B621FE]">
            Quizora
          </h1>
        </div>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-10 leading-relaxed">
          Test your knowledge with AI-powered quizzes across Easy, Medium, and
          Hard levels. Earn digital coins for every correct answer!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#ff4b1f] to-[#1fddff] text-white rounded-full text-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaSignInAlt />
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#DA22FF] to-[#9733EE] text-white rounded-full text-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaUserPlus />
            Sign Up
          </motion.button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 text-gray-300">
          <div className="flex items-center gap-2">
            <FaCoins className="text-yellow-400 text-xl" />
            <span className="text-sm sm:text-base">Earn Coins</span>
          </div>
          <div className="w-px h-6 bg-gray-500" />
          <div className="flex items-center gap-2">
            <FaBrain className="text-purple-400 text-xl" />
            <span className="text-sm sm:text-base">AI Questions</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
