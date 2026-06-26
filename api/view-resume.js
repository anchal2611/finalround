import {
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import {
  initializeApp,
  cert,
} from "firebase-admin/app";

import {
  getFirestore,
} from "firebase-admin/firestore";

import { getApps } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:
        process.env.FIREBASE_PROJECT_ID,

      clientEmail:
        process.env.FIREBASE_CLIENT_EMAIL,

      privateKey:
        process.env.FIREBASE_PRIVATE_KEY.replace(
          /\\n/g,
          "\n"
        ),
    }),
  });
}

const firestore =
  getFirestore();

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
    if (req.method !== "GET") {
      return res.status(405).json({
        success: false,
        error: "Method not allowed",
      });
    }

    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({
        success: false,
        error: "Missing user id",
      });
    }

    const userDoc =
      await firestore
        .collection("users")
        .doc(uid)
        .get();

    if (!userDoc.exists) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const data = userDoc.data();

    if (!data.resumeUrl) {
      return res.status(404).json({
        success: false,
        error: "Resume not found",
      });
    }

    const key = decodeURIComponent(
      data.resumeUrl.split(
        ".amazonaws.com/"
      )[1]
    );

    const object =
      await s3.send(
        new GetObjectCommand({
          Bucket:
            process.env
              .S3_BUCKET_NAME,

          Key: key,
        })
      );

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "inline"
    );

    object.Body.pipe(res);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error:
        err.message ||
        "Unable to load resume",
    });
  }
}