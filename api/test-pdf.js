import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import pdf from "pdf-parse";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId:
      process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  try {
    const { resumeUrl } = req.query;

    if (!resumeUrl) {
      return res.status(400).json({
        error: "Missing resumeUrl",
      });
    }

    const key = decodeURIComponent(
      resumeUrl.split(".amazonaws.com/")[1]
    );

    console.log("KEY:", key);

    const response = await s3.send(
      new GetObjectCommand({
        Bucket:
          process.env.S3_BUCKET_NAME,
        Key: key,
      })
    );

    const chunks = [];

    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    const parsed = await pdf(buffer);

    return res.status(200).json({
      success: true,

      characters: parsed.text.length,

      preview: parsed.text.slice(0, 800),
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