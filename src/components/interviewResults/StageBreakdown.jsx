import { motion } from "framer-motion";

export default function StageBreakdown({ responses = [] }) {

    const calculateStageScore = (stage) => {

        const filtered = responses.filter(
            response => response.stage === stage
        );

        if (!filtered.length) return 0;

        return Math.round(

            filtered.reduce(

                (sum, response) =>

                    sum +

                    (response.evaluation?.overallScore || 0),

                0

            ) / filtered.length

        );

    };

    const stages = [

        {
            title: "Resume",
            description: "Background & Experience",
            score: calculateStageScore("resume"),
            color: "from-violet-500 to-fuchsia-500"
        },

        {
            title: "Technical",
            description: "Technical Knowledge",
            score: calculateStageScore("technical"),
            color: "from-cyan-500 to-blue-500"
        },

        {
            title: "HR",
            description: "Behavioral & HR",
            score: calculateStageScore("hr"),
            color: "from-emerald-500 to-green-500"
        }

    ];

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
                delay: .15
            }}

            className="mt-10"

        >

            <h2 className="text-3xl font-bold">

                Stage Performance

            </h2>

            <p className="mt-2 text-zinc-400">

                Performance across each interview stage.

            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                {

                    stages.map(stage => (

                        <motion.div

                            key={stage.title}

                            whileHover={{
                                y: -5
                            }}

                            className="
                                rounded-[28px]
                                border
                                border-white/10
                                bg-white/[0.03]
                                backdrop-blur-xl
                                p-7
                            "

                        >

                            <div

                                className={`
                                    h-2
                                    rounded-full
                                    bg-gradient-to-r
                                    ${stage.color}
                                `}

                            />

                            <h3 className="mt-6 text-2xl font-bold">

                                {stage.title}

                            </h3>

                            <p className="mt-2 text-zinc-500">

                                {stage.description}

                            </p>

                            <div className="mt-8">

                                <div className="flex justify-between">

                                    <span className="text-zinc-400">

                                        Score

                                    </span>

                                    <span className="font-bold text-xl">

                                        {stage.score}%

                                    </span>

                                </div>

                                <div

                                    className="
                                        mt-4
                                        h-3
                                        overflow-hidden
                                        rounded-full
                                        bg-white/5
                                    "

                                >

                                    <motion.div

                                        initial={{
                                            width: 0
                                        }}

                                        animate={{
                                            width: `${stage.score}%`
                                        }}

                                        transition={{
                                            duration: 1
                                        }}

                                        className={`
                                            h-full
                                            rounded-full
                                            bg-gradient-to-r
                                            ${stage.color}
                                        `}

                                    />

                                </div>

                            </div>

                            <div className="mt-8">

                                {

                                    stage.score >= 90 && (

                                        <span className="rounded-full bg-green-500/10 px-4 py-2 text-green-400 text-sm">

                                            Excellent

                                        </span>

                                    )

                                }

                                {

                                    stage.score >= 80 &&
                                    stage.score < 90 && (

                                        <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400 text-sm">

                                            Strong

                                        </span>

                                    )

                                }

                                {

                                    stage.score >= 70 &&
                                    stage.score < 80 && (

                                        <span className="rounded-full bg-yellow-500/10 px-4 py-2 text-yellow-400 text-sm">

                                            Good

                                        </span>

                                    )

                                }

                                {

                                    stage.score < 70 && (

                                        <span className="rounded-full bg-red-500/10 px-4 py-2 text-red-400 text-sm">

                                            Needs Improvement

                                        </span>

                                    )

                                }

                            </div>

                        </motion.div>

                    ))

                }

            </div>

        </motion.div>

    );

}