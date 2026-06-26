import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
  useEffect,
  useState,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
} from "lucide-react";

export default function ResumeViewer() {
  const { user } = useAuth();

  const navigate =
    useNavigate();

  const [resumeUrl, setResumeUrl] =
    useState("");

  useEffect(() => {
    async function load() {
      try {
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

        if (!signed.success)
          throw new Error(
            signed.error
          );

        setResumeUrl(
          signed.url
        );
      } catch (err) {
        console.error(err);
      }
    }

    if (user) load();
  }, [user]);

  if (!resumeUrl)
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <p className="text-white text-lg">
          Loading Resume...
        </p>
      </div>
    );

  return (
    <div className="h-screen bg-[#09090b] overflow-hidden">

      {/* Navbar */}

      <header
        className="
          h-16
          border-b
          border-white/10
          bg-black/40
          backdrop-blur-xl
          flex
          items-center
          px-8
          sticky
          top-0
          z-50
        "
      >
        <button
          onClick={() =>
            navigate(-1)
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-white
            transition
            hover:bg-white/10
          "
        >
          <ArrowLeft
            size={18}
          />

          Back to Dashboard
        </button>
      </header>

      {/* PDF */}

      <iframe
        src={resumeUrl}
        title="Resume"
        className="
          w-full
          h-[calc(100vh-64px)]
          bg-white
        "
      />
    </div>
  );
}