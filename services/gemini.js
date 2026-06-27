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
                  mimeType:
                    uploadedFile.mimeType,
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
          maxOutputTokens: 2000,
        },
      });

    const text =
      response.text?.trim();

    if (!text) {
      throw new Error(
        "Gemini returned an empty response."
      );
    }

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (err) {
    console.error(
      "Gemini Error:"
    );

    console.error(err);

    throw err;

  } finally {
    if (
      uploadedFile?.name
    ) {
      try {
        await ai.files.delete({
          name:
            uploadedFile.name,
        });
      } catch (e) {
        console.log(
          "Unable to delete uploaded file."
        );
      }
    }

    if (
      tempPath &&
      fs.existsSync(tempPath)
    ) {
      fs.unlinkSync(tempPath);
    }
  }
}