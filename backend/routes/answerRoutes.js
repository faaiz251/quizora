// import express from "express";
// import { authenticateUser } from "../middleware/authMiddleware.js";
// import User from "../models/User.js";
// import genAI from "../config/gemini.js";

// const answerrouter = express.Router();

// answerrouter.post("/submit-answer", authenticateUser, async (req, res) => {
//   const { question, userAnswer } = req.body;
//   const prompt = `Question: ${question}\nUser's Answer: ${userAnswer}\nDetermine if the user's answer is correct or incorrect. Reply only with "Yes" or "No".`;

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const rest = response.text();
//     const cleaned = (rest || "").trim().toLowerCase();
//     const isCorrect = cleaned.includes("yes");
//     let message = "";

//     if (isCorrect) {
//       message = "Correct Answer!";
//     } else {
//       message = "Incorrect Answer.";
//     }

//     let updatedCurrency = req.user.currency + (isCorrect ? 10 : -5);

//     await User.updateOne({ _id: req.user._id }, { currency: updatedCurrency });
//     res.status(200).json({ message, currency: updatedCurrency });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error verifying answer with Gemini" });
//   }
// });

// export default answerrouter;


import express from "express";
import genAI from "../config/gemini.js"; // Updated import name for clarity
import { authenticateUser } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import { Type } from "@google/genai"; // Import Type for Structured Outputs

const answerrouter = express.Router();

answerrouter.post("/submit-answer", authenticateUser, async (req, res) => {
  const { question, userAnswer } = req.body;
  const prompt = `Question: ${question}\nUser's Answer: ${userAnswer}\nDetermine if the user's answer is correct or incorrect.`;

  try {
    // --- UPDATED FOR LATEST GEMINI SDK & STRUCTURED OUTPUT ---
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        // Enforces the model to return a valid JSON object matching our schema
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: {
              type: Type.BOOLEAN,
              description: "True if the user's answer is correct, false otherwise.",
            },
          },
          required: ["isCorrect"],
        },
      },
    });

    // Parse the JSON directly from response.text
    const resultJson = JSON.parse(response.text);
    const isCorrect = resultJson.isCorrect;
    // --------------------------------------------------------

    let message = isCorrect ? "Correct Answer!" : "Incorrect Answer.";
    let updatedCurrency = req.user.currency + (isCorrect ? 10 : -5);

    // Safeguard: Prevent currency from going negative if they lose points
    if (updatedCurrency < 0) updatedCurrency = 0;

    await User.updateOne({ _id: req.user._id }, { currency: updatedCurrency });
    
    res.status(200).json({ message, currency: updatedCurrency });
  } catch (err) {
    console.error("Gemini Verification Error:", err);
    res.status(500).json({ message: "Error verifying answer with Gemini" });
  }
});

export default answerrouter;