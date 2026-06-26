import {
  S3Client,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  try {
    const result = await s3.send(
      new ListBucketsCommand({})
    );

    return res.status(200).json({
      success: true,
      buckets: result.Buckets.map(
        (b) => b.Name
      ),
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      name: err.name,
      message: err.message,
    });
  }
}