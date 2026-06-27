import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import os from "os";
import path from "path";
import ATS_PROMPT from "../prompts/atsPrompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function analyzeResumeWithGemini(buffer) {
  let tempPath = null;
  let uploadedFile = null;

  try {
    // Save PDF temporarily
    tempPath = path.join(
      os.tmpdir(),
      `resume-${Date.now()}.pdf`
    );

    fs.writeFileSync(tempPath, buffer);

    console.log("Uploading PDF...");

    uploadedFile = await ai.files.upload({
      file: tempPath,
      config: {
        mimeType: "application/pdf",
      },
    });

    console.log("Uploaded:", uploadedFile);

    console.log("Generating ATS Report...");

   const response =
    await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
        {
            role: "user",
            parts: [
            {
                fileData: {
                fileUri: uploadedFile.uri,
                mimeType: uploadedFile.mimeType,
                },
            },
            {
                text: ATS_PROMPT,
            },
            ],
        },
        ],

        config: {
        temperature: 0.2,
        maxOutputTokens: 4000,
        responseMimeType: "application/json",
        },
    });

    let text = response.text;

    // Some SDK versions expose response.text() instead of response.text
    if (typeof text === "function") {
    text = await text();
    }

    if (!text) {
    throw new Error(
        "Gemini returned an empty response."
    );
    }

    console.log(
    "========== GEMINI RAW =========="
    );
    console.log(text);
    console.log(
    "================================"
    );

    // Remove markdown if Gemini still adds it
    text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

    // Find JSON object
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");

    if (
    firstBrace === -1 ||
    lastBrace === -1
    ) {
    throw new Error(
        "Gemini did not return JSON:\n\n" +
        text
    );
    }

    const jsonString = text.substring(
    firstBrace,
    lastBrace + 1
    );

    let analysis;

    try {
    analysis = JSON.parse(jsonString);
    } catch (err) {
    console.error(
        "===== INVALID JSON ====="
    );
    console.error(jsonString);
    console.error(
        "========================"
    );

    throw err;
    }     return analysis;

  } catch (err) {
    console.error("Gemini Error:");
    console.error(err);

    throw err;

  } finally {
    // Delete uploaded Gemini file
    if (uploadedFile?.name) {
      try {
        await ai.files.delete({
          name: uploadedFile.name,
        });

        console.log("Deleted uploaded Gemini file.");
      } catch (e) {
        console.log(
          "Unable to delete uploaded Gemini file."
        );
      }
    }

    // Delete temporary local PDF
    if (
      tempPath &&
      fs.existsSync(tempPath)
    ) {
      fs.unlinkSync(tempPath);
    }
  }
}