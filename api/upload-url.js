import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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
  try {
    const {
      fileName,
      fileType,
    } = req.query;

    if (!fileName) {
      return res.status(400).json({
        success: false,
        error:
          "fileName parameter missing",
      });
    }

    const key = `resumes/${Date.now()}-${fileName}`;

    const command =
      new PutObjectCommand({
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
      key,
      fileType,
    });
  } catch (error) {
    console.error(
      "UPLOAD URL ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Failed to generate upload URL",
    });
  }
}