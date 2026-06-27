export async function analyzeResume(resumeUrl) {
  const response = await fetch("/api/analyze-resume", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      resumeUrl,
    }),
  });

  // Read as text first
  const text = await response.text();

  try {
    const data = JSON.parse(text);

    if (!response.ok || !data.success) {
      throw new Error(
        data.error || "Analysis failed."
      );
    }

    return data.analysis;
  } catch {
    console.error("API returned:", text);

    throw new Error(text);
  }
}