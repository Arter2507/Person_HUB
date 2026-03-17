
import { GoogleGenAI } from "@google/genai";

// This is a placeholder file to demonstrate project structure.
// The API key should be handled via environment variables and not be hardcoded.
// Ensure you have `process.env.API_KEY` configured in your build environment.

let ai: GoogleGenAI | null = null;

const getAi = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            console.error("API_KEY environment variable not set.");
            return null;
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}


/**
 * Generates content based on a text prompt.
 * @param prompt The text prompt to send to the model.
 * @returns The generated text content.
 */
export const generateContent = async (prompt: string): Promise<string> => {
  const genAI = getAi();
  if (!genAI) {
      return "Error: Gemini AI client is not initialized. Check API key."
  }
  
  try {
    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Sorry, I couldn't generate a response right now.";
  }
};
