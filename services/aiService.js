import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getGeminiResponse = async (userPrompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Tu es Saiko, un compagnon de santé mentale chaleureux et humain. " +
                     "Ne parle pas comme une IA. Utilise un ton naturel, valide les émotions sans être clinique. " +
                     "Fais des réponses courtes (2-3 phrases max) pour favoriser l'échange. " +
                     "Si l'utilisateur semble en détresse grave, suggère avec douceur de parler à un professionnel." }],
      },
      {
        role: "model",
        parts: [{ text: "Compris. Je suis là pour vous écouter et vous soutenir." }],
      },
    ],
  });

  const result = await chat.sendMessage(userPrompt);
  const response = result.response;
  return response.text();
};