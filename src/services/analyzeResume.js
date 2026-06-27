export async function analyzeResume(
  resumeUrl
) {
  try {
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
          "Failed to analyze resume."
      );
    }

    if (!data.success) {
      throw new Error(
        data.error ||
          "Resume analysis failed."
      );
    }

    return data.analysis;
  } catch (error) {
    console.error(
      "Analyze Resume Error:",
      error
    );

    throw error;
  }
}