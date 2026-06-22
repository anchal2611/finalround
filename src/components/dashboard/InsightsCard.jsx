import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import {
  FaBrain,
  FaArrowTrendUp,
  FaBullseye,
} from "react-icons/fa6";

export default function InsightsCard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [insight, setInsight] = useState({
    strength: "Communication",
    weakness: "Technical",
    confidence: 0,
    recommendation: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchInsights = async () => {
      try {
        const q = query(
          collection(db, "interviews"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const interviews = snapshot.docs.map((doc) =>
          doc.data()
        );

        if (interviews.length === 0) {
          setLoading(false);
          return;
        }

        const avgConfidence =
          interviews.reduce(
            (acc, curr) =>
              acc + (curr.confidence || 0),
            0
          ) / interviews.length;

        const avgCommunication =
          interviews.reduce(
            (acc, curr) =>
              acc + (curr.communication || 0),
            0
          ) / interviews.length;

        const avgTechnical =
          interviews.reduce(
            (acc, curr) =>
              acc + (curr.technical || 0),
            0
          ) / interviews.length;

        const metrics = {
          Confidence: avgConfidence,
          Communication: avgCommunication,
          Technical: avgTechnical,
        };

        const strongest = Object.keys(metrics).reduce(
          (a, b) =>
            metrics[a] > metrics[b] ? a : b
        );

        const weakest = Object.keys(metrics).reduce(
          (a, b) =>
            metrics[a] < metrics[b] ? a : b
        );

        let recommendation =
          "Continue practicing consistently.";

        if (weakest === "Technical") {
          recommendation =
            "Focus on DSA and technical problem-solving rounds.";
        }

        if (weakest === "Communication") {
          recommendation =
            "Work on articulation and structured answers.";
        }

        if (weakest === "Confidence") {
          recommendation =
            "Practice mock interviews more frequently.";
        }

        setInsight({
          strength: strongest,
          weakness: weakest,
          confidence: Math.round(avgConfidence),
          recommendation,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [user]);

  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          h-[350px]
          animate-pulse
        "
      />
    );
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -top-20
          -right-20
          h-72
          w-72
          rounded-full
          bg-violet-500/10
          blur-[120px]
        "
      />

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="
              w-12
              h-12
              rounded-xl
              bg-violet-500/10
              border border-white/10
              flex
              items-center
              justify-center
              text-violet-400
            "
          >
            <FaBrain />
          </div>

          <div>
            <h3 className="font-semibold text-xl">
              AI Insights
            </h3>

            <p className="text-zinc-500 text-sm">
              Generated from your interviews
            </p>
          </div>
        </div>

        {/* Strength */}
        <div
          className="
            mb-5
            rounded-2xl
            border border-white/10
            bg-white/5
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <FaArrowTrendUp className="text-green-400" />

            <div>
              <p className="text-zinc-500 text-sm">
                Strongest Skill
              </p>

              <h4 className="font-semibold">
                {insight.strength}
              </h4>
            </div>
          </div>
        </div>

        {/* Weakness */}
        <div
          className="
            mb-5
            rounded-2xl
            border border-white/10
            bg-white/5
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <FaBullseye className="text-orange-400" />

            <div>
              <p className="text-zinc-500 text-sm">
                Focus Area
              </p>

              <h4 className="font-semibold">
                {insight.weakness}
              </h4>
            </div>
          </div>
        </div>

        {/* Confidence */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Confidence Level</span>
            <span>{insight.confidence}%</span>
          </div>

          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-violet-500
                to-cyan-500
              "
              style={{
                width: `${insight.confidence}%`,
              }}
            />
          </div>
        </div>

        {/* Recommendation */}
        <div
          className="
            rounded-2xl
            border border-violet-500/20
            bg-violet-500/5
            p-4
          "
        >
          <p className="text-zinc-300 leading-relaxed">
            {insight.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}