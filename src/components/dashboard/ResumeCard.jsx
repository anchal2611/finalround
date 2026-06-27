import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import { uploadResume } from "../../services/uploadResume";
import { analyzeResume } from "../../services/analyzeResume";

import { useNavigate } from "react-router-dom";

export default function ResumeCard() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] =
    useState(false);

  const [resume, setResume] = useState({
    score: 0,
    atsScore: 0,
    uploaded: false,
    resumeUrl: "",
    resumeKey: "",
    strengths: [],
    improvements: [],
    summary: "",
    verdict: "",
    missingKeywords: [],
    criticalFixes: [],
    categoryScores: [],
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchResume = async () => {
      try {
        const userRef = doc(
          db,
          "users",
          user.uid
        );

        const snap =
          await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();

          setResume({
            score:
              data.resumeScore || 0,

            atsScore:
              data.atsScore || 0,

            uploaded:
              data.resumeUploaded ||
              false,

            resumeUrl:
              data.resumeUrl || "",

            strengths:
              data.strengths || [],

            improvements:
              data.improvements || [],

            summary:
              data.summary || "",

            verdict:
              data.verdict || "",

            missingKeywords:
              data.missingKeywords || [],

            criticalFixes:
              data.criticalFixes || [],

            categoryScores:
              data.categoryScores || [],

            resumeKey:
              data.resumeKey || "",

            missingKeywords:
              analysis.missingKeywords,

            criticalFixes:
              analysis.criticalFixes,

            categoryScores:
              analysis.categoryScores,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [user]);

  const handleViewResume = async () => {
    navigate("/dashboard/resume");
  };

  const handleResumeUpload = async (event) => {
    try {
      const file = event.target.files?.[0];

      if (!file) return;

      // Reset input so selecting the same file again works
      event.target.value = "";

      if (file.type !== "application/pdf") {
        alert("Please upload a PDF resume.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert("Resume must be under 10MB.");
        return;
      }

      setUploading(true);
      setStatus("Uploading Resume...");

      // Upload to S3
      const { url, key } = await uploadResume(file);

      setStatus("Analyzing Resume with AI...");

      // Gemini Analysis
      const analysis = await analyzeResume(url);

      if (!analysis || typeof analysis !== "object") {
        throw new Error("AI analysis failed.");
      }

      setStatus("Saving Results...");

      // Save to Firestore
      await updateDoc(
        doc(db, "users", user.uid),
        {
          resumeUploaded: true,

          resumeUrl: url,

          resumeKey: key,

          uploadedAt: new Date(),

          resumeScore:
            analysis.resumeScore ?? 0,

          atsScore:
            analysis.atsScore ?? 0,

          strengths:
            analysis.strengths ?? [],

          improvements:
            analysis.improvements ?? [],

          summary:
            analysis.summary ?? "",

          verdict:
            analysis.verdict ?? "",

          missingKeywords:
            analysis.missingKeywords ?? [],

          criticalFixes:
            analysis.criticalFixes ?? [],

          categoryScores:
            analysis.categoryScores ?? [],
        }
      );

      // Update UI instantly
      setResume({
        uploaded: true,

        resumeUrl: url,

        resumeKey: key,

        score:
          analysis.resumeScore ?? 0,

        atsScore:
          analysis.atsScore ?? 0,

        strengths:
          analysis.strengths ?? [],

        improvements:
          analysis.improvements ?? [],

        summary:
          analysis.summary ?? "",

        verdict:
          analysis.verdict ?? "",

        missingKeywords:
          analysis.missingKeywords ?? [],

        criticalFixes:
          analysis.criticalFixes ?? [],

        categoryScores:
          analysis.categoryScores ?? [],
      });

      setStatus("");

      alert("Resume analyzed successfully!");

    } catch (error) {
      console.error(error);

      setStatus("");

      alert(
        error.message ||
        "Resume upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="
          h-[420px]
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          animate-pulse
        "
      />
    );
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      "
    >
      {/* Glow */}

      <div
        className="
          absolute
          -bottom-20
          -left-20
          h-72
          w-72
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

      <div className="relative z-10">

        {/* Header */}

        <div className="mb-8">
          <h3 className="text-2xl font-semibold">
            Resume Analysis
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Upload your resume and
            receive AI-powered
            feedback.
          </p>
        </div>

        {!resume.uploaded ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-white/20
              bg-white/5
              p-8
              text-center
            "
          >
            <div
              className="
                mx-auto
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-white/5
                border
                border-white/10
              "
            >
              📄
            </div>

            <h4 className="font-semibold">
              No Resume Uploaded
            </h4>

            <p
              className="
                mt-2
                text-sm
                text-zinc-500
              "
            >
              Upload a PDF resume to
              unlock analysis,
              ATS scoring and
              personalized feedback.
            </p>

            <label
              className="
                mt-6
                inline-flex
                cursor-pointer
                rounded-xl
                bg-white
                px-5
                py-3
                font-medium
                text-black
                transition
                hover:scale-105
              "
            >
              {uploading
                ? "Uploading..."
                : "Upload Resume"}

              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={
                  handleResumeUpload
                }
              />
            </label>
          </div>
        ) : (
          <>
            {/* Score */}

            <div className="flex justify-center mb-8">
              <div
                className="
                  flex
                  h-36
                  w-36
                  items-center
                  justify-center
                  rounded-full
                  border-4
                  border-cyan-500/30
                "
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold">
                    {resume.score}
                  </h2>

                  <p
                    className="
                      text-xs
                      text-zinc-500
                    "
                  >
                    Resume Score
                  </p>
                </div>
              </div>
            </div>

            {/* ATS */}

            <div
              className="
                mb-6
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-4
              "
            >
              <div className="flex justify-between">
                <span>
                  ATS Compatibility
                </span>

                <span
                  className="
                    font-semibold
                    text-cyan-400
                  "
                >
                  {resume.atsScore}%
                </span>
              </div>
            </div>

            {/* Summary */}

            <div
              className="
                mb-6
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
              "
            >
              <h4 className="mb-2 font-semibold">
                AI Summary
              </h4>

              <p className="text-sm text-zinc-400 leading-7">
                {resume.summary}
              </p>
            </div>

            {/* Verdict */}

            <div
            className={`
            inline-flex
            px-4
            py-2
            rounded-full
            text-sm
            font-medium

            ${
              resume.verdict ===
              "Likely to Pass ATS"
                ? "bg-green-500/20 text-green-400"
                : resume.verdict ===
                  "Borderline"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
            }
            `}
            >
            {resume.verdict}
            </div>

            {/* Strengths */}

            <div className="mb-6">
              <h4 className="mb-3 font-medium">
                Strengths
              </h4>

              <div className="space-y-2">
                {resume.strengths
                  ?.length ? (
                  resume.strengths.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={index}
                        className="
                          rounded-xl
                          bg-white/5
                          px-3
                          py-2
                          text-sm
                        "
                      >
                        ✓ {item}
                      </div>
                    )
                  )
                ) : (
                  <p className="text-sm text-zinc-500">
                    No strengths
                    available yet.
                  </p>
                )}
              </div>
            </div>

            {/* Improvements */}

            <div>
              <h4 className="mb-3 font-medium">
                Improvements
              </h4>

              <div className="space-y-2">
                {resume.improvements
                  ?.length ? (
                  resume.improvements.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={index}
                        className="
                          rounded-xl
                          bg-white/5
                          px-3
                          py-2
                          text-sm
                        "
                      >
                        ⚠ {item}
                      </div>
                    )
                  )
                ) : (
                  <p className="text-sm text-zinc-500">
                    No recommendations
                    available yet.
                  </p>
                )}
              </div>
            </div>

            {resume.resumeUrl && (
                <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleViewResume}
                      className="
                        rounded-xl
                        bg-cyan-500
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-black
                        transition
                        hover:scale-105
                      "
                    >
                      View Resume
                    </button>

                    <label
                    className="
                        cursor-pointer
                        rounded-xl
                        border
                        border-white/10
                        px-4
                        py-2
                        text-sm
                        transition
                        hover:bg-white/5
                    "
                    >
                    Re-upload

                    <input
                        hidden
                        type="file"
                        accept=".pdf"
                        onChange={
                        handleResumeUpload
                        }
                    />
                    </label>
                </div>
                )}
          </>
        )}
      </div>
    </div>
  );
}