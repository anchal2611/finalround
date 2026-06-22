import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY,
  },
  requestChecksumCalculation:
    "WHEN_REQUIRED",
});

export default async function handler(
  req,
  res
) {
  try {
    const { fileName } = req.query;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        error: "Missing fileName",
      });
    }

    const key = `resumes/${Date.now()}-${fileName}`;

    const command =
      new PutObjectCommand({
        Bucket:
          process.env.S3_BUCKET_NAME,
        Key: key,
      });

    const url = await getSignedUrl(
      s3,
      command,
      {
        expiresIn: 300,
      }
    );

    return res.status(200).json({
      success: true,
      url,
      key,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}