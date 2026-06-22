import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  try {
    const { fileName, fileType } = req.query;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `resumes/${Date.now()}-${fileName}`,
      ContentType: fileType,
    });

    const url = await getSignedUrl(
      s3,
      command,
      { expiresIn: 60 }
    );

    res.status(200).json({ url });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate upload URL",
    });
  }
}