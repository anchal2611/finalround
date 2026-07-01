import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState("");

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!isRecording) return;

    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      resetRecorder();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));

        streamRef.current?.getTracks().forEach((track) => track.stop());
      };

      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });

      recorder.start();

      setIsRecording(true);
    } catch (err) {
      console.error(err);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;

    SpeechRecognition.stopListening();

    clearInterval(timerRef.current);

    mediaRecorderRef.current?.stop();

    setIsRecording(false);
  };

  const resetRecorder = () => {
    clearInterval(timerRef.current);

    SpeechRecognition.stopListening();

    resetTranscript();

    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }

    setTimer(0);
    setAudioBlob(null);
    setAudioURL("");
    setIsRecording(false);

    chunksRef.current = [];

    streamRef.current?.getTracks().forEach((track) => track.stop());
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);

      SpeechRecognition.stopListening();

      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [audioURL]);

  return {
    isRecording,
    timer,
    transcript,
    audioBlob,
    audioURL,
    browserSupportsSpeechRecognition,
    formatTime,
    startRecording,
    stopRecording,
    resetRecorder,
  };
}