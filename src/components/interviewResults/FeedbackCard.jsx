import { motion } from "framer-motion";

export default function FeedbackCard({

    responses

}) {

    const strengths = [

        ...new Set(

            responses.flatMap(

                response =>

                    response.evaluation?.strengths || []

            )

        )

    ];

    const improvements = [

        ...new Set(

            responses.flatMap(

                response =>

                    response.evaluation?.improvements || []

            )

        )

    ];

    const feedback = responses
        .map(

            response =>

                response.evaluation?.feedback

        )
        .filter(Boolean)
        .join("\n\n");

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
                delay: .3
            }}

            className="
                mt-10
                grid
                lg:grid-cols-2
                gap-8
            "

        >

            {/* Strengths & Improvements */}

            <div

                className="
                    rounded-[32px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-8
                "

            >

                <h2 className="text-2xl font-bold">

                    Top Strengths

                </h2>

                <div className="space-y-4 mt-8">

                    {

                        strengths.length > 0

                            ?

                            strengths.map(

                                (item, index) => (

                                    <div

                                        key={index}

                                        className="
                                            rounded-2xl
                                            border
                                            border-green-500/20
                                            bg-green-500/10
                                            px-5
                                            py-4
                                            text-green-300
                                        "

                                    >

                                        ✓ {item}

                                    </div>

                                )

                            )

                            :

                            <p className="text-zinc-500">

                                No strengths available.

                            </p>

                    }

                </div>

                <h2 className="text-2xl font-bold mt-12">

                    Areas to Improve

                </h2>

                <div className="space-y-4 mt-8">

                    {

                        improvements.length > 0

                            ?

                            improvements.map(

                                (item, index) => (

                                    <div

                                        key={index}

                                        className="
                                            rounded-2xl
                                            border
                                            border-red-500/20
                                            bg-red-500/10
                                            px-5
                                            py-4
                                            text-red-300
                                        "

                                    >

                                        • {item}

                                    </div>

                                )

                            )

                            :

                            <p className="text-zinc-500">

                                No suggestions available.

                            </p>

                    }

                </div>

            </div>

            {/* AI Feedback */}

            <div

                className="
                    rounded-[32px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-8
                "

            >

                <h2 className="text-2xl font-bold">

                    AI Interview Feedback

                </h2>

                <div

                    className="
                        mt-8
                        rounded-2xl
                        border
                        border-violet-500/20
                        bg-violet-500/5
                        p-6
                    "

                >

                    <p

                        className="
                            whitespace-pre-line
                            leading-8
                            text-zinc-300
                        "

                    >

                        {

                            feedback ||

                            "No AI feedback available."

                        }

                    </p>

                </div>

            </div>

        </motion.div>

    );

}