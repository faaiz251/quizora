import { useState } from "react";
import Navbar from "../components/Navbar";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Quiz() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [currency, setCurrency] = useState(120);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [level, setLevel] = useState("medium");

  const getQuestion = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/questions/get-question`,
        { level },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const fullText = res.data.question;
      const parts = fullText.split("\n").filter((line) => line.trim() !== "");

      const quesLine = parts.find((p) => p.includes("?")) || parts[0];
      const optionLines = parts.filter((p) => /^[A-Da-d][).]/.test(p.trim()));

      setQuestion(quesLine);
      setOptions(optionLines);
      setCurrency(res.data.currency);
      setSelectedAnswer("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", { duration: 4000 });
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!selectedAnswer) {
      return toast.error("Please select an answer!", { duration: 3000 });
    }

    setSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/answer/submit-answer`,
        {
          question: question,
          userAnswer: selectedAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message, { duration: 4000 });
      setCurrency(res.data.currency);
    } catch (err) {
      toast.error("Something went wrong while submitting your answer.", { duration: 4000 });
    } finally {
      setSubmitting(false);
    }
  };

  const levels = [
    { key: "easy", label: "Easy", color: "bg-emerald-500", hover: "hover:bg-emerald-400" },
    { key: "medium", label: "Medium", color: "bg-amber-500", hover: "hover:bg-amber-400" },
    { key: "hard", label: "Hard", color: "bg-red-500", hover: "hover:bg-red-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-neutral-900 text-white">
      <Navbar currency={currency} />

      <div className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-red-500 bg-clip-text text-transparent">
            Your AI Quiz
          </h1>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {levels.map((lvl) => (
            <motion.button
              key={lvl.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLevel(lvl.key)}
              className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-lg ${
                level === lvl.key
                  ? `${lvl.color} text-white ring-2 ring-white/30`
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {lvl.label}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={getQuestion}
          disabled={loading}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-full shadow-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              Generating...
            </span>
          ) : (
            "Get Question"
          )}
        </motion.button>

        {question && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-10 w-full max-w-2xl bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10"
          >
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-yellow-300">
              AI Generated Question:
            </h2>
            <p className="text-base sm:text-lg mb-6 leading-relaxed">{question}</p>

            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
            >
              <div className="flex flex-col gap-2">
                {options.map((opt, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 4 }}
                    className={`rounded-xl p-3 transition-all duration-200 ${
                      selectedAnswer === opt
                        ? "bg-purple-500/20 border border-purple-400/50"
                        : "bg-white/5 border border-transparent hover:bg-white/10"
                    }`}
                  >
                    <FormControlLabel
                      value={opt}
                      control={
                        <Radio
                          sx={{
                            color: "rgba(255,255,255,0.5)",
                            "&.Mui-checked": {
                              color: "#a855f7",
                            },
                          }}
                        />
                      }
                      label={<span className="text-white text-sm sm:text-base">{opt}</span>}
                    />
                  </motion.div>
                ))}
              </div>
            </RadioGroup>

            <motion.button
              whileHover={submitting ? {} : { scale: 1.02 }}
              whileTap={submitting ? {} : { scale: 0.98 }}
              onClick={submitAnswer}
              disabled={submitting}
              className="mt-6 w-full bg-gradient-to-r from-emerald-400 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                "Submit Answer"
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
