import { motion } from "framer-motion";
import { FaBrain, FaCoins, FaChartLine, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  {
    icon: FaBrain,
    title: "AI-Generated Questions",
    desc: "Every quiz is unique. Gemini AI creates fresh questions in real-time across multiple subjects.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FaCoins,
    title: "Earn Digital Coins",
    desc: "Get rewarded with coins for every correct answer. The harder the question, the bigger the reward.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: FaChartLine,
    title: "Track Your Progress",
    desc: "Your performance and coin balance are saved. Watch yourself improve over time.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: FaRobot,
    title: "Smart Difficulty Levels",
    desc: "Choose Easy, Medium, or Hard. The AI adapts questions to match your chosen difficulty.",
    color: "from-blue-500 to-indigo-500",
  },
];

export default function Learnmore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 mb-4">
            How Quizora Works
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            An AI-powered quiz platform that makes learning fun, competitive, and
            rewarding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
              >
                <feature.icon className="text-xl text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/quiz"
            className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 text-white rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start a Quiz
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
