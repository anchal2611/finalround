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
  FaMicrophone,
  FaChartLine,
  FaClock,
  FaArrowTrendUp,
} from "react-icons/fa6";

export default function StatsGrid() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    interviews: 0,
    averageScore: 0,
    hours: 0,
    growth: 0,
  });

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const q = query(
          collection(db, "interviews"),
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        const interviews = snapshot.docs.map((doc) =>
          doc.data()
        );

        const totalInterviews = interviews.length;

        const totalScore = interviews.reduce(
          (acc, curr) =>
            acc + (curr.score || 0),
          0
        );

        const averageScore =
          totalInterviews > 0
            ? Math.round(
                totalScore / totalInterviews
              )
            : 0;

        const totalMinutes = interviews.reduce(
          (acc, curr) =>
            acc + (curr.duration || 0),
          0
        );

        const totalHours = (
          totalMinutes / 60
        ).toFixed(1);

        const growth =
          totalInterviews > 1
            ? Math.max(
                0,
                interviews[
                  interviews.length - 1
                ]?.score -
                  interviews[0]?.score
              )
            : 0;

        setStats({
          interviews: totalInterviews,
          averageScore,
          hours: totalHours,
          growth,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  const cards = [
    {
      title: "Interviews",
      value: stats.interviews,
      icon: <FaMicrophone />,
    },
    {
      title: "Avg Score",
      value: `${stats.averageScore}%`,
      icon: <FaChartLine />,
    },
    {
      title: "Practice Hours",
      value: stats.hours,
      icon: <FaClock />,
    },
    {
      title: "Growth",
      value: `+${stats.growth}%`,
      icon: <FaArrowTrendUp />,
    },
  ];

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              h-36
              rounded-3xl
              border
              border-white/10
              bg-white/[0.03]
              animate-pulse
            "
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            p-6
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-white/20
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-32
              w-32
              rounded-full
              bg-violet-500/10
              blur-3xl
              opacity-0
              group-hover:opacity-100
              transition
            "
          />

          <div className="relative z-10">
            <div
              className="
                mb-5
                flex
                items-center
                justify-center
                w-12
                h-12
                rounded-xl
                bg-white/5
                border
                border-white/10
                text-lg
              "
            >
              {card.icon}
            </div>

            <p className="text-zinc-500 text-sm">
              {card.title}
            </p>

            <h3 className="mt-2 text-4xl font-bold">
              {card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}