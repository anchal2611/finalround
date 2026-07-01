import crypto from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_INTERVIEW_API_KEY
);

export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });

  }

  try {

    const {

      role,

      experience,

      difficulty,

      resumeSummary = ""

    } = req.body;

    if (

      !role ||

      !experience ||

      !difficulty

    ) {

      return res.status(400).json({

        success: false,

        message: "Missing required fields."

      });

    }

    const prompt = `
You are an experienced technical interviewer.

Generate a realistic mock interview.

Candidate

Role:
${role}

Experience:
${experience}

Difficulty:
${difficulty}

${
resumeSummary.trim().length > 0

?

`Resume Summary:

${resumeSummary}

Generate resume-specific questions wherever possible.`

:

`No resume uploaded.

Generate questions using only the role, experience and difficulty.`

}

Requirements

- EXACTLY 2 Resume Questions
- EXACTLY 6 Technical Questions
- EXACTLY 2 HR Questions

Return ONLY valid JSON.

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

    const model = genAI.getGenerativeModel({

      model: "gemini-2.5-flash"

    });

    const result =
      await model.generateContent(prompt);

    const text =
      result.response.text();

    const start =
      text.indexOf("{");

    const end =
      text.lastIndexOf("}");

    if (

      start === -1 ||

      end === -1

    ) {

      throw new Error(
        "Gemini returned invalid JSON."
      );

    }

    const json =
      text.slice(
        start,
        end + 1
      );

    const questions =
      JSON.parse(json);

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

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

}