import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import DashboardNavbar from "../components/dashboard/Navbar";
import SplashCursor from "../components/SplashCursor";


export default function InterviewResume() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);

  const [mediaRecorder, setMediaRecorder] = useState(null);

  const [audioBlob, setAudioBlob] = useState(null);

  const [audioURL, setAudioURL] = useState("");

  const [timer, setTimer] = useState(0);

  const chunksRef = useRef([]);

  const timerRef = useRef(null);

  useEffect(() => {

    if (!isRecording) return;

    timerRef.current = setInterval(() => {

        setTimer(prev => prev + 1);

    },1000);

    return ()=>clearInterval(timerRef.current);

  },[isRecording]);

  const formatTime = (seconds)=>{

    const mins=Math.floor(seconds/60);

    const secs=seconds%60;

    return `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

  }

  const startRecording = async()=>{

    const stream=

    await navigator.mediaDevices.getUserMedia({

        audio:true

    });

    const recorder=

    new MediaRecorder(stream);

    chunksRef.current=[];

    recorder.ondataavailable=(e)=>{

        chunksRef.current.push(e.data);

    };

    recorder.onstop=()=>{

        const blob=new Blob(

            chunksRef.current,

            {

                type:"audio/webm"

            }

        );

        console.log(blob);
        console.log(blob.size);

        setAudioBlob(blob);

        setAudioURL(
            URL.createObjectURL(blob)
        );

        stream.getTracks().forEach(track=>track.stop());

    };

    recorder.start();

    setMediaRecorder(recorder);

    setTimer(0);

    setIsRecording(true);

  };

  const stopRecording=()=>{

    if(mediaRecorder){
      mediaRecorder.stop();
    }

    clearInterval(timerRef.current);

    setIsRecording(false);

  };

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
                Stage 1 of 3
              </p>

              <h1 className="text-5xl font-bold mt-3">
                Resume Discussion
              </h1>

              <p className="text-zinc-400 mt-4 max-w-xl">
                Let's begin by understanding your
                background, projects and experience.
                Answer naturally as if you're talking
                to a real interviewer.
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

    <span>20%</span>

  </div>

  <div className="h-3 rounded-full bg-white/5 overflow-hidden">

    <div
      className="
        h-full
        rounded-full
        bg-gradient-to-r
        from-violet-500
        to-cyan-400
        w-[20%]
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

                <p className="text-zinc-500">
                  Question 1 of 5
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {currentQuestion.question}
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
                🎤
              </div>

            </div>

            <div
                className="
                    mt-10
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-8
                "
                >

  {/* AI Status */}

  <div className="flex items-center justify-between">

    <div>

      <p className="text-zinc-500 text-sm">
        AI Interviewer
      </p>

      <h3 className="mt-2 text-xl font-semibold">
        {isRecording ? "Listening..." : "Ready to Record"}
      </h3>
      {
      isRecording && (

      <p className="mt-2 text-red-400 text-sm">

      ● Recording

      </p>

      )
      }

    </div>

    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      <span className="text-zinc-500">
        {formatTime(timer)}
      </span>

      {
      isRecording && (

      <div
      className="
      h-3
      w-3
      rounded-full
      bg-red-500
      animate-pulse
      "/>

      )
      }

    </div>

  </div>

  {/* Microphone */}

  <div className="flex justify-center mt-10">

    <div
      onClick={
          isRecording
              ? stopRecording
              : startRecording
      }
      className="
          relative
          h-28
          w-28
          rounded-full
          bg-gradient-to-br
          from-violet-500
          to-cyan-500
          flex
          items-center
          justify-center
          shadow-[0_0_60px_rgba(168,85,247,.35)]
          cursor-pointer
          transition
          hover:scale-105
      "
    >

      <span className="text-5xl">
        🎤
      </span>

      <div
        className={`
            absolute
            inset-0
            rounded-full
            border
            border-violet-400/30
            ${isRecording ? "animate-ping" : ""}
        `}
      />

    </div>

  </div>

  <p className="text-center text-zinc-500 mt-5">
    {
    isRecording
        ? "Recording... Tap the microphone to stop."
        : "Tap the microphone to start recording."
   }
  </p>

  {/* Transcript */}

  <div className="mt-10">

    <h4 className="font-semibold text-lg">
      Live Transcript
    </h4>

    <div
      className="
        mt-4
        rounded-2xl
        border
        border-dashed
        border-white/10
        bg-black/30
        p-6
        min-h-[120px]
      "
    >

      <p className="text-zinc-500 leading-8">
        Your spoken answer will appear here in real-time...
      </p>

    </div>

    {
    audioURL && (

    <audio
    controls
    src={audioURL}
    className="mt-6 w-full"
    />

    )
    }

  </div>

</div>

            <div className="flex justify-between mt-10">

              <button
                onClick={() => navigate("/interview/setup")}
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
                Back
                </button>

              <button
                disabled={!audioBlob}
                onClick={() => {console.log(audioBlob);}}
                className={`

                  px-8
                  py-3
                  rounded-2xl
                  font-medium
                  transition

                  ${
                  audioBlob

                  ?

                  "bg-white text-black"

                  :

                  "bg-zinc-700 text-zinc-400 cursor-not-allowed"

                  }

                `}
                >
                Continue to Technical
                </button>

            </div>

          </div>

        </motion.div>

      </main>

    </div>
  );
}