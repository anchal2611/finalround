import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function InterviewHeader({
  stage,
  totalStages = 3,
  title,
  description,
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between gap-6">

        {/* Left Side */}
        <div>

          <p className="text-violet-400 font-medium">
            Stage {stage} of {totalStages}
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            {title}
          </h1>

          <p className="mt-4 max-w-xl text-zinc-400 leading-7">
            {description}
          </p>

        </div>

        {/* Exit Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-3
            transition
            hover:bg-white/10
          "
        >
          Exit Interview
        </button>

      </div>
    </motion.div>
  );
}