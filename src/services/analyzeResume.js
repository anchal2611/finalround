export async function analyzeResume(
  resumeUrl
) {
  const response = await fetch(
    "/api/analyze-resume",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        resumeUrl,
      }),
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "Analysis failed."
    );
  }

  return data.analysis;
}