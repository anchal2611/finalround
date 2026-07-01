import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_INTERVIEW_API_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const {
      question,
      answer,
      resumeSummary,
      stage
    } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
You are a senior technical interviewer.

Interview Stage:
${stage}

Candidate Resume:
${resumeSummary}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer.

Return ONLY valid JSON.

{
  "overallScore": number,
  "communication": number,
  "technicalKnowledge": number,
  "confidence": number,
  "strengths": [
    ""
  ],
  "improvements": [
    ""
  ],
  "feedback": ""
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    return res.status(200).json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }
}