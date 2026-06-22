import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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
  try {
    console.log("=== S3 CONFIG ===");

    console.log({
      region: process.env.AWS_REGION,
      bucket:
        process.env.S3_BUCKET_NAME,
      hasAccessKey:
        !!process.env.AWS_ACCESS_KEY_ID,
      hasSecretKey:
        !!process.env
          .AWS_SECRET_ACCESS_KEY,
    });

    const {
      fileName,
      fileType,
    } = req.query;

    if (!fileName) {
      return res.status(400).json({
        error:
          "fileName parameter missing",
      });
    }

    if (!fileType) {
      return res.status(400).json({
        error:
          "fileType parameter missing",
      });
    }

    const key = `resumes/${Date.now()}-${fileName}`;

    const command =
      new PutObjectCommand({
        Bucket:
          process.env.S3_BUCKET_NAME,
        Key: key,
        ContentType: fileType,
      });

    const signedUrl =
      await getSignedUrl(
        s3,
        command,
        {
          expiresIn: 60,
        }
      );

    return res.status(200).json({
      success: true,
      url: signedUrl,
      key,
    });
  } catch (error) {
    console.error(
      "UPLOAD URL ERROR:"
    );

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unknown error",

      name: error.name,

      stack:
        process.env.NODE_ENV ===
        "development"
          ? error.stack
          : undefined,
    });
  }
}