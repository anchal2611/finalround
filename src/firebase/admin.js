import admin from "firebase-admin";

console.log("Project:", process.env.FIREBASE_PROJECT_ID);
console.log("Email exists:", !!process.env.FIREBASE_CLIENT_EMAIL);
console.log("Private key exists:", !!process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminDb = admin.firestore();