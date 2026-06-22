import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import {
  FaMicrophone,
  FaArrowRight,
} from "react-icons/fa";

export default function RecentSessions() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchSessions = async () => {
      try {
        const q = query(
          collection(db, "interviews"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(5)
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSessions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user]);

  if (loading) {
    return (
      <div
        className="
          rounded-3xl
          border border-white/10
          bg-white/[0.03]
          p-8
          animate-pulse
          h-[350px]
        "
      />
    );
  }

  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-semibold">
            Recent Sessions
          </h3>

          <p className="text-zinc-500 text-sm mt-1">
            Your latest interview attempts
          </p>
        </div>

        <FaMicrophone className="text-zinc-500" />
      </div>

      {/* Empty State */}
      {sessions.length === 0 && (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-16
          "
        >
          <div
            className="
              h-16
              w-16
              rounded-2xl
              bg-white/5
              border border-white/10
              flex
              items-center
              justify-center
            "
          >
            <FaMicrophone />
          </div>

          <h4 className="mt-5 font-medium">
            No Interviews Yet
          </h4>

          <p className="text-zinc-500 mt-2">
            Complete your first interview
            to see analytics here.
          </p>
        </div>
      )}

      {/* Sessions */}
      <div className="space-y-4">
        {sessions.map((session) => {
          const date = session.createdAt?.toDate
            ? session.createdAt
                .toDate()
                .toLocaleDateString()
            : "Recently";

          return (
            <div
              key={session.id}
              className="
                group
                flex
                items-center
                justify-between
                rounded-2xl
                border border-white/10
                bg-white/5
                px-5
                py-4
                transition-all
                hover:bg-white/10
                hover:border-white/20
              "
            >
              <div>
                <h4 className="font-medium">
                  {session.role ||
                    "Mock Interview"}
                </h4>

                <p className="text-zinc-500 text-sm">
                  {date}
                </p>
              </div>

              <div className="flex items-center gap-6">

                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {session.score || 0}%
                  </p>

                  <p className="text-xs text-zinc-500">
                    Score
                  </p>
                </div>

                <div
                  className={`
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    font-medium
                    ${
                      session.score >= 80
                        ? "bg-green-500/10 text-green-400"
                        : session.score >= 60
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }
                  `}
                >
                  {session.score >= 80
                    ? "Excellent"
                    : session.score >= 60
                    ? "Good"
                    : "Needs Work"}
                </div>

                <FaArrowRight
                  className="
                    text-zinc-500
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}