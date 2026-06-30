import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import DashboardNavbar from "../components/dashboard/Navbar";
import SplashCursor from "../components/SplashCursor";


export default function InterviewHR() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

         <SplashCursor
             DENSITY_DISSIPATION={4}
             VELOCITY_DISSIPATION={2.2}
             PRESSURE={0.08}
             CURL={2}
             SPLAT_RADIUS={0.12}
             SPLAT_FORCE={3500}
             COLOR_UPDATE_SPEED={8}
             SHADING
             RAINBOW_MODE
             COLOR="#8B5CF6"
         />       

      <DashboardNavbar />

      <main className="max-w-5xl mx-auto px-6 pt-36 pb-20">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-violet-400 font-medium">
                Stage 3 of 3
              </p>

              <h1 className="text-5xl font-bold mt-3">
                Behavioral + HR
              </h1>

              <p className="text-zinc-400 mt-4 max-w-xl">
                This round evaluates your communication,
                teamwork, leadership and problem-solving
                abilities through real-world scenarios.
              </p>

            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-5
                py-3
                hover:bg-white/10
              "
            >
              Exit Interview
            </button>

          </div>

        </motion.div>

        {/* Progress */}

        <div className="mt-12">

          <div className="flex justify-between text-sm text-zinc-500 mb-3">

            <span>Interview Progress</span>

            <span>100%</span>

          </div>

          <div className="h-3 rounded-full bg-white/5 overflow-hidden">

            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-violet-500
                to-cyan-400
                w-full
              "
            />

          </div>

        </div>

        {/* Question Card */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="
            mt-12
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-10
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              -top-32
              -right-32
              w-72
              h-72
              rounded-full
              bg-violet-500/10
              blur-[120px]
            "
          />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex gap-3">

                  <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                    Leadership
                  </span>

                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                    Behavioral
                  </span>

                </div>

                <p className="text-zinc-500 mt-5">
                  Question 3 of 3
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  Tell me about a time you handled
                  a conflict within your team.
                </h2>

              </div>

              <div
                className="
                  h-14
                  w-14
                  rounded-2xl
                  bg-violet-500/20
                  flex
                  items-center
                  justify-center
                  text-2xl
                "
              >
                💬
              </div>

            </div>

            {/* Answer */}

            <div className="mt-10">

              <h4 className="font-semibold text-lg">
                Your Answer
              </h4>

              <textarea
                rows={8}
                placeholder="Share your experience..."
                className="
                  mt-4
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/30
                  p-5
                  outline-none
                  resize-none
                "
              />

            </div>

            {/* Navigation */}

            <div className="flex justify-between mt-10">

              <button
                onClick={() => navigate("/interview/technical")}
                className="
                  px-6
                  py-3
                  rounded-2xl
                  bg-white/5
                  border
                  border-white/10
                  hover:bg-white/10
                  transition
                "
              >
                Technical Round
              </button>

              <button
                onClick={() => navigate("/interview/results")}
                className="
                  px-8
                  py-3
                  rounded-2xl
                  bg-white
                  text-black
                  font-medium
                "
              >
                View Results
              </button>

            </div>

          </div>

        </motion.div>

      </main>

    </div>
  );
}