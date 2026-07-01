import { motion } from "framer-motion";
import { FileText, Volume2 } from "lucide-react";

export default function TranscriptBox({
  transcript,
  audioURL,
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-violet-500/15
          ">
            <FileText
              size={22}
              className="text-violet-400"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Live Transcript
            </h3>
            <p className="text-sm text-zinc-500">
              Your answer appears here in real time.
            </p>
          </div>
        </div>

        {audioURL && (
          <div className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-white/10
            bg-white/5
            px-4
            py-2
          ">
            <Volume2
              size={16}
              className="text-cyan-400"
            />
            <span className="text-sm text-zinc-300">
              Recording Ready
            </span>
          </div>
        )}
      </div>

      <div
        className="
          mt-6
          min-h-[180px]
          rounded-3xl
          border
          border-dashed
          border-white/10
          bg-black/30
          p-6
        "
      >
        <p className={`
          leading-8
          whitespace-pre-wrap
          ${transcript
            ? "text-white"
            : "text-zinc-500"}
        `}>
          {transcript ||
            "Start speaking and your transcript will appear here..."}
        </p>
      </div>

      {audioURL && (
        <div className="mt-6">
          <audio
            controls
            src={audioURL}
            className="w-full"
          />
        </div>
      )}
    </motion.div>
  );
}