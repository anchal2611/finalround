import { motion } from "framer-motion";
import {
  Mic,
  Square,
  Radio,
  TimerReset,
} from "lucide-react";

export default function RecordingPanel({

  isRecording,

  timer,

  formatTime,

  startRecording,

  stopRecording,

}) {

  return (

    <motion.div

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}

      className="
        mt-8
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      "

    >

      {/* Top */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-2">

            <Radio

              size={16}

              className={`

                ${isRecording

                  ? "text-red-400"

                  : "text-zinc-500"

                }

              `}

            />

            <p className="text-zinc-400 text-sm">

              AI Interviewer

            </p>

          </div>

          <h3 className="mt-2 text-2xl font-semibold">

            {

              isRecording

                ?

                "Listening..."

                :

                "Ready to Record"

            }

          </h3>

        </div>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-black/30
            px-5
            py-3
          "
        >

          <TimerReset
            size={18}
            className="text-cyan-400"
          />

          <span className="font-medium">

            {formatTime(timer)}

          </span>

        </div>

      </div>

      {/* Mic */}

      <div className="flex justify-center mt-12">

        <button

          onClick={

            isRecording

              ?

              stopRecording

              :

              startRecording

          }

          className={`

            relative

            h-32

            w-32

            rounded-full

            flex

            items-center

            justify-center

            transition-all

            duration-300

            hover:scale-105

            ${

              isRecording

              ?

              "bg-red-500 shadow-[0_0_60px_rgba(239,68,68,.45)]"

              :

              "bg-gradient-to-br from-violet-500 to-cyan-500 shadow-[0_0_60px_rgba(139,92,246,.45)]"

            }

          `}

        >

          {

            isRecording

            ?

            <Square size={38}/>

            :

            <Mic size={42}/>

          }

          {

            isRecording && (

              <div

                className="

                  absolute

                  inset-0

                  rounded-full

                  border

                  border-red-400

                  animate-ping

                "

              />

            )

          }

        </button>

      </div>

      <p

        className="

          mt-8

          text-center

          text-zinc-400

        "

      >

        {

          isRecording

          ?

          "Recording in progress... Click to stop."

          :

          "Click the microphone to start recording."

        }

      </p>

    </motion.div>

  );

}