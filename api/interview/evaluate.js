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

            question,

            transcript,

            stage,

            confidenceAnalysis,

            previousResponses = []

        } = req.body;

        if (!question || !transcript || !stage) {

            return res.status(400).json({

                success: false,

                message: "Missing required fields."

            });

        }

        const model = genAI.getGenerativeModel({

            model: "gemini-2.5-flash"

        });

        const prompt = `
You are an experienced technical interviewer.

Your job is to evaluate ONE interview answer.

Interview Stage:
${stage}

Question:
${question}

Candidate Answer:
${transcript}

Voice Analysis:
${JSON.stringify(confidenceAnalysis, null, 2)}

Previous Interview Context:
${JSON.stringify(previousResponses, null, 2)}

-------------------------

Evaluate the candidate based primarily on:

1. Relevance to the question
2. Technical correctness
3. Communication clarity
4. Confidence
5. Structure
6. Completeness

The voice analysis is only supporting evidence.
Do NOT reduce the score only because of pauses.
Evaluate the content first.

Return ONLY valid JSON.

{
    "overallScore":0,

    "communication":0,

    "technicalKnowledge":0,

    "confidence":0,

    "clarity":0,

    "relevance":0,

    "strengths":[
        ""
    ],

    "improvements":[
        ""
    ],

    "feedback":"",

    "idealAnswer":"",

    "nextRecommendation":""
}

Do not wrap the JSON inside markdown.
`;

        const result = await model.generateContent(prompt);

        let text = result.response.text();

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const evaluation = JSON.parse(text);

        return res.status(200).json({

            success: true,

            evaluation

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