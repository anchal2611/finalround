import formidable from "formidable";
import fs from "fs";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

export const config = {
  api: {
    bodyParser: false,
  },
};

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
  console.log("UPLOAD RESUME API HIT");

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    console.log("Parsing form...");

    const form = formidable({
      multiples: false,
    });

    const [fields, files] =
      await form.parse(req);

    console.log("FILES:", files);

    const file = files.resume?.[0];

    if (!file) {
      console.log("NO FILE FOUND");

      return res.status(400).json({
        success: false,
        error: "No resume uploaded",
      });
    }

    console.log(
      "Uploading:",
      file.originalFilename
    );

    const fileBuffer =
      fs.readFileSync(
        file.filepath
      );

    const key = `resumes/${Date.now()}-${
      file.originalFilename
    }`;

    await s3.send(
      new PutObjectCommand({
        Bucket:
          process.env
            .S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType:
          "application/pdf",
      })
    );

    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    console.log(
      "UPLOAD SUCCESS:",
      fileUrl
    );

    return res.status(200).json({
      success: true,
      url: fileUrl,
    });
  } catch (error) {
    console.error(
      "UPLOAD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Upload failed",
    });
  }
}