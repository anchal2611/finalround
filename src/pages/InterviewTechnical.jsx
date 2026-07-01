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

export default function InterviewTechnical() {

  const navigate = useNavigate();
  const recorder = useRecorder();

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const questions = [
    {
      id: 1,
      question: "Explain your most technically challenging project.",
      time: "3-4 min",
    },
    {
      id: 2,
      question: "Describe a difficult bug you solved and how you approached it.",
      time: "3 min",
    },
    {
      id: 3,
      question: "Why did you choose your project's tech stack?",
      time: "2-3 min",
    },
    {
      id: 4,
      question: "If you rebuilt your project today, what would you improve?",
      time: "3 min",
    },
    {
      id: 5,
      question: "Explain one AWS service or technology you are comfortable with.",
      time: "2 min",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const stageProgress = 40;
  const questionProgress =
    ((currentQuestion + 1) / questions.length) * 20;

  const progress = Math.round(stageProgress + questionProgress);

  const handleBack = () => {
    navigate("/interview/resume");
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

        navigate("/interview/hr");

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
          stage={2}
          title="Technical Interview"
          description="This round evaluates your technical knowledge, problem-solving ability and implementation skills. Explain your thought process clearly."
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
              ? "Continue to HR Round"
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