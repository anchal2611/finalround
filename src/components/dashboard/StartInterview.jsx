import { motion } from "framer-motion";
import {
  FaMicrophone,
  FaArrowRight,
  FaBolt,
} from "react-icons/fa";

export default function StartInterview() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8 md:p-10
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -top-32
          -right-32
          w-96
          h-96
          rounded-full
          bg-violet-500/10
          blur-[150px]
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -left-32
          w-96
          h-96
          rounded-full
          bg-cyan-500/10
          blur-[150px]
        "
      />

      <div className="relative z-10">

        {/* Badge */}
        <div
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border border-white/10
            bg-white/5
            px-4 py-2
            text-sm
          "
        >
          <FaBolt className="text-yellow-400" />

          <span className="text-zinc-300">
            AI Interview Mode
          </span>
        </div>

        {/* Heading */}
        <h2
          className="
            mt-6
            text-3xl
            md:text-5xl
            font-bold
          "
        >
          Ready to test
          <br />
          your skills?
        </h2>

        {/* Description */}
        <p
          className="
            mt-5
            max-w-2xl
            text-zinc-400
            text-lg
          "
        >
          Simulate a real interview, receive
          instant feedback and discover areas
          where you can improve.
        </p>

        {/* Features */}
        <div
          className="
            mt-8
            flex
            flex-wrap
            gap-3
          "
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            Behavioral
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            Technical
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            HR Round
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
            AI Feedback
          </span>
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            mt-10
            flex
            items-center
            gap-3
            rounded-2xl
            bg-white
            px-7
            py-4
            font-medium
            text-black
          "
        >
          <FaMicrophone />

          Start Interview

          <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
}