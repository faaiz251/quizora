import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import genAI from "../config/gemini.js";

const answerrouter = express.Router();

answerrouter.post("/submit-answer", authenticateUser, async (req, res) => {
  const { question, userAnswer } = req.body;
  const prompt = `Question: ${question}\nUser's Answer: ${userAnswer}\nDetermine if the user's answer is correct or incorrect. Reply only with "Yes" or "No".`;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const rest = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = (rest || "").trim().toLowerCase();
    const isCorrect = cleaned.includes("yes");
    let message = "";

    if (isCorrect) {
      message = "✅ Correct Answer!";
    } else {
      message = "❌ Incorrect Answer.";
    }

    let updatedCurrency = req.user.currency + (isCorrect ? 10 : -5);

    await User.updateOne({ _id: req.user._id }, { currency: updatedCurrency });
    res.status(200).json({ message, currency: updatedCurrency });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verifying answer with Gemini" });
  }
});

export default answerrouter;
