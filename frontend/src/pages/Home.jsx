import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FaCoins } from "react-icons/fa";
import Navbar from "../components/Navbar";
import mascot from "../assets/images.jpeg";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCurrency(res.data.currency);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <Navbar currency={currency} />

      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-pink-400 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center px-4 sm:px-6 py-10 sm:py-16">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500">
                Test Your Brain. <br className="hidden sm:block" /> Win Digital Currency
              </h1>
            </div>
            <p className="mt-6 text-base sm:text-lg text-gray-200 font-semibold max-w-xl mx-auto">
              Take AI-generated quizzes based on difficulty. Earn currency. Show
              off your skills.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/quiz">
                  <Button className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 hover:from-yellow-400 hover:to-rose-500 text-black px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-extrabold rounded-full shadow-xl border-4 border-white/30 transition-all duration-500 w-full sm:w-auto">
                    Start Quiz
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/learnmore">
                  <Button className="bg-gradient-to-bl from-amber-300 via-rose-400 to-indigo-500 hover:from-pink-600 hover:to-yellow-400 text-white px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-extrabold rounded-full shadow-xl border-4 border-white/20 transition-all duration-500 w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 sm:mt-12"
          >
            <img
              src={mascot}
              alt="Quiz Mascot"
              className="w-36 sm:w-48 h-auto drop-shadow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 sm:mt-16 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-center shadow-xl w-full max-w-sm"
          >
            <h2 className="text-xl sm:text-2xl mb-3 flex items-center justify-center gap-2">
              <FaCoins className="text-yellow-300 text-2xl sm:text-3xl animate-bounce" />
              Coin Balance
            </h2>
            <p className="text-3xl sm:text-4xl font-black text-yellow-300">
              {currency} currency
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 sm:mt-20 max-w-2xl text-center text-gray-300 px-4"
          >
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              How It Works
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Our AI generates unique quiz questions every time based on the
              difficulty you choose. Earn currency for each correct answer. Climb
              the leaderboard. Challenge friends soon!
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
