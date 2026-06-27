import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import pdf from "pdf-parse";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(
  req,
  res
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { resumeUrl } = req.query;

    if (!resumeUrl) {
      return res.status(400).json({
        success: false,
        error: "Missing resumeUrl",
      });
    }

    console.log("Resume URL:");
    console.log(resumeUrl);

    // Extract S3 object key correctly
    const url = new URL(resumeUrl);

    const key = decodeURIComponent(
      url.pathname.substring(1)
    );

    console.log("Bucket:");
    console.log(process.env.S3_BUCKET_NAME);

    console.log("Key:");
    console.log(key);

    const command =
      new GetObjectCommand({
        Bucket:
          process.env.S3_BUCKET_NAME,
        Key: key,
      });

    console.log(
      "Downloading from S3..."
    );

    const response =
      await s3.send(command);

    console.log(
      "Downloaded Successfully"
    );

    if (!response.Body) {
      throw new Error(
        "S3 returned empty body."
      );
    }

    const chunks = [];

    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }

    const buffer =
      Buffer.concat(chunks);

    console.log(
      "Buffer Size:",
      buffer.length
    );

    console.log(
      "Parsing PDF..."
    );

    const parsed =
      await pdf(buffer);

    console.log(
      "Characters:",
      parsed.text.length
    );

    return res.status(200).json({
      success: true,

      characters:
        parsed.text.length,

      pages:
        parsed.numpages,

      preview:
        parsed.text.slice(
          0,
          1000
        ),
    });

  } catch (err) {
    console.error(
      "TEST PDF ERROR:"
    );

    console.error(err);

    return res.status(500).json({
      success: false,

      error: err.message,

      name: err.name,

      stack: err.stack,
    });
  }
}