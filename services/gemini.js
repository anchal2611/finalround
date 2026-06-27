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

  try {
    // Save PDF temporarily
    tempPath = path.join(
      os.tmpdir(),
      `resume-${Date.now()}.pdf`
    );

    fs.writeFileSync(tempPath, buffer);

    console.log("Uploading PDF...");

    const uploadedFile =
      await ai.files.upload({
        file: tempPath,
      });

    console.log(uploadedFile);

    console.log("Generating ATS Report...");

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          uploadedFile,

          ATS_PROMPT,
        ],
      });

    let text =
      response.text;

    if (!text) {
      throw new Error(
        "Gemini returned empty response."
      );
    }

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const json =
      JSON.parse(text);

    // Cleanup uploaded file
    try {
      await ai.files.delete({
        name: uploadedFile.name,
      });
    } catch (e) {
      console.log(
        "Unable to delete uploaded file."
      );
    }

    return json;

  } catch (err) {
    console.error(err);

    throw err;

  } finally {
    if (
      tempPath &&
      fs.existsSync(tempPath)
    ) {
      fs.unlinkSync(tempPath);
    }
  }
}