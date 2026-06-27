export default async function handler(req, res) {
  try {
    return res.status(200).json({
      projectId: process.env.FIREBASE_PROJECT_ID,
      hasEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}