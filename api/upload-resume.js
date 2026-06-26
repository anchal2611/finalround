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
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
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
    const { fields, files } =
      await new Promise(
        (resolve, reject) => {
          const form = formidable({
            multiples: false,
            keepExtensions: true,
          });

          form.parse(
            req,
            (
              err,
              fields,
              files
            ) => {
              if (err)
                reject(err);
              else
                resolve({
                  fields,
                  files,
                });
            }
          );
        }
      );

    const file = Array.isArray(
      files.resume
    )
      ? files.resume[0]
      : files.resume;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: "No resume uploaded",
      });
    }

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

    const url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return res.status(200).json({
      success: true,
      url,
      key,
    });
  } catch (err) {
    console.error(
      "UPLOAD ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      error:
        err.message ||
        "Upload failed",
      name: err.name,
    });
  }
}