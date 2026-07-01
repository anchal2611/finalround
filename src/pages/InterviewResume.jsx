import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashCursor from "../components/SplashCursor";
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

export default function InterviewResume() {

  const navigate = useNavigate();

  const recorder = useRecorder();

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const questions = [
    {
      id: 1,
      question: "Tell me about yourself.",
      time: "2-3 min",
    },
    {
      id: 2,
      question: "Walk me through your resume.",
      time: "2-3 min",
    },
    {
      id: 3,
      question: "Which project are you most proud of and why?",
      time: "3-4 min",
    },
    {
      id: 4,
      question: "What challenges did you face while building your projects?",
      time: "3 min",
    },
    {
      id: 5,
      question: "What are your future career goals?",
      time: "2 min",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const progress = Math.round(
    ((currentQuestion + 1) / questions.length) * 100
  );

  const handleBack = () => {

    navigate("/interview/setup");

  };

  const handleNext = async () => {

    if (!recorder.audioBlob) return;

    setShowAnalysis(true);

    setAnalysisStep(0);

    setTimeout(() => setAnalysisStep(1), 800);

    setTimeout(() => setAnalysisStep(2), 1700);

    setTimeout(() => setAnalysisStep(3), 2600);

    setTimeout(() => {

      setShowAnalysis(false);

      if (currentQuestion < questions.length - 1) {

        setCurrentQuestion((prev) => prev + 1);

      } else {

        navigate("/interview/technical");

      }

    }, 3600);

  };

  return (

    <div className="min-h-screen overflow-x-hidden bg-black text-white">

      <SplashCursor
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={2.2}
        PRESSURE={0.08}
        CURL={2}
        SPLAT_RADIUS={0.12}
        SPLAT_FORCE={3500}
        COLOR_UPDATE_SPEED={8}
        SHADING
        RAINBOW_MODE
        COLOR="#8B5CF6"
      />

      <DashboardNavbar />

      <SummaryModal
        open={showAnalysis}
        currentStep={analysisStep}
      />

      <main className="mx-auto max-w-6xl px-6 pt-36 pb-20">

        <InterviewHeader
          stage={1}
          title="Resume Discussion"
          description="Let's begin by understanding your background, projects and experience. Answer naturally as if you're talking to a real interviewer."
        />

        <InterviewProgress
          progress={progress}
          stage={1}
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
          question={questions[currentQuestion].question}
          estimatedTime={questions[currentQuestion].time}
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
            currentQuestion === questions.length - 1
              ? "Continue to Technical"
              : "Next Question"
          }
          disableNext={!recorder.audioBlob}
          isLastQuestion={
            currentQuestion === questions.length - 1
          }
        />

      </main>

    </div>

  );

}