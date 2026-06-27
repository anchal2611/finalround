import { adminDb } from "../firebase/admin.js";

export default async function handler(req, res) {
  try {
    await adminDb
      .collection("test")
      .doc("hello")
      .set({
        working: true,
        createdAt: new Date(),
      });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
      stack: err.stack,
    });
  }
}