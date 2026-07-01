import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInterview } from "../../context/InterviewContext";

export default function BottomActions() {

    const navigate = useNavigate();

    const { resetInterview } = useInterview();

    const handleDashboard = () => {

        resetInterview();

        navigate("/dashboard");

    };

    const handleRetake = () => {

        resetInterview();

        navigate("/interview/setup");

    };

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                delay: 0.4
            }}

            className="
                mt-14
                flex
                flex-wrap
                items-center
                justify-center
                gap-5
            "

        >

            <button

                onClick={handleDashboard}

                className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-8
                    py-4
                    text-white
                    font-medium
                    transition-all
                    duration-300
                    hover:border-white/20
                    hover:bg-white/10
                    hover:scale-[1.02]
                    active:scale-95
                "

            >

                Back to Dashboard

            </button>

            <button

                onClick={handleRetake}

                className="
                    rounded-2xl
                    bg-gradient-to-r
                    from-violet-600
                    to-cyan-500
                    px-8
                    py-4
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-violet-500/20
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:shadow-violet-500/40
                    active:scale-95
                "

            >

                Retake Interview

            </button>

        </motion.div>

    );

}