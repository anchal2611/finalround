import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useResumeAnalysis } from "../../hooks/useResumeAnalysis";

function formatDate(date) {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function statusClasses(status) {
  if (status === "Likely to Pass ATS") {
    return "bg-green-500/15 text-green-300 border-green-500/20";
  }

  if (status === "Borderline") {
    return "bg-yellow-500/15 text-yellow-300 border-yellow-500/20";
  }

  if (status === "Likely to be Rejected") {
    return "bg-red-500/15 text-red-300 border-red-500/20";
  }

  return "bg-white/10 text-zinc-300 border-white/10";
}

export default function ResumeSummaryCard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    resume,
    loading,
    uploading,
    status,
    error,
    uploadResume,
  } = useResumeAnalysis(user);

  if (loading) {
    return (
      <div className="h-[420px] rounded-3xl border border-white/10 bg-white/[0.03] animate-pulse" />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10">
        <div className="mb-8 flex items-start justify-between gap-5">
          <div>
            <h3 className="text-2xl font-semibold">
              Resume
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Your latest ATS snapshot.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-center">
            <p className="text-3xl font-bold text-cyan-300">
              {resume.atsScore || 0}
            </p>
            <p className="text-xs text-zinc-500">
              ATS Score
            </p>
          </div>
        </div>

        {!resume.uploaded ? (
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
              PDF
            </div>

            <h4 className="font-semibold">
              No Resume Uploaded
            </h4>

            <p className="mt-2 text-sm text-zinc-500">
              Upload a PDF resume to unlock ATS scoring and analysis.
            </p>

            <label className="mt-6 inline-flex cursor-pointer rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:scale-105">
              {uploading ? "Uploading..." : "Upload Resume"}
              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={uploadResume}
              />
            </label>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Resume Name
              </p>
              <h4 className="mt-2 break-words text-lg font-semibold">
                {resume.resumeName}
              </h4>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-zinc-500">
                  Resume Status
                </p>
                <span className={`mt-3 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${statusClasses(resume.verdict)}`}>
                  {resume.verdict || "Analysis Ready"}
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-zinc-500">
                  Last Uploaded
                </p>
                <p className="mt-3 font-semibold">
                  {formatDate(resume.uploadedAt)}
                </p>
              </div>
            </div>

            {error && (
              <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            {status && (
              <p className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
                {status}
              </p>
            )}

            <button
              onClick={() => navigate("/dashboard/resume")}
              className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-4 font-semibold text-white transition hover:scale-[1.02] active:scale-95"
            >
              View Full Resume Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
