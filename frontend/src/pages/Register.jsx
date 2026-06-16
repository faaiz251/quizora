import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      toast.success("Signup successful! Redirecting to login...", { duration: 3000 });
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.", { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center px-4 sm:px-6">
      <motion.div
        className="w-full max-w-md bg-gradient-to-bl from-emerald-600 to-cyan-700 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Create Account
        </motion.h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl p-3 pl-12 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300 transition-all duration-300 disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl p-3 pl-12 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300 transition-all duration-300 disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-200" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full rounded-xl p-3 pl-12 bg-white/10 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300 transition-all duration-300 disabled:opacity-50"
            />
          </div>

          <motion.button
            whileHover={loading ? {} : { scale: 1.02 }}
            whileTap={loading ? {} : { scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-pink-500 font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Signing up...
              </span>
            ) : (
              <>
                <FaUserPlus />
                Sign Up
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-200">
          Already have an account?{" "}
          <Link to="/login" className="underline text-yellow-300 hover:text-yellow-200 font-semibold">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
