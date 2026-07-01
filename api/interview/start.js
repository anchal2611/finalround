import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// --------------------------------------------------
// Firebase
// --------------------------------------------------

if (!getApps().length) {

  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("FIREBASE_PRIVATE_KEY is missing.");
  }

  initializeApp({

    credential: cert({

      projectId: process.env.FIREBASE_PROJECT_ID,

      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,

      privateKey: privateKey.replace(/\\n/g, "\n"),

    }),

  });

}

const db = getFirestore();

// --------------------------------------------------
// Gemini
// --------------------------------------------------

if (!process.env.GEMINI_INTERVIEW_API_KEY) {
  throw new Error("GEMINI_INTERVIEW_API_KEY is missing.");
}

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_INTERVIEW_API_KEY
);

// --------------------------------------------------
// API
// --------------------------------------------------

export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({

      success: false,

      message: "Method Not Allowed"

    });

  }

  try {

    const {

      uid,

      role,

      experience,

      difficulty

    } = req.body;

    if (

      !uid ||

      !role ||

      !experience ||

      !difficulty

    ) {

      return res.status(400).json({

        success: false,

        message: "Missing required fields."

      });

    }

    //--------------------------------------------------
    // Fetch Resume Summary
    //--------------------------------------------------

    let resumeSummary = "";

    try {

      const doc = await db
        .collection("users")
        .doc(uid)
        .get();

      if (doc.exists) {

        const data = doc.data();

        resumeSummary =

          data?.summary ||

          data?.resumeSummary ||

          "";

      }

    }

    catch (e) {

      console.warn("Unable to fetch resume summary.");

    }

    //--------------------------------------------------
    // Prompt
    //--------------------------------------------------

    const prompt = `
You are an experienced technical interviewer.

Generate a realistic interview consisting of EXACTLY:

- 2 Resume Questions
- 6 Technical Questions
- 2 HR / Behavioural Questions

Candidate

Role:
${role}

Experience:
${experience}

Difficulty:
${difficulty}

${
resumeSummary
?

`Resume Summary:

${resumeSummary}

Generate resume-specific questions wherever possible.`

:

`No resume was uploaded.

Generate questions based only on the role, experience and difficulty.`

}

Rules:

- Technical questions must gradually increase in difficulty.
- HR questions should evaluate communication and decision making.
- Resume questions should reference projects and skills if available.
- Return ONLY JSON.
- No markdown.
- No explanation.

JSON format:

{
  "resume":[
    {
      "id":1,
      "topic":"",
      "question":""
    },
    {
      "id":2,
      "topic":"",
      "question":""
    }
  ],

  "technical":[
    {
      "id":3,
      "topic":"",
      "question":""
    },
    {
      "id":4,
      "topic":"",
      "question":""
    },
    {
      "id":5,
      "topic":"",
      "question":""
    },
    {
      "id":6,
      "topic":"",
      "question":""
    },
    {
      "id":7,
      "topic":"",
      "question":""
    },
    {
      "id":8,
      "topic":"",
      "question":""
    }
  ],

  "hr":[
    {
      "id":9,
      "topic":"",
      "question":""
    },
    {
      "id":10,
      "topic":"",
      "question":""
    }
  ]
}
`;

    //--------------------------------------------------
    // Gemini
    //--------------------------------------------------

    const model = genAI.getGenerativeModel({

      model: "gemini-3.5-flash"

    });

    const result =
      await model.generateContent(prompt);

    const text =
      result.response.text();

    //--------------------------------------------------
    // Extract JSON safely
    //--------------------------------------------------

    const start = text.indexOf("{");

    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {

      throw new Error(

        "Gemini returned invalid JSON."

      );

    }

    const json =
      text.slice(start, end + 1);

    const questions =
      JSON.parse(json);

    //--------------------------------------------------
    // Response
    //--------------------------------------------------

    return res.status(200).json({

      success: true,

      interviewId:
        crypto.randomUUID(),

      role,

      experience,

      difficulty,

      questions

    });

  }

  catch (error) {

    console.error("Interview Start Error:");

    console.error(error);

    console.error(error.stack);

    return res.status(500).json({

      success: false,

      message: error.message,

      stack:
        process.env.NODE_ENV === "development"
          ? error.stack
          : undefined

    });

  }

}