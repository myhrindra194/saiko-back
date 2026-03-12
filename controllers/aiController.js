import { getGeminiResponse } from '../services/aiService.js';

export const askChatbot = async (req, res, next) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt requis' });

  const answer = await getGeminiResponse(prompt);
  res.json({ text: answer });
};