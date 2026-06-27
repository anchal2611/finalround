import { GoogleGenAI } from "@google/genai";
import ATS_PROMPT from "../prompts/atsPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeResumeWithGemini(
  resumeText
) {
  try {
    const prompt = `
${ATS_PROMPT}

IMPORTANT:

Return ONLY valid JSON.

Do not use markdown.

Do not wrap the JSON inside \`\`\`.

Return exactly this format:

{
  "resumeScore":0,
  "atsScore":0,
  "verdict":"",
  "summary":"",
  "strengths":[],
  "improvements":[],
  "criticalFixes":[],
  "missingKeywords":[],
  "categoryScores":[
    {
      "category":"",
      "score":0,
      "max":0,
      "feedback":""
    }
  ]
}

Resume:

${resumeText}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: prompt,
      });

    let text =
      response.text;

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    // Remove markdown if Gemini adds it

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (err) {
    console.error(
      "Gemini Error:",
      err
    );

    throw new Error(
      "Failed to analyze resume."
    );
  }
}