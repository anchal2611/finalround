import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const resumeText = `
Anchal Gupta

B.Tech Computer Science Engineering

Skills
React
Firebase
AWS
Node.js
JavaScript
Python

Projects
FinalRound
WishBox
CryCompass

Achievements
Winner of multiple hackathons.
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: `
You are an ATS.

Read this resume and give only a short summary.

Resume:

${resumeText}
`,
      });

    console.log(response);

    return res.status(200).json({
      success: true,

      text: response.text,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,

      error: err.message,

      stack: err.stack,
    });
  }
}