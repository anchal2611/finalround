const INTERVIEW_API = import.meta.env.VITE_INTERVIEW_API;

export async function startInterview({
    uid,
    role,
    experience,
    difficulty
}) {
    try {

        const response = await fetch(
            INTERVIEW_API,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uid,
                    role,
                    experience,
                    difficulty
                })
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
            "Interview API Error:",
            error
        );

        throw error;
    }
}