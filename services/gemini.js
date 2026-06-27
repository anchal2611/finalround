import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import os from "os";
import path from "path";
import ATS_PROMPT from "../prompts/atsPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeResumeWithGemini(buffer) {
  let tempFile = null;

  try {
    // Create temporary PDF
    tempFile = path.join(
      os.tmpdir(),
      `resume-${Date.now()}.pdf`
    );

    fs.writeFileSync(tempFile, buffer);

    console.log("Uploading PDF to Gemini...");

    const uploadedFile =
      await ai.files.upload({
        file: tempFile,
        config: {
          mimeType: "application/pdf",
        },
      });

    console.log(
      "Uploaded:",
      uploadedFile.name
    );

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          uploadedFile,
          ATS_PROMPT,
        ],
      });

    const text =
      response.text
        ?.replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    if (!text) {
      throw new Error(
        "Gemini returned empty response."
      );
    }

    return JSON.parse(text);

  } finally {
    if (
      tempFile &&
      fs.existsSync(tempFile)
    ) {
      fs.unlinkSync(tempFile);
    }
  }
}