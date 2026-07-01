const CONFIDENCE_API = import.meta.env.VITE_CONFIDENCE_API;

export async function analyzeConfidence(audioBlob) {
  try {
    const formData = new FormData();

    formData.append(
      "file",
      audioBlob,
      "interview.webm"
    );

    const response = await fetch(CONFIDENCE_API, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Confidence analysis failed.");
    }

    return await response.json();

  } catch (error) {
    console.error("Confidence API Error:", error);
    throw error;
  }
}