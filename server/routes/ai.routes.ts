import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { generateFeedback } from "../services/ai.service.ts";
import { GoogleGenAI } from "@google/genai";

const router = Router();

router.post("/chat", authMiddleware, async (req: any, res: any) => {
  const { messages, userMessage, students, feedbacks } = req.body;
  
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing Gemini API Key on server" });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const contextPrompt = `
      You are an expert educational analyst. You have access to the following class data:
      Students: ${JSON.stringify(students)}
      Recent AI Insights: ${JSON.stringify(feedbacks)}

      The user is a teacher. Answer their questions based on this data. 
      Professional, actionable, and concise advice.
    `;

    const chatHistory = messages
      .filter((m: any) => m.content !== "Hello Teacher! I'm your AI class analyst. How can I help you today?")
      .map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: contextPrompt }] },
        ...chatHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ]
    });

    const responseText = result.text || "No response text available";
    res.json({ text: responseText });
  } catch (error: any) {
    console.error("AI Chat Server Error:", error);
    res.status(500).json({ error: error.message || "AI Analysis failed" });
  }
});

export default router;
