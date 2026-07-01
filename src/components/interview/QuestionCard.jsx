import { motion } from "framer-motion";
import {
  Bot,
  MessageSquareQuote,
  Clock3,
} from "lucide-react";

export default function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  estimatedTime = "2-3 min",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="
        relative
        mt-10
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-10
      "
    >

      {/* Background Glow */}

      <div
        className="
          absolute
          -right-28
          -top-28
          h-72
          w-72
          rounded-full
          bg-violet-500/10
          blur-[120px]
        "
      />

      <div className="relative z-10">

        {/* Top */}

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  px-4
                  py-2
                "
              >

                <Bot
                  size={16}
                  className="text-violet-400"
                />

                <span className="text-sm font-medium text-violet-300">

                  AI Interviewer

                </span>

              </div>

            </div>

            <p className="mt-5 text-sm text-zinc-500">

              Question {currentQuestion} of {totalQuestions}

            </p>

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
            "
          >

            <Clock3
              size={18}
              className="text-cyan-400"
            />

            <div>

              <p className="text-xs text-zinc-500">

                Expected Time

              </p>

              <p className="text-sm font-semibold">

                {estimatedTime}

              </p>

            </div>

          </div>

        </div>

        {/* Question */}

        <div
          className="
            mt-8
            rounded-3xl
            border
            border-white/10
            bg-black/20
            p-8
          "
        >

          <div className="flex items-start gap-5">

            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-500
                to-cyan-500
                shadow-[0_0_35px_rgba(139,92,246,.45)]
              "
            >

              <MessageSquareQuote
                size={26}
                className="text-white"
              />

            </div>

            <div>

              <p className="text-sm uppercase tracking-widest text-zinc-500">

                Interview Question

              </p>

              <h2 className="mt-3 text-3xl font-bold leading-relaxed">

                {question}

              </h2>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}