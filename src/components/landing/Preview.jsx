import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMicrophone,
  FaChartLine,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";

const interviewData = [
  {
    question:
      "Tell me about yourself and why you're interested in this role.",
    confidence: 87,
    communication: 91,
    technical: 84,
    feedback: [
      "Strong introduction",
      "Clear communication",
      "Could quantify achievements more",
    ],
  },
  {
    question:
      "Describe a challenging situation and how you handled it.",
    confidence: 92,
    communication: 86,
    technical: 81,
    feedback: [
      "Excellent problem-solving approach",
      "Good storytelling",
      "Add more measurable impact",
    ],
  },
  {
    question:
      "Why should we hire you over other candidates?",
    confidence: 85,
    communication: 89,
    technical: 90,
    feedback: [
      "Strong value proposition",
      "Good confidence level",
      "Mention unique strengths",
    ],
  },
];

function ProgressBar({ value, color }) {
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8 }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );
}

export default function Preview() {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const current = interviewData[activeQuestion];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-[140px]" />
      <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-zinc-400">
            Live Product Preview
          </span>

          <h2 className="mt-8 text-4xl md:text-6xl font-bold">
            Experience
            <br />
            <span className="text-zinc-400">
              FinalRound In Action
            </span>
          </h2>

          <p className="mt-6 text-zinc-500 max-w-2xl mx-auto">
            Simulate real interviews, receive AI-generated
            feedback, and improve your performance instantly.
          </p>
        </div>

        {/* Question Switcher */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {interviewData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveQuestion(index)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                activeQuestion === index
                  ? "bg-white text-black border-white"
                  : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              Question {index + 1}
            </button>
          ))}
        </div>

        {/* Main Preview */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Interview Panel */}
          <motion.div
            key={activeQuestion}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-8
            "
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                <FaMicrophone />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Interview Session
                </h3>
                <p className="text-zinc-500 text-sm">
                  AI Interviewer
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-6">
              <p className="text-zinc-400 text-sm mb-3">
                Interview Question
              </p>

              <h4 className="text-xl font-medium leading-relaxed">
                {current.question}
              </h4>
            </div>

            <div className="mt-6 rounded-2xl bg-black/30 border border-white/10 p-6">
              <p className="text-zinc-400 text-sm mb-3">
                Candidate Response
              </p>

              <p className="text-zinc-300 leading-relaxed">
                I am a passionate software developer with
                experience in web technologies and problem
                solving. I enjoy building impactful products
                and continuously learning new skills.
              </p>
            </div>
          </motion.div>

          {/* Feedback Panel */}
          <motion.div
            key={`feedback-${activeQuestion}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="
              rounded-3xl
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              p-8
            "
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <FaBrain />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  AI Feedback
                </h3>
                <p className="text-zinc-500 text-sm">
                  Performance Analysis
                </p>
              </div>
            </div>

            {/* Scores */}
            <div className="space-y-6">

              <div>
                <div className="flex justify-between mb-2">
                  <span>Confidence</span>
                  <span>{current.confidence}%</span>
                </div>

                <ProgressBar
                  value={current.confidence}
                  color="bg-violet-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Communication</span>
                  <span>{current.communication}%</span>
                </div>

                <ProgressBar
                  value={current.communication}
                  color="bg-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Technical Depth</span>
                  <span>{current.technical}%</span>
                </div>

                <ProgressBar
                  value={current.technical}
                  color="bg-emerald-500"
                />
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="text-green-400" />
                <h4 className="font-semibold">
                  Recommendations
                </h4>
              </div>

              <div className="space-y-3">
                {current.feedback.map((item, idx) => (
                  <div
                    key={idx}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-white/10
                      bg-white/5
                      p-3
                    "
                  >
                    <FaCheckCircle className="text-green-400" />
                    <span className="text-zinc-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}