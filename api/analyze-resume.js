import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import {
  extractTextFromBuffer,
} from "../utils/extractText.js";

import {
  analyzeResumeWithGemini,
} from "../services/gemini.js";

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
        error: "Missing resume URL",
      });
    }

    // Extract object key from S3 URL
    const key = decodeURIComponent(
      resumeUrl.split(".amazonaws.com/")[1]
    );

    const command =
      new GetObjectCommand({
        Bucket:
          process.env.S3_BUCKET_NAME,
        Key: key,
      });

    const response =
      await s3.send(command);

    const chunks = [];

    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }

    const buffer =
      Buffer.concat(chunks);

    const resumeText =
      await extractTextFromBuffer(
        buffer
      );

    const analysis =
      await analyzeResumeWithGemini(
        resumeText
      );

    return res.status(200).json({
      success: true,
      analysis,
    });
  } catch (err) {
    console.error(
      "Analyze Resume Error:",
      err
    );

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}