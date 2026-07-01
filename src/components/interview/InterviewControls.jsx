import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function InterviewControls({
  onBack,
  onNext,
  nextLabel = "Next Question",
  disableNext = false,
  isLastQuestion = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-10 flex items-center justify-between"
    >
      <button
        onClick={onBack}
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-6
          py-3
          text-zinc-300
          transition
          hover:bg-white/10
        "
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className={`
          flex
          items-center
          gap-2
          rounded-2xl
          px-8
          py-3
          font-semibold
          transition-all
          duration-300

          ${
            disableNext
              ? "cursor-not-allowed bg-zinc-800 text-zinc-500"
              : "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-[0_0_25px_rgba(139,92,246,.35)] hover:scale-[1.02]"
          }
        `}
      >
        {isLastQuestion ? (
          <>
            <CheckCircle2 size={18} />
            {nextLabel}
          </>
        ) : (
          <>
            {nextLabel}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </motion.div>
  );
}