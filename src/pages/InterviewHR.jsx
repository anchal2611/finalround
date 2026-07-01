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

export default function InterviewHR() {

  const navigate = useNavigate();
  const recorder = useRecorder();

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const questions = [
    {
      id: 1,
      question: "Tell me about a time you worked in a team and handled a conflict.",
      time: "2-3 min",
    },
    {
      id: 2,
      question: "What are your biggest strengths and weaknesses?",
      time: "2-3 min",
    },
    {
      id: 3,
      question: "Describe a situation where you had to learn something quickly.",
      time: "3 min",
    },
    {
      id: 4,
      question: "Why do you want to join our company?",
      time: "2 min",
    },
    {
      id: 5,
      question: "Do you have any questions for the interviewer?",
      time: "2 min",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const stageProgress = 80;
  const questionProgress =
    ((currentQuestion + 1) / questions.length) * 20;

  const progress = Math.round(stageProgress + questionProgress);

  const handleBack = () => {
    navigate("/interview/technical");
  };

  const handleNext = () => {

    if (!recorder.audioBlob) return;

    if (recorder.isRecording) {
      recorder.stopRecording();
    }

    setShowAnalysis(true);
    setAnalysisStep(0);

    setTimeout(() => setAnalysisStep(1), 700);
    setTimeout(() => setAnalysisStep(2), 1500);
    setTimeout(() => setAnalysisStep(3), 2300);

    setTimeout(() => {

      setShowAnalysis(false);

      if (currentQuestion < questions.length - 1) {

        recorder.resetRecorder();

        setCurrentQuestion(prev => prev + 1);

      } else {

        recorder.resetRecorder();

        navigate("/interview/summary");

      }

    }, 3200);

  };

  return (

    <div className="min-h-screen bg-black text-white">

      <DashboardNavbar />

      <SummaryModal
        open={showAnalysis}
        currentStep={analysisStep}
      />

      <main className="mx-auto max-w-6xl px-6 pt-36 pb-20">

        <InterviewHeader
          stage={3}
          title="HR & Behavioral Interview"
          description="This final round evaluates your communication, teamwork, leadership, adaptability and cultural fit. Answer honestly and confidently."
        />

        <InterviewProgress
          progress={progress}
          stage={3}
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
              ? "Finish Interview"
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