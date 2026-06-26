import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
  useEffect,
  useState,
} from "react";

import { useAuth } from "../context/AuthContext";

export default function ResumeViewer() {
  const { user } = useAuth();

  const [resumeUrl, setResumeUrl] =
    useState("");

  useEffect(() => {
    async function load() {
      const snap =
        await getDoc(
          doc(
            db,
            "users",
            user.uid
          )
        );

      const data =
        snap.data();

      const response =
        await fetch(
          `/api/get-resume-url?key=${encodeURIComponent(
            data.resumeUrl
          )}`
        );

      const signed =
        await response.json();

      setResumeUrl(signed.url);
    }

    if (user) load();
  }, [user]);

  if (!resumeUrl)
    return (
      <div className="text-white flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <iframe
      src={resumeUrl}
      className="w-screen h-screen"
      title="Resume"
    />
  );
}