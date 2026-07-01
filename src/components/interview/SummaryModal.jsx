import { motion, AnimatePresence } from "framer-motion";
import {
  LoaderCircle,
  BrainCircuit,
  Mic,
  FileSearch,
  CheckCircle2,
} from "lucide-react";

export default function SummaryModal({
  open,
  currentStep = 1,
}) {

  if (!open) return null;

  const steps = [

    {
      icon: Mic,
      title: "Analyzing Voice",
    },

    {
      icon: FileSearch,
      title: "Processing Transcript",
    },

    {
      icon: BrainCircuit,
      title: "Generating AI Feedback",
    },

    {
      icon: CheckCircle2,
      title: "Preparing Results",
    },

  ];

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}

        animate={{ opacity: 1 }}

        exit={{ opacity: 0 }}

        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          backdrop-blur-md
        "

      >

        <motion.div

          initial={{ scale: .95, opacity: 0 }}

          animate={{ scale: 1, opacity: 1 }}

          exit={{ scale: .95, opacity: 0 }}

          className="
            w-full
            max-w-lg
            rounded-[36px]
            border
            border-white/10
            bg-[#111111]
            p-10
          "

        >

          <div className="flex justify-center">

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-violet-500/15
              "
            >

              <LoaderCircle
                size={42}
                className="
                  animate-spin
                  text-violet-400
                "
              />

            </div>

          </div>

          <h2 className="mt-8 text-center text-3xl font-bold">

            Analyzing Your Response

          </h2>

          <p className="mt-3 text-center text-zinc-400">

            Please wait while FinalRound evaluates your answer.

          </p>

          <div className="mt-10 space-y-5">

            {steps.map((step, index) => {

              const Icon = step.icon;

              const completed = index < currentStep;

              const active = index === currentStep;

              return (

                <div
                  key={step.title}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                  "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-violet-500/10
                      "
                    >

                      <Icon
                        size={22}
                        className="text-violet-400"
                      />

                    </div>

                    <span className="font-medium">

                      {step.title}

                    </span>

                  </div>

                  {

                    completed ? (

                      <CheckCircle2
                        className="text-green-400"
                      />

                    ) : active ? (

                      <LoaderCircle
                        className="
                          animate-spin
                          text-violet-400
                        "
                      />

                    ) : (

                      <div
                        className="
                          h-4
                          w-4
                          rounded-full
                          bg-zinc-700
                        "
                      />

                    )

                  }

                </div>

              );

            })}

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

}