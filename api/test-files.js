import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import os from "os";
import path from "path";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const temp = path.join(
      os.tmpdir(),
      "hello.txt"
    );

    fs.writeFileSync(
      temp,
      "Hello Gemini!"
    );

    const file = await ai.files.upload({
      file: temp,
    });

    return res.status(200).json({
      success: true,
      file,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }
}