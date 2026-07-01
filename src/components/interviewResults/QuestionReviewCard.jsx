import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function QuestionReviewCard({

    response,

    index

}) {

    const {

        question,

        transcript,

        evaluation,

        audioUrl

    } = response;

    const playRecording = () => {

        if (!audioUrl) return;

        const audio = new Audio(audioUrl);

        audio.play();

    };

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 20
            }}

            whileInView={{
                opacity: 1,
                y: 0
            }}

            viewport={{
                once: true
            }}

            transition={{
                delay: index * .05
            }}

            className="
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
            "

        >

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-violet-400 font-medium">

                        Question {index + 1}

                    </p>

                    <h2 className="mt-2 text-2xl font-bold">

                        {question}

                    </h2>

                </div>

                <div

                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-full
                        bg-violet-500/10
                        text-2xl
                        font-bold
                        text-violet-400
                    "

                >

                    {evaluation.overallScore}

                </div>

            </div>

            {/* Scores */}

            <div className="grid md:grid-cols-4 gap-4 mt-8">

                {[
                    {

                        label: "Communication",

                        value:
                            evaluation.communication

                    },

                    {

                        label: "Confidence",

                        value:
                            evaluation.confidence

                    },

                    {

                        label: "Technical",

                        value:
                            evaluation.technicalKnowledge

                    },

                    {

                        label: "Clarity",

                        value:
                            evaluation.clarity

                    }

                ].map(item => (

                    <div

                        key={item.label}

                        className="
                            rounded-2xl
                            bg-white/5
                            border
                            border-white/10
                            p-5
                        "

                    >

                        <p className="text-zinc-500 text-sm">

                            {item.label}

                        </p>

                        <h3 className="mt-3 text-3xl font-bold">

                            {item.value}

                        </h3>

                    </div>

                ))}

            </div>

            {/* Transcript */}

            <div className="mt-8">

                <h3 className="text-xl font-semibold">

                    Transcript

                </h3>

                <div

                    className="
                        mt-4
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/30
                        p-6
                    "

                >

                    <p

                        className="
                            whitespace-pre-wrap
                            leading-8
                            text-zinc-300
                        "

                    >

                        {

                            transcript ||

                            "Transcript unavailable."

                        }

                    </p>

                </div>

            </div>

            {/* Feedback */}

            <div className="grid lg:grid-cols-2 gap-8 mt-8">

                <div>

                    <h3 className="text-xl font-semibold">

                        Strengths

                    </h3>

                    <div className="space-y-3 mt-4">

                        {

                            evaluation.strengths.map(

                                (item, i) => (

                                    <div

                                        key={i}

                                        className="
                                            rounded-xl
                                            bg-green-500/10
                                            border
                                            border-green-500/20
                                            px-4
                                            py-3
                                            text-green-300
                                        "

                                    >

                                        ✓ {item}

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

                <div>

                    <h3 className="text-xl font-semibold">

                        Improvements

                    </h3>

                    <div className="space-y-3 mt-4">

                        {

                            evaluation.improvements.map(

                                (item, i) => (

                                    <div

                                        key={i}

                                        className="
                                            rounded-xl
                                            bg-red-500/10
                                            border
                                            border-red-500/20
                                            px-4
                                            py-3
                                            text-red-300
                                        "

                                    >

                                        • {item}

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

            </div>

            {/* AI Feedback */}

            <div className="mt-8">

                <h3 className="text-xl font-semibold">

                    AI Feedback

                </h3>

                <div

                    className="
                        mt-4
                        rounded-2xl
                        border
                        border-violet-500/20
                        bg-violet-500/5
                        p-6
                    "

                >

                    <p

                        className="
                            leading-8
                            whitespace-pre-wrap
                            text-zinc-300
                        "

                    >

                        {evaluation.feedback}

                    </p>

                </div>

            </div>

            {/* Ideal Answer */}

            <div className="mt-8">

                <h3 className="text-xl font-semibold">

                    Ideal Answer

                </h3>

                <div

                    className="
                        mt-4
                        rounded-2xl
                        border
                        border-cyan-500/20
                        bg-cyan-500/5
                        p-6
                    "

                >

                    <p

                        className="
                            leading-8
                            whitespace-pre-wrap
                            text-zinc-300
                        "

                    >

                        {evaluation.idealAnswer}

                    </p>

                </div>

            </div>

            {/* Recording */}

            {

                audioUrl && (

                    <button

                        onClick={playRecording}

                        className="
                            mt-8
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/5
                            px-6
                            py-4
                            transition
                            hover:bg-white/10
                        "

                    >

                        <PlayCircle size={22} />

                        Play Recording

                    </button>

                )

            }

        </motion.div>

    );

}