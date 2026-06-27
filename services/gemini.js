import { GoogleGenAI } from "@google/genai";
import ATS_PROMPT from "../prompts/atsPrompt";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are an enterprise-level ATS evaluator and senior recruiter.

You MUST return ONLY valid JSON.

Return this exact structure:

{
  "resumeScore": 0,
  "atsScore": 0,
  "verdict": "",
  "summary": "",
  "strengths": [],
  "improvements": [],
  "criticalFixes": [],
  "missingKeywords": [],
  "categoryScores": [
    {
      "category": "",
      "score": 0,
      "max": 0,
      "feedback": ""
    }
  ]
}

Analyze the resume according to these rules:

${ATS_PROMPT}
`;

export async function analyzeResume(text) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}

Resume:

${text}`,
            },
          ],
        },
      ],
    });

    let output =
      response.text.trim();

    // remove markdown if Gemini wraps JSON
    output = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(output);
  } catch (err) {
    console.error(
      "Gemini Error:",
      err
    );

    throw new Error(
      "Gemini analysis failed."
    );
  }
}