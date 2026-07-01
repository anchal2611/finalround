import { motion } from "framer-motion";

export default function SkillBreakdown({ responses = [] }) {

    const average = (field) => {

        if (!responses.length) return 0;

        return Math.round(

            responses.reduce(

                (sum, response) =>

                    sum +

                    (response.evaluation?.[field] || 0),

                0

            ) / responses.length

        );

    };

    const skills = [

        {

            skill: "Communication",

            score: average("communication")

        },

        {

            skill: "Technical Knowledge",

            score: average("technicalKnowledge")

        },

        {

            skill: "Confidence",

            score: average("confidence")

        },

        {

            skill: "Clarity",

            score: average("clarity")

        },

        {

            skill: "Relevance",

            score: average("relevance")

        }

    ];

    const getColor = (score) => {

        if (score >= 90)
            return "from-green-400 to-emerald-500";

        if (score >= 80)
            return "from-cyan-400 to-blue-500";

        if (score >= 70)
            return "from-violet-500 to-fuchsia-500";

        if (score >= 60)
            return "from-yellow-400 to-orange-500";

        return "from-red-500 to-rose-500";

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
                delay: .2
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

            <h2 className="text-3xl font-bold">

                Skill Breakdown

            </h2>

            <p className="mt-2 text-zinc-400">

                Average scores across all interview questions.

            </p>

            <div className="space-y-8 mt-10">

                {

                    skills.map(item => (

                        <div

                            key={item.skill}

                        >

                            <div className="flex items-center justify-between">

                                <span className="font-medium">

                                    {item.skill}

                                </span>

                                <span className="text-violet-400 font-semibold">

                                    {item.score}%

                                </span>

                            </div>

                            <div

                                className="
                                    mt-3
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
                                        width: `${item.score}%`
                                    }}

                                    transition={{
                                        duration: 1
                                    }}

                                    className={`
                                        h-full
                                        rounded-full
                                        bg-gradient-to-r
                                        ${getColor(item.score)}
                                    `}

                                />

                            </div>

                        </div>

                    ))

                }

            </div>

        </motion.div>

    );

}