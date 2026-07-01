import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  CircleDot,
} from "lucide-react";

export default function QuestionNavigator({
  currentQuestion,
  totalQuestions,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        mt-8
        rounded-[30px]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold">
            Interview Overview
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Complete each question to unlock the next one.
          </p>

        </div>

        <span className="rounded-xl bg-violet-500/15 px-4 py-2 text-sm font-medium text-violet-300">
          {currentQuestion} / {totalQuestions}
        </span>

      </div>

      <div className="mt-8 flex items-center justify-between">

        {Array.from({ length: totalQuestions }).map((_, index) => {

          const number = index + 1;

          const completed = number < currentQuestion;

          const active = number === currentQuestion;

          return (

            <div
              key={number}
              className="flex flex-1 items-center"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    transition-all

                    ${
                      completed
                        ? "bg-green-500 text-white"
                        : active
                        ? "bg-violet-500 text-white shadow-[0_0_25px_rgba(139,92,246,.45)]"
                        : "border border-white/10 bg-white/5 text-zinc-500"
                    }
                  `}
                >

                  {completed ? (
                    <CheckCircle2 size={20} />
                  ) : active ? (
                    <CircleDot size={20} />
                  ) : (
                    <Circle size={20} />
                  )}

                </div>

                <span
                  className={`
                    mt-3
                    text-xs
                    font-medium

                    ${
                      completed
                        ? "text-green-400"
                        : active
                        ? "text-violet-300"
                        : "text-zinc-500"
                    }
                  `}
                >

                  Q{number}

                </span>

              </div>

              {number !== totalQuestions && (

                <div
                  className={`
                    mx-3
                    h-[2px]
                    flex-1

                    ${
                      completed
                        ? "bg-green-500"
                        : "bg-white/10"
                    }
                  `}
                />

              )}

            </div>

          );

        })}

      </div>

    </motion.div>
  );
}