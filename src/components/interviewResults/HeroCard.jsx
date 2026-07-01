import { motion } from "framer-motion";

export default function HeroCard({ responses = [] }) {

    const overallScore =
        responses.length > 0
            ? Math.round(
                  responses.reduce(
                      (sum, response) =>
                          sum +
                          (response.evaluation?.overallScore || 0),
                      0
                  ) / responses.length
              )
            : 0;

    const circumference = 2 * Math.PI * 90;

    const offset =
        circumference -
        (overallScore / 100) * circumference;

    const performance = () => {

        if (overallScore >= 90) {

            return {
                title: "Excellent Performance",
                color: "text-green-400",
                message:
                    "Outstanding interview performance. Your communication, confidence and technical understanding were consistently strong."
            };

        }

        if (overallScore >= 80) {

            return {
                title: "Great Performance",
                color: "text-cyan-400",
                message:
                    "You performed well throughout the interview. A few improvements can make you even more interview ready."
            };

        }

        if (overallScore >= 70) {

            return {
                title: "Good Performance",
                color: "text-yellow-400",
                message:
                    "A solid interview with room for improvement in communication and technical depth."
            };

        }

        return {

            title: "Needs Improvement",

            color: "text-red-400",

            message:
                "Continue practicing interview questions and communication to improve your confidence."

        };

    };

    const result = performance();

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
                duration: .5
            }}

            className="
                relative
                overflow-hidden
                rounded-[36px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-10
            "

        >

            {/* Background Glow */}

            <div

                className="
                    absolute
                    -top-28
                    -right-28
                    h-72
                    w-72
                    rounded-full
                    bg-violet-500/10
                    blur-[120px]
                "

            />

            <div

                className="
                    absolute
                    -bottom-24
                    -left-24
                    h-64
                    w-64
                    rounded-full
                    bg-cyan-500/10
                    blur-[120px]
                "

            />

            <div className="relative z-10">

                <p className="text-violet-400 font-medium">

                    FinalRound AI Report

                </p>

                <h1 className="mt-3 text-5xl font-bold">

                    Interview Performance

                </h1>

                <div className="flex justify-center mt-12">

                    <div className="relative h-64 w-64">

                        <svg

                            className="h-full w-full -rotate-90"

                            viewBox="0 0 220 220"

                        >

                            <circle

                                cx="110"

                                cy="110"

                                r="90"

                                stroke="rgba(255,255,255,.08)"

                                strokeWidth="12"

                                fill="none"

                            />

                            <motion.circle

                                initial={{
                                    strokeDashoffset:
                                        circumference
                                }}

                                animate={{
                                    strokeDashoffset:
                                        offset
                                }}

                                transition={{
                                    duration: 1.5
                                }}

                                cx="110"

                                cy="110"

                                r="90"

                                stroke="url(#scoreGradient)"

                                strokeWidth="12"

                                strokeLinecap="round"

                                fill="none"

                                strokeDasharray={
                                    circumference
                                }

                                strokeDashoffset={
                                    offset
                                }

                            />

                            <defs>

                                <linearGradient

                                    id="scoreGradient"

                                >

                                    <stop

                                        offset="0%"

                                        stopColor="#8B5CF6"

                                    />

                                    <stop

                                        offset="100%"

                                        stopColor="#22D3EE"

                                    />

                                </linearGradient>

                            </defs>

                        </svg>

                        <div

                            className="
                                absolute
                                inset-0
                                flex
                                flex-col
                                items-center
                                justify-center
                            "

                        >

                            <span className="text-6xl font-bold">

                                {overallScore}

                            </span>

                            <span className="mt-2 text-zinc-400">

                                /100

                            </span>

                        </div>

                    </div>

                </div>

                <div className="mt-10 text-center">

                    <h2

                        className={`text-3xl font-bold ${result.color}`}

                    >

                        {result.title}

                    </h2>

                    <p

                        className="
                            mx-auto
                            mt-4
                            max-w-2xl
                            text-zinc-400
                            leading-8
                        "

                    >

                        {result.message}

                    </p>

                </div>

            </div>

        </motion.div>

    );

}