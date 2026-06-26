import { adminDb } from "../firebase/admin";

export default async function handler(
  req,
  res
) {
  try {
    await adminDb
      .collection("test")
      .doc("hello")
      .set({
        working: true,
        time: new Date(),
      });

    return res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}