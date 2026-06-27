import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { analyzeResumeWithGemini } from "../services/gemini.js";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
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

    console.log("Resume URL:", resumeUrl);

    // Extract S3 key
    const url = new URL(resumeUrl);

    const key = decodeURIComponent(
      url.pathname.substring(1)
    );

    console.log("S3 Key:", key);

    // Download resume
    const object = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      })
    );

    if (!object.Body) {
      throw new Error(
        "Resume body is empty."
      );
    }

    const chunks = [];

    for await (const chunk of object.Body) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    console.log(
      "Downloaded PDF:",
      buffer.length,
      "bytes"
    );

    // Gemini
    const analysis =
      await analyzeResumeWithGemini(
        buffer
      );

    console.log(
      "Gemini Analysis:",
      analysis
    );

    return res.status(200).json({
      success: true,
      analysis,
    });

  } catch (err) {
    console.error(
      "Analyze Resume Error:"
    );

    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }
}