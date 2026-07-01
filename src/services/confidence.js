const CONFIDENCE_API = import.meta.env.VITE_CONFIDENCE_API;

const FALLBACK_CONFIDENCE = {
  confidenceScore: 70,
  pace: "Not analyzed",
  tone: "Not analyzed",
  clarity: "Not analyzed",
  pauses: "Not analyzed",
  source: "fallback",
};

export async function analyzeConfidence(audioBlob) {
  try {
    if (!CONFIDENCE_API) {
      return FALLBACK_CONFIDENCE;
    }

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
    return FALLBACK_CONFIDENCE;
  }
}
