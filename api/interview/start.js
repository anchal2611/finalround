import { GoogleGenerativeAI } from "@google/generative-ai";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_INTERVIEW_API_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  try {
    const {
      uid,
      role,
      experience,
      difficulty,
    } = req.body;

    if (!uid || !role || !experience || !difficulty) {
      return res.status(400).json({
        message: "Missing required fields.",
      });
    }

    const userRef = db.collection("users").doc(uid);

    const snap = await userRef.get();

    let resumeSummary = "";

    if (snap.exists) {
      resumeSummary = snap.data().summary || "";
    }

    const prompt = `
You are an expert technical interviewer.

Generate a complete mock interview.

Candidate Details

Target Role:
${role}

Experience:
${experience}

Difficulty:
${difficulty}

${
  resumeSummary
    ? `Resume Summary:
${resumeSummary}

Generate resume-specific questions wherever appropriate.`
    : `The candidate has not uploaded a resume.
Generate generic interview questions based only on role, experience and difficulty.`
}

Return ONLY valid JSON.

{
  "resume":[
    {
      "id":1,
      "topic":"...",
      "question":"..."
    },
    {
      "id":2,
      "topic":"...",
      "question":"..."
    }
  ],

  "technical":[
    {
      "id":3,
      "topic":"...",
      "question":"..."
    },
    {
      "id":4,
      "topic":"...",
      "question":"..."
    },
    {
      "id":5,
      "topic":"...",
      "question":"..."
    },
    {
      "id":6,
      "topic":"...",
      "question":"..."
    },
    {
      "id":7,
      "topic":"...",
      "question":"..."
    },
    {
      "id":8,
      "topic":"...",
      "question":"..."
    }
  ],

  "hr":[
    {
      "id":9,
      "topic":"...",
      "question":"..."
    },
    {
      "id":10,
      "topic":"...",
      "question":"..."
    }
  ]
}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleaned);

    return res.status(200).json({
      success: true,
      interviewId: crypto.randomUUID(),
      role,
      experience,
      difficulty,
      questions,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}