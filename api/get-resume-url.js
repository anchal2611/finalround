import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
    let { key } = req.query;

    if (!key) {
      return res.status(400).json({
        success: false,
        error: "Missing key",
      });
    }

    // If frontend sends full URL, extract key
    if (key.startsWith("http")) {
      key = decodeURIComponent(
        key.split(".amazonaws.com/")[1]
      );
    }

    const command =
      new GetObjectCommand({
        Bucket:
          process.env.S3_BUCKET_NAME,
        Key: key,
      });

    const signedUrl =
      await getSignedUrl(
        s3,
        command,
        {
          expiresIn: 300,
        }
      );

    return res.status(200).json({
      success: true,
      url: signedUrl,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}