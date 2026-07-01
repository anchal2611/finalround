const START_INTERVIEW_API = import.meta.env.VITE_INTERVIEW_API;
const EVALUATE_INTERVIEW_API = import.meta.env.VITE_EVALUATE_API;

export async function startInterview({
  uid,
  role,
  experience,
  difficulty,
}) {
  try {
    const response = await fetch(
      START_INTERVIEW_API,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          role,
          experience,
          difficulty,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to generate interview."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Start Interview Error:",
      error
    );

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
    const response = await fetch(
      EVALUATE_INTERVIEW_API,
      {
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
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to evaluate answer."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Evaluate Answer Error:",
      error
    );

    throw error;
  }
}