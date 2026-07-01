const START_INTERVIEW_API =
  import.meta.env.VITE_INTERVIEW_API || "/api/interview/start";

const EVALUATE_INTERVIEW_API =
  import.meta.env.VITE_EVALUATE_API || "/api/interview/evaluate";

export async function startInterview({
  role,
  experience,
  difficulty,
  resumeSummary = "",
}) {
  try {
    const response = await fetch(START_INTERVIEW_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
        experience,
        difficulty,
        resumeSummary,
      }),
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text);
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to start interview."
      );
    }

    return data;
  } catch (error) {
    console.error("Start Interview Error:", error);
    throw error;
  }
}

export async function evaluateAnswer({
  question,
  transcript,
  stage,
  confidenceAnalysis,
  previousResponses = [],
}) {
  try {
    if (!transcript?.trim()) {
      throw new Error(
        "No transcript was captured. Please record your answer again."
      );
    }

    const response = await fetch(EVALUATE_INTERVIEW_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        transcript,
        stage,
        confidenceAnalysis,
        previousResponses,
      }),
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(text);
    }

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to evaluate answer."
      );
    }

    return data;
  } catch (error) {
    console.error("Evaluate Answer Error:", error);
    throw error;
  }
}
