import { getGeminiResponse } from '../services/aiService.js';

export const askChatbot = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt requis" });

    const answer = await getGeminiResponse(prompt);
    res.json({ text: answer });
  } catch (error) {
    console.error("Erreur Gemini:", error);
    res.status(500).json({ error: "L'IA est indisponible pour le moment." });
  }
};