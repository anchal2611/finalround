import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Upload,
} from "lucide-react";

import DashboardNavbar from "../components/dashboard/Navbar";
import { useAuth } from "../context/AuthContext";
import { useResumeAnalysis } from "../hooks/useResumeAnalysis";

const requestedCategories = [
  "Formatting",
  "Content",
  "Skills",
  "Keywords",
  "Projects",
  "Education",
  "Experience",
];

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
    return "border-green-500/20 bg-green-500/15 text-green-300";
  }

  if (status === "Borderline") {
    return "border-yellow-500/20 bg-yellow-500/15 text-yellow-300";
  }

  if (status === "Likely to be Rejected") {
    return "border-red-500/20 bg-red-500/15 text-red-300";
  }

  return "border-white/10 bg-white/10 text-zinc-300";
}

function scoreTheme(score = 0) {
  if (score >= 80) {
    return {
      border: "border-green-500/25",
      bg: "bg-green-500/10",
      text: "text-green-300",
      bar: "from-green-500 to-emerald-300",
    };
  }

  if (score >= 60) {
    return {
      border: "border-yellow-500/25",
      bg: "bg-yellow-500/10",
      text: "text-yellow-300",
      bar: "from-yellow-500 to-amber-300",
    };
  }

  return {
    border: "border-red-500/25",
    bg: "bg-red-500/10",
    text: "text-red-300",
    bar: "from-red-500 to-rose-300",
  };
}

function normalizeCategoryName(category) {
  if (category === "Keyword Relevance") return "Keywords";
  return category;
}

function buildCategoryScores(categoryScores = []) {
  return requestedCategories.map((name) => {
    const match = categoryScores.find(
      (item) => normalizeCategoryName(item.category) === name
    );

    return {
      category: name,
      score: match?.score ?? 0,
      max: match?.max ?? 100,
    };
  });
}

function scorePercent(item) {
  if (!item.max) return 0;
  return Math.min(100, Math.round((item.score / item.max) * 100));
}

function InfoTile({ label, value, accent }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <p className="text-sm text-zinc-500">
        {label}
      </p>
      <p className={`mt-3 break-words text-xl font-semibold ${accent || "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function ListCard({ title, items, emptyText, tone }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <div className="mt-6 space-y-3">
        {items?.length ? (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-zinc-300"
            >
              <span className={tone}>
                {index + 1}.
              </span>{" "}
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500">
            {emptyText}
          </p>
        )}
      </div>
    </div>
  );
}

function KeywordPill({ children, variant }) {
  const classes =
    variant === "missing"
      ? "border-red-500/20 bg-red-500/10 text-red-200"
      : "border-cyan-500/20 bg-cyan-500/10 text-cyan-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-sm ${classes}`}>
      {children}
    </span>
  );
}

export default function ResumeAnalytics() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openingResume, setOpeningResume] = useState(false);

  const {
    resume,
    loading,
    uploading,
    status,
    error,
    uploadResume,
    getOriginalResumeUrl,
  } = useResumeAnalysis(user);

  const categories = buildCategoryScores(resume.categoryScores);
  const atsTheme = scoreTheme(resume.atsScore);

  const handleViewOriginal = async () => {
    try {
      setOpeningResume(true);
      const url = await getOriginalResumeUrl();
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      alert(err.message || "Unable to open resume.");
    } finally {
      setOpeningResume(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardNavbar />
        <main className="mx-auto max-w-7xl px-6 pt-36 pb-20">
          <div className="h-[520px] rounded-3xl border border-white/10 bg-white/[0.03] animate-pulse" />
        </main>
      </div>
    );
  }

  if (!resume.uploaded) {
    return (
      <div className="min-h-screen bg-black text-white">
        <DashboardNavbar />
        <main className="mx-auto max-w-3xl px-6 pt-36 pb-20">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
          >
            <ArrowLeft size={17} />
            Dashboard
          </button>

          <div className="rounded-3xl border border-dashed border-white/20 bg-white/[0.04] p-10 text-center backdrop-blur-xl">
            <h1 className="text-4xl font-bold">
              No Resume Uploaded
            </h1>
            <p className="mt-4 text-zinc-400">
              Upload a PDF resume to generate your ATS score and AI feedback.
            </p>

            <label className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-105">
              <Upload size={18} />
              {uploading ? "Uploading..." : "Upload Resume"}
              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={uploadResume}
              />
            </label>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-6 pt-36 pb-20">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
        >
          <ArrowLeft size={17} />
          Dashboard
        </button>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium text-cyan-300">
                Resume Overview
              </p>
              <h1 className="mt-3 break-all text-3xl font-bold leading-tight md:text-5xl">
                {resume.resumeName}
              </h1>
              <p className="mt-4 max-w-3xl leading-7 text-zinc-400">
                {resume.summary || "Your resume analysis is ready."}
              </p>
            </div>

            <div className={`rounded-3xl border p-7 text-center ${atsTheme.border} ${atsTheme.bg}`}>
              <p className={`text-6xl font-bold ${atsTheme.text}`}>
                {resume.atsScore || 0}
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                ATS Score
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          <InfoTile label="Upload Date" value={formatDate(resume.uploadedAt)} />
          <InfoTile
            label="Resume Status"
            value={resume.verdict || "Analysis Ready"}
            accent={statusClasses(resume.verdict).includes("green")
              ? "text-green-300"
              : statusClasses(resume.verdict).includes("yellow")
                ? "text-yellow-300"
                : statusClasses(resume.verdict).includes("red")
                  ? "text-red-300"
                  : "text-zinc-300"}
          />
          <InfoTile label="Last Updated" value={formatDate(resume.lastUpdatedAt)} />
          <InfoTile label="Resume Score" value={`${resume.score || 0}/100`} />
          <div className={`rounded-3xl border p-6 ${statusClasses(resume.verdict)}`}>
            <p className="text-sm opacity-80">
              Current Status
            </p>
            <p className="mt-3 text-xl font-semibold">
              {resume.verdict || "Analysis Ready"}
            </p>
          </div>
        </section>

        {(error || status) && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-zinc-300">
            {error || status}
          </div>
        )}

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Overall ATS Score
              </h2>
              <p className="mt-2 text-zinc-400">
                Category-wise breakdown of the resume analysis.
              </p>
            </div>
            <p className={`text-4xl font-bold ${atsTheme.text}`}>
              {resume.atsScore || 0}/100
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {categories.map((item) => {
              const percent = scorePercent(item);
              const theme = scoreTheme(percent);

              return (
                <div
                  key={item.category}
                  className={`rounded-2xl border bg-white/5 p-5 ${theme.border}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium">
                      {item.category}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {item.score}/{item.max}
                    </span>
                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${theme.bar}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <ListCard
            title="Strengths"
            items={resume.strengths}
            emptyText="No strengths available yet."
            tone="text-green-300"
          />
          <ListCard
            title="Weaknesses"
            items={resume.improvements}
            emptyText="No weaknesses available yet."
            tone="text-yellow-300"
          />
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold">
            AI Resume Feedback
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-9 text-zinc-300">
            {resume.summary || "AI feedback will appear here after analysis."}
          </p>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold">
              Matched Keywords
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {resume.matchedKeywords?.length ? (
                resume.matchedKeywords.map((keyword) => (
                  <KeywordPill key={keyword}>
                    {keyword}
                  </KeywordPill>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  Matched keyword data is not available for this analysis.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold">
              Missing Keywords
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {resume.missingKeywords?.length ? (
                resume.missingKeywords.map((keyword) => (
                  <KeywordPill key={keyword} variant="missing">
                    {keyword}
                  </KeywordPill>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  No missing keywords were returned.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <ListCard
            title="Improvement Suggestions"
            items={resume.criticalFixes?.length ? resume.criticalFixes : resume.improvements}
            emptyText="No improvement suggestions available yet."
            tone="text-cyan-300"
          />
        </section>

        <section className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={handleViewOriginal}
            disabled={openingResume}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ExternalLink size={18} />
            {openingResume ? "Opening..." : "View Original Resume"}
          </button>

          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-4 font-semibold text-white transition hover:scale-[1.02] active:scale-95">
            <Upload size={18} />
            {uploading ? "Uploading..." : "Upload New Resume"}
            <input
              hidden
              type="file"
              accept=".pdf"
              onChange={uploadResume}
            />
          </label>
        </section>
      </main>
    </div>
  );
}
