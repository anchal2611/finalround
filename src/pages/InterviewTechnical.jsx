import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardNavbar from "../components/dashboard/Navbar";

import InterviewHeader from "../components/interview/InterviewHeader";
import InterviewProgress from "../components/interview/ProgressBar";
import QuestionNavigator from "../components/interview/QuestionNavigator";
import QuestionCard from "../components/interview/QuestionCard";
import RecordingPanel from "../components/interview/RecordingPanel";
import TranscriptBox from "../components/interview/TranscriptBox";
import InterviewControls from "../components/interview/InterviewControls";
import SummaryModal from "../components/interview/SummaryModal";

import useRecorder from "../hooks/useRecorder";

import { analyzeConfidence } from "../services/confidence";
import { evaluateAnswer } from "../services/interview";

import { useInterview } from "../context/InterviewContext";

export default function InterviewTechnical() {

    const navigate = useNavigate();

    const recorder = useRecorder();

    const {

        session,

        currentQuestion,

        setCurrentQuestion,

        currentStage,

        transitionStage,

        responses,

        addResponse

    } = useInterview();

    const [showAnalysis, setShowAnalysis] = useState(false);

    const [analysisStep, setAnalysisStep] = useState(0);

    if (!session) {

        return null;

    }

    const questions = session.questions.technical;

    const progress = Math.round(

        ((currentQuestion + 1) / questions.length) * 100

    );

    const handleBack = () => {

        navigate("/interview/resume");

    };

    const handleNext = async () => {

        if (!recorder.audioBlob) return;

        try {

            setShowAnalysis(true);

            setAnalysisStep(0);

            const confidenceAnalysis =
                await analyzeConfidence(
                    recorder.audioBlob
                );

            setAnalysisStep(1);

            const evaluation =
                await evaluateAnswer({

                    question:
                        questions[currentQuestion].question,

                    transcript:
                        recorder.transcript,

                    stage:
                        currentStage,

                    confidenceAnalysis,

                    previousResponses:
                        responses

                });

            setAnalysisStep(2);

            addResponse({

                questionId:
                    questions[currentQuestion].id,

                stage:
                    currentStage,

                question:
                    questions[currentQuestion].question,

                transcript:
                    recorder.transcript,

                audioBlob:
                    recorder.audioBlob,

                evaluation:
                    evaluation.evaluation,

                answeredAt:
                    new Date().toISOString()

            });

            setAnalysisStep(3);

            setTimeout(() => {

                setShowAnalysis(false);

                recorder.resetRecorder();

                if (

                    currentQuestion ===
                    questions.length - 1

                ) {

                    transitionStage(
                        "hr",
                        "/interview/hr",
                        navigate
                    );

                }

                else {

                    setCurrentQuestion(
                        prev => prev + 1
                    );

                }

            }, 1200);

        }

        catch (error) {

            console.error(error);

            setShowAnalysis(false);

            alert(
                error.message ||
                "Unable to evaluate your answer. Please try again."
            );

        }

    };

        return (

        <div className="min-h-screen overflow-x-hidden bg-black text-white">

            <DashboardNavbar />

            <SummaryModal
                open={showAnalysis}
                currentStep={analysisStep}
            />

            <main className="mx-auto max-w-6xl px-6 pt-36 pb-20">

                <InterviewHeader
                    stage={2}
                    title="Technical Interview"
                    description="Demonstrate your technical knowledge by answering the following questions. Explain your thought process clearly, just like in a real technical interview."
                />

                <InterviewProgress
                    progress={progress}
                    stage={2}
                    currentQuestion={currentQuestion + 1}
                    totalQuestions={questions.length}
                />

                <QuestionNavigator
                    currentQuestion={currentQuestion + 1}
                    totalQuestions={questions.length}
                />

                <QuestionCard
                    currentQuestion={currentQuestion + 1}
                    totalQuestions={questions.length}
                    question={
                        questions[currentQuestion].question
                    }
                    estimatedTime={
                        questions[currentQuestion].time ||
                        "2-4 min"
                    }
                />

                <RecordingPanel
                    isRecording={recorder.isRecording}
                    timer={recorder.timer}
                    formatTime={recorder.formatTime}
                    startRecording={recorder.startRecording}
                    stopRecording={recorder.stopRecording}
                />

                <TranscriptBox
                    transcript={recorder.transcript}
                    audioURL={recorder.audioURL}
                />

                <InterviewControls
                    onBack={handleBack}
                    onNext={handleNext}
                    nextLabel={
                        currentQuestion ===
                        questions.length - 1

                            ? "Continue to HR"

                            : "Next Question"
                    }
                    disableNext={
                        !recorder.audioBlob ||
                        showAnalysis
                    }
                    isLastQuestion={
                        currentQuestion ===
                        questions.length - 1
                    }
                />

            </main>

        </div>

    );

}
