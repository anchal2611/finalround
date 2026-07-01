import { useCallback, useEffect, useState } from "react";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import { analyzeResume } from "../services/analyzeResume";
import { uploadResume as uploadResumeToStorage } from "../services/uploadResume";

const defaultResume = {
  score: 0,
  atsScore: 0,
  uploaded: false,
  resumeUrl: "",
  resumeKey: "",
  resumeName: "",
  uploadedAt: null,
  lastUpdatedAt: null,
  strengths: [],
  improvements: [],
  summary: "",
  verdict: "",
  missingKeywords: [],
  matchedKeywords: [],
  criticalFixes: [],
  categoryScores: [],
};

function normalizeDate(value) {
  if (!value) return null;

  if (typeof value.toDate === "function") {
    return value.toDate();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function inferResumeName(data) {
  if (data.resumeName) return data.resumeName;

  const source = data.resumeKey || data.resumeUrl || "";
  const fileName = decodeURIComponent(source.split("/").pop() || "");
  return fileName.replace(/^\d+-/, "") || "Uploaded Resume";
}

function normalizeResume(data = {}) {
  return {
    score: data.resumeScore || 0,
    atsScore: data.atsScore || 0,
    uploaded: data.resumeUploaded || false,
    resumeUrl: data.resumeUrl || "",
    resumeKey: data.resumeKey || "",
    resumeName: inferResumeName(data),
    uploadedAt: normalizeDate(data.uploadedAt),
    lastUpdatedAt: normalizeDate(data.lastUpdatedAt || data.uploadedAt),
    strengths: data.strengths || [],
    improvements: data.improvements || [],
    summary: data.summary || "",
    verdict: data.verdict || "",
    missingKeywords: data.missingKeywords || [],
    matchedKeywords: data.matchedKeywords || data.keywords || [],
    criticalFixes: data.criticalFixes || [],
    categoryScores: data.categoryScores || [],
  };
}

export function useResumeAnalysis(user) {
  const [resume, setResume] = useState(defaultResume);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const refreshResume = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError("");

      const snap = await getDoc(
        doc(db, "users", user.uid)
      );

      setResume(
        snap.exists()
          ? normalizeResume(snap.data())
          : defaultResume
      );
    } catch (err) {
      console.error(err);
      setError("Unable to load resume analysis.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      refreshResume();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [refreshResume]);

  const uploadResume = async (event) => {
    try {
      const file = event.target.files?.[0];

      if (!file || !user) return;

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
      setError("");
      setStatus("Uploading Resume...");

      const { url, key } = await uploadResumeToStorage(file);

      setStatus("Analyzing Resume with AI...");

      const analysis = await analyzeResume(url);

      if (!analysis || typeof analysis !== "object") {
        throw new Error("AI analysis failed.");
      }

      setStatus("Saving Results...");

      const now = new Date();
      const nextData = {
        resumeUploaded: true,
        resumeUrl: url,
        resumeKey: key,
        resumeName: file.name,
        uploadedAt: now,
        lastUpdatedAt: now,
        resumeScore: analysis.resumeScore ?? 0,
        atsScore: analysis.atsScore ?? 0,
        strengths: analysis.strengths ?? [],
        improvements: analysis.improvements ?? [],
        summary: analysis.summary ?? "",
        verdict: analysis.verdict ?? "",
        missingKeywords: analysis.missingKeywords ?? [],
        matchedKeywords: analysis.matchedKeywords ?? [],
        criticalFixes: analysis.criticalFixes ?? [],
        categoryScores: analysis.categoryScores ?? [],
      };

      await updateDoc(
        doc(db, "users", user.uid),
        nextData
      );

      setResume(normalizeResume(nextData));
      setStatus("");

      alert("Resume analyzed successfully!");
    } catch (err) {
      console.error(err);
      setStatus("");
      setError(err.message || "Resume upload failed.");
      alert(err.message || "Resume upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const getOriginalResumeUrl = async () => {
    const key = resume.resumeKey || resume.resumeUrl;

    if (!key) {
      throw new Error("No resume file found.");
    }

    const response = await fetch(
      `/api/get-resume-url?key=${encodeURIComponent(key)}`
    );

    const signed = await response.json();

    if (!signed.success) {
      throw new Error(signed.error || "Unable to open resume.");
    }

    return signed.url;
  };

  return {
    resume,
    loading,
    uploading,
    status,
    error,
    uploadResume,
    refreshResume,
    getOriginalResumeUrl,
  };
}
