import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">

        <div
          className="
            rounded-[40px]
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-10 md:p-16
            text-center
          "
        >
          <p className="text-zinc-400 uppercase tracking-[0.3em] text-sm">
            Get Started
          </p>

          <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            Ready For Your
            <br />
            Next Interview?
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg">
            Practice with AI-powered mock interviews, receive
            detailed feedback, and walk into every interview
            with confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            
            <Link
              to="/signup"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                px-8
                py-4
                rounded-full
                bg-white
                text-black
                font-semibold
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Get Started Free
              <FaArrowRight />
            </Link>

            <Link
              to="/login"
              className="
                px-8
                py-4
                rounded-full
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                hover:bg-white/10
                transition-all
                duration-300
              "
            >
              Sign In
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}