import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import {
  FaUserGraduate,
  FaBullseye,
  FaArrowRight,
} from "react-icons/fa6";

export default function WelcomeCard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    roleType: "",
    targetRole: "",
    resumeScore: 0,
  });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const userRef = doc(db, "users", user.uid);

        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const data = snap.data();

          setProfile({
            name:
              data.name ||
              user.displayName ||
              user.email?.split("@")[0] ||
              "Candidate",

            roleType:
              data.roleType || "Student",

            targetRole:
              data.targetRole ||
              "Software Engineer",

            resumeScore:
              data.resumeScore || 0,
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  if (loading) {
    return (
      <div
        className="
          h-[380px]
          rounded-[32px]
          border border-white/10
          bg-white/[0.03]
          animate-pulse
        "
      />
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8 md:p-10
      "
    >
      {/* Glow Effects */}

      <div
        className="
          absolute
          -top-24
          -right-24
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
          h-72
          w-72
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

      <div className="relative z-10">

        {/* Status */}

        <div className="flex items-center gap-3">
          <div
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-green-400
              animate-pulse
            "
          />

          <span className="text-zinc-500 text-sm">
            AI Coach Active
          </span>
        </div>

        {/* Greeting */}

        <h1
          className="
            mt-5
            text-4xl
            md:text-5xl
            font-bold
          "
        >
          {greeting},
          <br />
          {profile.name} 👋
        </h1>

        <p
          className="
            mt-4
            max-w-xl
            text-lg
            text-zinc-400
          "
        >
          Keep building momentum.
          Every mock interview brings you
          one step closer to your dream role.
        </p>

        {/* Pills */}

        <div
          className="
            mt-8
            flex
            flex-wrap
            gap-3
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border border-white/10
              bg-white/5
              px-4 py-2
            "
          >
            <FaUserGraduate />

            <span>
              {profile.roleType}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border border-white/10
              bg-white/5
              px-4 py-2
            "
          >
            <FaBullseye />

            <span>
              {profile.targetRole}
            </span>
          </div>
        </div>

        {/* Bottom Section */}

        <div
          className="
            mt-10
            flex
            flex-wrap
            items-center
            gap-6
          "
        >
          {/* Resume Score */}

          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/5
              px-6 py-4
            "
          >
            <p className="text-sm text-zinc-500">
              Resume Score
            </p>

            <h3 className="text-3xl font-bold">
              {profile.resumeScore}
            </h3>
          </div>

          {/* CTA */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-6 py-4
              font-medium
              text-black
            "
          >
            Start Interview

            <FaArrowRight />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}