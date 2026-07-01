import { motion } from "framer-motion";
import {
  Flag,
  Circle,
  CheckCircle2,
} from "lucide-react";

export default function InterviewProgress({
  progress,
  stage,
  currentQuestion,
  totalQuestions,
}) {

  const stages = [1, 2, 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="
        mt-12
        rounded-[30px]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      "
    >

      {/* Top Row */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Flag
              size={18}
              className="text-violet-400"
            />

            <span className="text-zinc-400 font-medium">

              Interview Progress

            </span>

          </div>

          <h3 className="mt-3 text-3xl font-bold">

            {progress}% Completed

          </h3>

        </div>

        <div className="text-right">

          <p className="text-zinc-500">

            Current Question

          </p>

          <h4 className="mt-2 text-2xl font-semibold">

            {currentQuestion} / {totalQuestions}

          </h4>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="relative h-3 rounded-full bg-white/5 overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.8,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-violet-500
              via-fuchsia-500
              to-cyan-400
              shadow-[0_0_30px_rgba(139,92,246,.6)]
            "
          />

        </div>

      </div>

      {/* Stage Indicator */}

      <div className="mt-8 flex items-center justify-between">

        {stages.map((item) => {

          const completed = item < stage;

          const active = item === stage;

          return (

            <div
              key={item}
              className="flex flex-col items-center flex-1"
            >

              <div
                className={`
                  h-12
                  w-12
                  rounded-full
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300

                  ${
                    completed

                      ? "bg-green-500 text-white"

                      : active

                      ? "bg-violet-500 text-white shadow-[0_0_25px_rgba(139,92,246,.6)]"

                      : "bg-white/5 border border-white/10 text-zinc-500"
                  }
                `}
              >

                {completed ? (

                  <CheckCircle2 size={22} />

                ) : (

                  <Circle
                    size={18}
                    fill={active ? "white" : "transparent"}
                  />

                )}

              </div>

              <p
                className={`
                  mt-3
                  text-sm
                  font-medium

                  ${
                    active

                      ? "text-white"

                      : completed

                      ? "text-green-400"

                      : "text-zinc-500"
                  }
                `}
              >

                Stage {item}

              </p>

            </div>

          );

        })}

      </div>

    </motion.div>
  );

}