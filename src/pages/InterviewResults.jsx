import { motion } from "framer-motion";
import { useInterview } from "../context/InterviewContext";

import DashboardNavbar from "../components/dashboard/Navbar";

import HeroCard from "../components/interviewResults/HeroCard";
import SummaryCard from "../components/interviewResults/SummaryCard";
import SkillBreakdown from "../components/interviewResults/SkillBreakdown";
import StageBreakdown from "../components/interviewResults/StageBreakdown";
import FeedbackCard from "../components/interviewResults/FeedbackCard";
import QuestionReviewCard from "../components/interviewResults/QuestionReviewCard";
import BottomActions from "../components/interviewResults/BottomActions";

export default function InterviewResults() {

    const {

        session,

        responses

    } = useInterview();

    if (!session) {

        return (

            <div className="min-h-screen bg-black text-white flex items-center justify-center">

                <div className="text-center">

                    <h1 className="text-4xl font-bold">

                        No Interview Found

                    </h1>

                    <p className="mt-4 text-zinc-400">

                        Complete an interview to view your report.

                    </p>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen overflow-x-hidden bg-black text-white">

            <DashboardNavbar />

            <main className="mx-auto max-w-7xl px-6 pt-36 pb-20">

                {/* Header */}

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

                >

                    <p className="font-medium text-violet-400">

                        AI Interview Completed

                    </p>

                    <h1 className="mt-3 text-5xl font-bold">

                        Your Interview Report

                    </h1>

                    <p className="mt-4 max-w-2xl text-zinc-400">

                        FinalRound AI evaluated your communication,

                        confidence and technical knowledge across all

                        interview stages.

                    </p>

                </motion.div>

                {/* Hero */}

                <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">

                    <HeroCard

                        responses={responses}

                    />

                    <SummaryCard

                        session={session}

                        responses={responses}

                    />

                </div>

                {/* Stage Breakdown */}

                <StageBreakdown

                    responses={responses}

                />

                {/* Skills + Feedback */}

                <div className="mt-10 grid gap-8 lg:grid-cols-2">

                    <SkillBreakdown

                        responses={responses}

                    />

                    <FeedbackCard

                        responses={responses}

                    />

                </div>

                {/* Question Reviews */}

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
                        delay: .4
                    }}

                    className="mt-12"

                >

                    <h2 className="text-3xl font-bold">

                        Question Review

                    </h2>

                    <p className="mt-3 text-zinc-400">

                        Review every answer with detailed AI feedback,

                        transcript and personalized suggestions.

                    </p>

                    <div className="mt-8 space-y-8">

                        {

                            responses.map(

                                (response, index) => (

                                    <QuestionReviewCard

                                        key={response.questionId}

                                        response={response}

                                        index={index}

                                    />

                                )

                            )

                        }

                    </div>

                </motion.div>

                {/* Bottom Buttons */}

                <BottomActions />

            </main>

        </div>

    );

}