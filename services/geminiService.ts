
import { GoogleGenAI, Modality } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // We throw here so the components can catch it in their try-catch blocks
    throw new Error("Missing API Key. Please ensure the environment is configured correctly.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateDetailedNotes = async (subject: string, chapter: string) => {
  try {
    const ai = getAI();
    const prompt = `Act as a Class 12 Board Specialist. Subject: ${subject}, Chapter: ${chapter}.
    Generate elite-level notes for 2026 Boards. 
    
    CRITICAL RULES:
    1. SYMBOLS: Use symbols (±, √, ∫, Δ, θ) ONLY inside actual formulas. Absolutely NO symbols as bullet points or decoration.
    2. STRUCTURE: Start every new topic with "TOPIC: Name".
    3. CONTENT: Use simple language. Explain concepts like a friendly teacher.
    4. DIAGRAMS: Inject [DIAGRAM: description] only for essential visuals.
    5. MATH: Render formulas clearly using standard text (e.g., E = mc²).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text;
  } catch (err: any) {
    console.error("Gemini Error:", err);
    throw new Error(err.message || "Failed to generate notes. Check your connection.");
  }
};

export const generatePremiumPYQs = async (subject: string, chapter: string) => {
  try {
    const ai = getAI();
    const prompt = `Act as a Senior Board Paper Examiner with 15 years experience. 
    Subject: ${subject}, Chapter: ${chapter}.
    
    TASK: Identify the 6-8 most frequently repeated questions from the last 15 years (4250+ question database).
    
    STRICT RULES:
    1. NO SPECIAL SYMBOLS: Do not use stars, diamonds, or emojis. Use only necessary math symbols in formulas.
    2. SOLUTION STYLE: Write the "Easiest Solution" possible. Point-wise scoring answer.
    
    FORMAT:
    TOPIC: [Core Concept Name]
    QUESTION: [The Question Text]
    YEAR: [Mention repeat years like 2023, 2019, 2015]
    INSIGHT: [Why this repeats]
    SOLUTION: [Easy scoring answer]
    [DIAGRAM: Optional]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text;
  } catch (err: any) {
    console.error("Gemini Error:", err);
    throw new Error(err.message || "Failed to generate MIQs.");
  }
};

export const generateVisualSolution = async (description: string, subject: string) => {
  try {
    const ai = getAI();
    let stylePrompt = `Educational diagram for Class 12: ${description}. Simple, clean, white background, black ink lines. Professional labels.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: stylePrompt }] },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    const part = response.candidates[0].content.parts.find(part => part.inlineData);
    return part?.inlineData?.data || null;
  } catch (err) {
    return null;
  }
};

export const generateChapterAudio = async (notes: string, subject: string) => {
  try {
    const ai = getAI();
    const prompt = `Explain this ${subject} topic simply in Hinglish. Start with "Namaste! Aaj hum ${subject} ka ye topic samjhenge...". Context: ${notes.substring(0, 1000)}`;
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
  } catch (err) {
    return null;
  }
};

export const chatWithTutor = async (history: any[], message: string) => {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: 'You are AceBot, an expert Class 12 Tutor. Speak in simple Hinglish. Focus on helping students understand concepts easily and score marks in Boards 2026 based on 15 years of paper analysis.',
      }
    });
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (err: any) {
    throw new Error(err.message || "Tutor is offline.");
  }
};
