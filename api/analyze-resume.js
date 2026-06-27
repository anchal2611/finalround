import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { GoogleGenAI } from "@google/genai";
import ATS_PROMPT from "../prompts/atsPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId:
      process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(
  req,
  res
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { resumeUrl } = req.body;

    if (!resumeUrl) {
      return res.status(400).json({
        success: false,
        error: "resumeUrl is required",
      });
    }

    // Extract S3 object key
    const url = new URL(resumeUrl);

    const key = decodeURIComponent(
      url.pathname.substring(1)
    );

    console.log("Key:", key);

    // Download PDF from S3
    const object = await s3.send(
      new GetObjectCommand({
        Bucket:
          process.env.S3_BUCKET_NAME,
        Key: key,
      })
    );

    const chunks = [];

    for await (const chunk of object.Body) {
      chunks.push(chunk);
    }

    const pdfBuffer =
      Buffer.concat(chunks);

    console.log(
      "Downloaded:",
      pdfBuffer.length
    );

    // Convert PDF to Base64
    const pdfBase64 =
      pdfBuffer.toString("base64");

    // Ask Gemini to analyze the PDF directly
    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          {
            inlineData: {
              mimeType:
                "application/pdf",
              data: pdfBase64,
            },
          },
          {
            text: ATS_PROMPT,
          },
        ],
      });

    let text =
      response.text;

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis =
      JSON.parse(text);

    return res.status(200).json({
      success: true,
      analysis,
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