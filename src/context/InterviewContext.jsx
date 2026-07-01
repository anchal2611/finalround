import {
    createContext,
    useContext,
    useState
} from "react";
import { flushSync } from "react-dom";

const InterviewContext = createContext();

export function InterviewProvider({ children }) {

    const [session, setSession] = useState(null);

    const [currentStage, setCurrentStage] = useState("resume");

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [responses, setResponses] = useState([]);

    const [overallResult, setOverallResult] = useState(null);

    const addResponse = (response) => {

        setResponses(prev => [

            ...prev,

            response

        ]);

    };

    const updateResponse = (

        questionId,

        updates

    ) => {

        setResponses(prev =>

            prev.map(item =>

                item.questionId === questionId

                    ? {

                        ...item,

                        ...updates

                    }

                    : item

            )

        );

    };

    const getResponse = (questionId) => {

        return responses.find(

            item => item.questionId === questionId

        );

    };

    const nextQuestion = () => {

        setCurrentQuestion(prev => prev + 1);

    };

    const previousQuestion = () => {

        setCurrentQuestion(prev =>

            Math.max(0, prev - 1)

        );

    };

    const resetInterview = () => {

        setSession(null);

        setCurrentStage("resume");

        setCurrentQuestion(0);

        setResponses([]);

        setOverallResult(null);

    };

    const startInterviewSession = (newSession) => {

        flushSync(() => {

            setSession(newSession);

            setCurrentStage("resume");

            setCurrentQuestion(0);

            setResponses([]);

            setOverallResult(null);

        });

    };

    const transitionStage = (

        nextStage,

        nextPath,

        navigate

    ) => {

        flushSync(() => {

            setCurrentStage(nextStage);

            setCurrentQuestion(0);

        });

        navigate(nextPath);

    };

    const value = {

        session,

        setSession,

        currentStage,

        setCurrentStage,

        currentQuestion,

        setCurrentQuestion,

        nextQuestion,

        previousQuestion,

        responses,

        addResponse,

        updateResponse,

        getResponse,

        overallResult,

        setOverallResult,

        resetInterview,

        startInterviewSession,

        transitionStage

    };

    return (

        <InterviewContext.Provider value={value}>

            {children}

        </InterviewContext.Provider>

    );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useInterview() {

    const context = useContext(InterviewContext);

    if (!context) {

        throw new Error(

            "useInterview must be used within InterviewProvider."

        );

    }

    return context;

}
