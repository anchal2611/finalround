import { motion } from "framer-motion";

export default function SummaryCard({

    responses = [],

    session

}) {

    const overallScore =
        responses.length

            ? Math.round(

                  responses.reduce(

                      (sum, response) =>

                          sum +

                          (response.evaluation?.overallScore || 0),

                      0

                  ) / responses.length

              )

            : 0;

    const recommendation = () => {

        if (overallScore >= 90)
            return "Interview Ready";

        if (overallScore >= 80)
            return "Almost Ready";

        if (overallScore >= 70)
            return "Needs Practice";

        return "Needs Significant Improvement";

    };

    const strongestStage = () => {

        const stages = {

            resume: [],

            technical: [],

            hr: []

        };

        responses.forEach(response => {

            stages[response.stage]?.push(

                response.evaluation?.overallScore || 0

            );

        });

        const averages = Object.entries(stages).map(

            ([stage, scores]) => ({

                stage,

                score:

                    scores.length

                        ? scores.reduce(

                              (a, b) => a + b,

                              0

                          ) / scores.length

                        : 0

            })

        );

        return averages.sort(

            (a, b) => b.score - a.score

        )[0].stage;

    };

    const formatStage = (stage) => {

        switch (stage) {

            case "resume":

                return "Resume Round";

            case "technical":

                return "Technical Round";

            case "hr":

                return "HR Round";

            default:

                return "-";

        }

    };

    const interviewDuration = () => {

        return `${responses.length * 3} mins`;

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

            <h2 className="text-2xl font-bold">

                Interview Summary

            </h2>

            <div className="space-y-8 mt-8">

                <div>

                    <p className="text-zinc-500 text-sm">

                        Target Role

                    </p>

                    <h3 className="mt-1 text-2xl font-semibold">

                        {session?.role || "-"}

                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 text-sm">

                        Difficulty

                    </p>

                    <h3 className="mt-1 text-2xl font-semibold">

                        {session?.difficulty || "-"}

                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 text-sm">

                        Experience

                    </p>

                    <h3 className="mt-1 text-2xl font-semibold">

                        {session?.experience || "-"}

                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 text-sm">

                        Duration

                    </p>

                    <h3 className="mt-1 text-2xl font-semibold">

                        {interviewDuration()}

                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 text-sm">

                        Questions Answered

                    </p>

                    <h3 className="mt-1 text-2xl font-semibold">

                        {responses.length} / 10

                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 text-sm">

                        Strongest Stage

                    </p>

                    <h3 className="mt-1 text-2xl font-semibold">

                        {formatStage(

                            strongestStage()

                        )}

                    </h3>

                </div>

                <div>

                    <p className="text-zinc-500 text-sm">

                        Recommendation

                    </p>

                    <span

                        className="
                            mt-3
                            inline-flex
                            rounded-full
                            bg-green-500/10
                            px-4
                            py-2
                            text-green-400
                            text-sm
                            font-medium
                        "

                    >

                        {recommendation()}

                    </span>

                </div>

            </div>

        </motion.div>

    );

}