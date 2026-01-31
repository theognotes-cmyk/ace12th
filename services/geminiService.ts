
import { GoogleGenAI, Modality } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDetailedNotes = async (subject: string, chapter: string) => {
  const ai = getAI();
  const prompt = `Act as a Class 12 Board Specialist. Subject: ${subject}, Chapter: ${chapter}.
  Generate elite-level notes for 2026 Boards. 
  
  CRITICAL RULES:
  1. SYMBOLS: Use symbols (±, √, ∫, Δ, θ) ONLY inside actual formulas. Absolutely NO symbols as bullet points or decoration.
  2. STRUCTURE: Start every new topic with "TOPIC: Name".
  3. CONTENT: Use simple language. Explain concepts like a friendly teacher.
  4. LIGHT BOXES: Keep explanations grouped under the TOPIC tag.
  5. DIAGRAMS: Inject [DIAGRAM: description] only for essential visuals.
  6. MATH: Render formulas clearly using standard text (e.g., E = mc²).`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
  });
  return response.text;
};

export const generatePremiumPYQs = async (subject: string, chapter: string) => {
  const ai = getAI();
  const prompt = `Act as a Senior Board Paper Examiner with 15 years experience. 
  Subject: ${subject}, Chapter: ${chapter}.
  
  TASK: Identify the 6-8 most frequently repeated questions that appear almost every year.
  
  STRICT RULES:
  1. NO SPECIAL SYMBOLS: Do not use stars, diamonds, or emojis in the text. Use only necessary math symbols in formulas.
  2. SOLUTION STYLE: Write the "Easiest Solution" possible. Use step-by-step logic that a student can memorize easily.
  3. LANGUAGE: Use professional but simple English. 
  
  FORMAT:
  TOPIC: [Core Concept Name]
  QUESTION: [The Question Text]
  YEAR: [Mention years like 2023, 2019, 2015 - show it repeats!]
  INSIGHT: [Explain in 1 sentence why this question is a board favorite]
  SOLUTION: [The easy, point-wise scoring answer]
  [DIAGRAM: Add only if it makes the answer easier to understand]`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
  });
  return response.text;
};

export const generateVisualSolution = async (description: string, subject: string) => {
  const ai = getAI();
  let stylePrompt = `Educational diagram for Class 12: ${description}. Simple, clean, white background, black ink lines. Professional labels. No fancy colors or extra text.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: stylePrompt }] },
    config: { imageConfig: { aspectRatio: "16:9" } }
  });

  const part = response.candidates[0].content.parts.find(p => p.inlineData);
  return part?.inlineData?.data || null;
};

export const generateChapterAudio = async (notes: string, subject: string) => {
  const ai = getAI();
  const prompt = `Explain this ${subject} topic simply in Hinglish. Start with "Namaste! Aaj hum ${subject} ka ye topic samjhenge...". Keep it very simple and friendly. Context: ${notes.substring(0, 1000)}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const chatWithTutor = async (history: any[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are AceBot, an expert Class 12 Tutor. Speak in simple Hinglish. Do not use excessive symbols. Focus on helping students understand concepts easily and score marks.',
    }
  });
  const response = await chat.sendMessage({ message });
  return response.text;
};
