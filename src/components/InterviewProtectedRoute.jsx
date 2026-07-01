import { Navigate } from "react-router-dom";
import { useInterview } from "../context/InterviewContext";

export default function InterviewProtectedRoute({
    children,
    requiredStage
}) {

    const { session, currentStage } = useInterview();

    if (!session) {
        return (
            <Navigate
                to="/interview/setup"
                replace
            />
        );
    }

    if (
        requiredStage &&
        currentStage !== requiredStage
    ) {
        return (
            <Navigate
                to="/interview/setup"
                replace
            />
        );
    }

    return children;

}