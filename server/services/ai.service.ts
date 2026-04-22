import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

const geminiApiKey = process.env.GEMINI_API_KEY;
const zhipuApiKey = process.env.ZHIPU_API_KEY;

let geminiAi: GoogleGenAI | null = null;
if (geminiApiKey) {
  geminiAi = new GoogleGenAI({ apiKey: geminiApiKey });
}

let zhipuAi: OpenAI | null = null;
if (zhipuApiKey) {
  zhipuAi = new OpenAI({
    apiKey: zhipuApiKey,
    baseURL: "https://open.bigmodel.cn/api/paas/v4/"
  });
}

export const generateFeedback = async (studentData: any) => {
  if (!zhipuAi && !geminiAi) {
    console.warn("No AI API Keys set. Falling back to mock feedback.");
    return `Mock feedback for student with ${studentData.marks} marks. They are doing fine.`;
  }
  
  try {
    const prompt = `Analyze this student's data and provide a detailed, smart, yet concise feedback. Point out specific areas where the student struggled or succeeded based on marks, and provide suggestions.
    Course: ${studentData.course}
    Marks: ${studentData.marks}/100
    Context: The teacher uploaded data and wants AI to analyze the grade and provide actionable insight for the student.`;
    
    // Prioritize Zhipu AI if the key is available, else use Gemini
    if (zhipuAi) {
        const completion = await zhipuAi.chat.completions.create({
            model: "glm-4-flash",
            messages: [
                { role: "system", content: "You are an intelligent educational AI assistant." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
        });
        return completion.choices[0]?.message.content?.trim() || "Great progress, keep up the good work.";
    } else if (geminiAi) {
        const response = await geminiAi.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });
        return response.text?.trim() || "Great progress, keep up the good work.";
    }
  } catch (error) {
    console.error("AI Generation failed:", error);
    return "Error generating insights.";
  }
};

export const evaluateFeedback = async (testData: string) => {
  if (!zhipuAi && !geminiAi) {
    return "Mock generated feedback based on: " + testData;
  }
  
  try {
    const prompt = `Act as an educational AI assistant/trainer evaluating data. Given the following student test data/context, generate constructive feedback.\n\nContext:\n${testData}`;
    
    if (zhipuAi) {
       const completion = await zhipuAi.chat.completions.create({
            model: "glm-4-flash",
            messages: [
                { role: "system", content: "You are an AI Trainer evaluating semantic output." },
                { role: "user", content: prompt }
            ]
       });
       return completion.choices[0]?.message.content?.trim() || "No feedback generated.";
    } else if (geminiAi) {
        const response = await geminiAi.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });
        return response.text?.trim() || "No feedback generated.";
    }
  } catch (error) {
    console.error("AI Evaluation failed:", error);
    return "Error generating evaluation. Ensure API limits haven't been reached.";
  }
};

