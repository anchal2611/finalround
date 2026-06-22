import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 md:pt-20">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Practice Like
          <br />
          <span className="text-zinc-400">
            It's Real.
          </span>
          <br />
          Perform Like
          <br />
          You've Done It Before.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-zinc-400 leading-relaxed"
        >
          Master interviews with AI-powered mock sessions,
          real-time feedback, resume analysis, and detailed
          performance insights designed to help you land your
          next opportunity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/signup"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-all duration-300"
          >
            Start Practicing
          </Link>

          <Link
            to="/dashboard"
            className="px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
          >
            View Dashboard
          </Link>
        </motion.div>

      </div>
    </section>
  );
}