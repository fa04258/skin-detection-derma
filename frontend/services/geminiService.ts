
import { GoogleGenAI } from "@google/genai";

// In Vite, env vars must be prefixed with VITE_ and accessed via import.meta.env
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export const analyzeSkinImage = async (base64Image: string, mimeType: string) => {
  try {
    const imagePart = fileToGenerativePart(base64Image, mimeType);
    const prompt = `
      Analyze this image of human skin. Identify any visible potential skin issues like acne, rashes, dryness, dark spots, or moles. 
      For each potential issue you identify, suggest 1-2 common and safe home remedies. 
      If the skin appears healthy, state that. 
      Present the analysis in a clear, easy-to-read format using markdown. Use headings for issues and bullet points for remedies.
      IMPORTANT: Do not provide a medical diagnosis. Frame your response as suggestions and observations, not as medical advice. Start your response with a clear, friendly opening and end with a disclaimer that this is not a substitute for professional medical advice.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [imagePart, { text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Error analyzing skin image:", error);
    if (error instanceof Error) {
        return `An error occurred while analyzing the image: ${error.message}. Please try again.`;
    }
    return "An unknown error occurred while analyzing the image.";
  }
};
