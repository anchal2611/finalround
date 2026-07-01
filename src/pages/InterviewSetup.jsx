import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import DashboardNavbar from "../components/dashboard/Navbar";
import SplashCursor from "../components/SplashCursor";

import {
  FaBriefcase,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";

import SpeechRecognition, {
    useSpeechRecognition
} from "react-speech-recognition";

export default function InterviewSetup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const [experience, setExperience] =
    useState("Fresher");

  const [difficulty, setDifficulty] =
    useState("Medium");

  useEffect(() => {
    checkMicrophone();
  }, []);

  const [micPermission, setMicPermission] = useState(false);

  const [browserSupported, setBrowserSupported] = useState(false);

  const [micDevice, setMicDevice] = useState("");

  const [testingMic, setTestingMic] = useState(false);

  const [micWorking, setMicWorking] = useState(false);

  const [permissionError, setPermissionError] = useState("");

  const {

    transcript,

    listening,

    resetTranscript,

    browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {

        setBrowserSupported(
            browserSupportsSpeechRecognition
        );

    }, [browserSupportsSpeechRecognition]);

  const checkMicrophone = async () => {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });

        const devices =
            await navigator.mediaDevices.enumerateDevices();

        const mic = devices.find(
            d => d.kind === "audioinput"
        );

        setMicPermission(true);

        setMicDevice(
            mic?.label || "Default Microphone"
        );

        stream.getTracks().forEach(track =>
            track.stop()
        );

    }

    catch {

        setPermissionError(
            "Microphone permission denied."
        );

    }
  };

  const startMicTest = () => {

    resetTranscript();

    setTestingMic(true);

    SpeechRecognition.startListening({

        continuous: true,

        language: "en-IN"

    });
  };

  const stopMicTest = () => {

    SpeechRecognition.stopListening();

    setTestingMic(false);

    if (transcript.length > 10) {

        setMicWorking(true);

    }

  };


  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      <SplashCursor
        DENSITY_DISSIPATION={4}
        VELOCITY_DISSIPATION={3}
        PRESSURE={0.05}
        CURL={2}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={3000}
        COLOR_UPDATE_SPEED={5}
        SHADING={false}
        RAINBOW_MODE
        COLOR="#A855F7"
      />

      <DashboardNavbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-24">

        {/* HERO */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: .5 }}
        >

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-white/5
            px-4
            py-2
            text-sm
            "
          >
            🚀 AI Mock Interview
          </div>

          <h1
            className="
            mt-6
            text-5xl
            md:text-6xl
            font-bold
            leading-tight
            "
          >
            Prepare Your
            <br />
            Interview
          </h1>

          <p
            className="
            mt-5
            max-w-2xl
            text-lg
            text-zinc-400
            "
          >
            Configure your interview once.
            FinalRound AI will personalize
            every question according to your
            target role and experience.
          </p>

        </motion.div>

        {/* FORM CARD */}

        <div
          className="
          relative
          mt-12
          rounded-[36px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-md
          overflow-hidden
          p-10
          "
        >

          {/* Glow */}

          <div
            className="
            absolute
            -top-32
            -right-32
            h-72
            w-72
            rounded-full
            bg-violet-500/20
            blur-[80px]
            "
          />

          <div
            className="
            absolute
            -bottom-32
            -left-32
            h-72
            w-72
            rounded-full
            bg-cyan-500/20
            blur-[80px]
            "
          />

          <div className="relative z-10">

            <h2 className="text-3xl font-bold">
              Interview Configuration
            </h2>

            <p className="mt-2 text-zinc-400">
              Fill in the details below to
              generate a personalized mock
              interview.
            </p>

            {/* ROLE */}

            <div className="grid md:grid-cols-2 gap-8 mt-10">

              <div>

                <label className="mb-3 block text-zinc-300">
                  Target Role
                </label>

                <div
                  className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  "
                >

                  <FaBriefcase
                    className="text-violet-400"
                  />

                  <input
                    value={role}
                    onChange={(e)=>
                      setRole(e.target.value)
                    }
                    placeholder="Frontend Developer"
                    className="
                    w-full
                    bg-transparent
                    outline-none
                    placeholder:text-zinc-500
                    "
                  />

                </div>

              </div>

              <div>

                <label className="mb-3 block text-zinc-300">
                  Experience
                </label>

                <select
                  value={experience}
                  onChange={(e)=>
                    setExperience(e.target.value)
                  }
                  className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  outline-none
                  "
                >

                  <option className="bg-black">
                    Fresher
                  </option>

                  <option className="bg-black">
                    1-2 Years
                  </option>

                  <option className="bg-black">
                    3-5 Years
                  </option>

                  <option className="bg-black">
                    5+ Years
                  </option>

                </select>

              </div>

            </div>

            {/* Difficulty */}

            <div className="mt-10">

              <label className="block mb-4">
                Difficulty
              </label>

              <div className="flex flex-wrap gap-4">

                {["Easy","Medium","Hard"].map(level=>(
                  <button
                    key={level}
                    onClick={()=>
                      setDifficulty(level)
                    }
                    className={`
                    px-6
                    py-3
                    rounded-full
                    transition-all
                    duration-200

                    ${
                      difficulty===level
                      ? "bg-violet-600 text-white"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }
                    `}
                  >
                    {level}
                  </button>
                ))}

              </div>

            </div>

            {/* Interview Flow */}

            <div className="mt-14">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-2xl font-bold">
                    Interview Flow
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    Your interview consists of three AI-powered stages.
                  </p>

                </div>

                <div className="hidden md:flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">

                  <FaChartLine />

                  Adaptive Difficulty

                </div>

              </div>

              <div className="grid lg:grid-cols-3 gap-6 mt-8">

                {/* Stage 1 — CSS hover, no framer */}

                <div
                  className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  transition-transform
                  duration-150
                  ease-out
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  "
                >

                  <div className="flex items-center justify-between">

                    <span className="text-4xl font-bold text-violet-400">
                      01
                    </span>

                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                      20%
                    </span>

                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Resume Discussion
                  </h4>

                  <ul className="mt-6 space-y-3 text-zinc-400 text-sm">

                    <li>✓ Introduction</li>

                    <li>✓ Resume Validation</li>

                    <li>✓ Projects</li>

                    <li>✓ Experience</li>

                  </ul>

                </div>

                {/* Stage 2 — CSS hover, no framer */}

                <div
                  className="
                  rounded-3xl
                  border
                  border-violet-500/40
                  bg-gradient-to-b
                  from-violet-500/15
                  to-white/5
                  p-6
                  transition-transform
                  duration-150
                  ease-out
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  "
                >

                  <div className="flex items-center justify-between">

                    <span className="text-4xl font-bold text-violet-400">
                      02
                    </span>

                    <span className="rounded-full bg-violet-500/20 px-3 py-1 text-sm text-violet-200">
                      60%
                    </span>

                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Technical Round
                  </h4>

                  <ul className="mt-6 space-y-3 text-zinc-300 text-sm">

                    <li>✓ Role Specific Questions</li>

                    <li>✓ Resume Based Questions</li>

                    <li>✓ Progressive Difficulty</li>

                    <li>✓ Concept Evaluation</li>

                  </ul>

                </div>

                {/* Stage 3 — CSS hover, no framer */}

                <div
                  className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                  transition-transform
                  duration-150
                  ease-out
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  "
                >

                  <div className="flex items-center justify-between">

                    <span className="text-4xl font-bold text-violet-400">
                      03
                    </span>

                    <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm text-violet-300">
                      20%
                    </span>

                  </div>

                  <h4 className="mt-6 text-xl font-semibold">
                    Behavioral + HR
                  </h4>

                  <ul className="mt-6 space-y-3 text-zinc-400 text-sm">

                    <li>✓ Teamwork</li>

                    <li>✓ Leadership</li>

                    <li>✓ Conflict Resolution</li>

                    <li>✓ Future Goals</li>

                  </ul>

                </div>

              </div>

            </div>

            {/* System Check */}

            <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8">

              <h3 className="text-2xl font-bold">

                  System Check

              </h3>

              <div className="mt-6 space-y-4">

                  <div className="flex justify-between">

                      <span>Browser Support</span>

                      <span className={browserSupported ? "text-green-400" : "text-red-400"}>

                          {browserSupported ? "✓ Supported" : "✗ Not Supported"}

                      </span>

                  </div>

                  <div className="flex justify-between">

                      <span>Microphone Permission</span>

                      <span className={micPermission ? "text-green-400" : "text-red-400"}>

                          {micPermission ? "✓ Granted" : "✗ Denied"}

                      </span>

                  </div>

                  <div className="flex justify-between">

                      <span>Microphone</span>

                      <span className="text-zinc-300">

                          {micDevice || "Not Detected"}

                      </span>

                  </div>

                  <div className="flex justify-between">

                      <span>Speech Recognition</span>

                      <span className={micWorking ? "text-green-400" : "text-yellow-400"}>

                          {micWorking ? "✓ Working" : "Not Tested"}

                      </span>

                  </div>

              </div>

          </div>

          {/* Microphone Test */}

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

            <h3 className="text-xl font-semibold">

                Test Microphone

            </h3>

            <p className="text-zinc-400 mt-2">

                Speak for a few seconds to verify speech recognition.

            </p>

            <div className="flex gap-4 mt-6">

                <button

                    onClick={startMicTest}

                    disabled={testingMic}

                    className="px-6 py-3 rounded-2xl bg-violet-600"

                >

                    Start Test

                </button>

                <button

                    onClick={stopMicTest}

                    disabled={!testingMic}

                    className="px-6 py-3 rounded-2xl bg-white/10"

                >

                    Stop

                </button>

            </div>

            <div className="mt-6 rounded-2xl bg-black/30 p-5 min-h-[120px]">

                {transcript ||

                    "Transcript will appear here..."}

            </div>

        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

          <h3 className="text-xl font-semibold">

              Before You Begin

          </h3>

          <ul className="mt-4 space-y-3 text-zinc-400">

              <li>✓ Sit in a quiet environment.</li>

              <li>✓ Speak naturally and clearly.</li>

              <li>✓ Keep your microphone close.</li>

              <li>✓ Ensure a stable internet connection.</li>

          </ul>

      </div>

            {/* Bottom CTA */}

            <div
              className="
              mt-14
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-r
              from-violet-500/10
              via-white/5
              to-cyan-500/10
              p-8
              "
            >

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
                <div className="max-w-xl">

                  <h3 className="text-4xl font-bold leading-tight">
                    Ready to{" "}
                    <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        begin?
                    </span>
                    </h3>

                  <p className="mt-4 text-lg leading-8 text-zinc-400">
                    Your interview will take approximately
                    <span className="text-white font-medium">
                      {" "}20–25 minutes
                    </span>
                    {" "}and includes adaptive AI questioning based on your responses.
                  </p>

                  
                </div>

                <div
                    className="
                        flex
                        items-end
                        justify-start
                        lg:justify-end
                        gap-5
                        shrink-0
                    "
                    >

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="
                            h-16
                            px-10
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/5
                            hover:bg-white/10
                            transition
                            "
                    >
                        Dashboard
                    </button>

                    <motion.button
                        whileHover={{
                        scale: 1.04,
                        }}
                        whileTap={{
                        scale: .97,
                        }}
                        onClick={() =>
                          navigate(
                              "/interview/resume",
                              {
                                  state: {

                                      role,

                                      experience,

                                      difficulty,

                                      micDevice

                                  }
                              }
                          )
                      }

                      disabled={
                          !micPermission ||
                          !browserSupported ||
                          !micWorking
                      }
                        className={`
                        h-16
                        px-12
                        rounded-3xl
                        font-semibold
                        text-lg
                        transition

                        ${
                        micPermission &&
                        browserSupported &&
                        micWorking

                        ?

                        "bg-gradient-to-r from-violet-500 to-cyan-500"

                        :

                        "bg-zinc-700 cursor-not-allowed opacity-50"

                        }
                        `}
                    >
                        Start Interview
                    </motion.button>

                    </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );

}