import {
  FaRobot,
  FaFileAlt,
  FaChartLine,
  FaComments,
  FaCode,
  FaBullseye,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Mock Interviews",
    description:
      "Practice realistic interview scenarios generated dynamically for your target role.",
    color: "from-violet-500/20 to-purple-500/20",
    glow: "shadow-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: <FaFileAlt />,
    title: "Resume Analysis",
    description:
      "Receive actionable resume insights and improve your chances before applying.",
    color: "from-cyan-500/20 to-sky-500/20",
    glow: "shadow-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: <FaComments />,
    title: "Behavioral Rounds",
    description:
      "Master HR and communication-focused interviews with detailed AI feedback.",
    color: "from-pink-500/20 to-rose-500/20",
    glow: "shadow-pink-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: <FaCode />,
    title: "Technical Interviews",
    description:
      "Prepare for coding and technical discussions with role-specific assessments.",
    color: "from-emerald-500/20 to-green-500/20",
    glow: "shadow-emerald-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: <FaChartLine />,
    title: "Performance Analytics",
    description:
      "Track confidence, communication, strengths, weaknesses, and growth trends.",
    color: "from-orange-500/20 to-amber-500/20",
    glow: "shadow-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: <FaBullseye />,
    title: "Personalized Feedback",
    description:
      "Get tailored recommendations that help you improve after every session.",
    color: "from-blue-500/20 to-indigo-500/20",
    glow: "shadow-blue-500/20",
    iconColor: "text-blue-400",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-20 left-20 h-72 w-72 bg-violet-600/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-20 right-20 h-72 w-72 bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="
              px-4 py-2
              rounded-full
              border border-white/10
              bg-white/5
              backdrop-blur-md
              text-sm
              text-zinc-400
            "
          >
            Platform Features
          </span>

          <h2 className="mt-8 text-4xl md:text-6xl font-bold">
            Everything You Need
            <br />
            <span className="text-zinc-400">
              To Ace Interviews
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-500">
            AI-powered preparation, intelligent feedback,
            performance tracking, and interview simulations
            designed to help you land your next opportunity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-xl
                p-8
                transition-all
                duration-500
                hover:-translate-y-3
                hover:border-white/20
              "
            >
              {/* Glow Layer */}
              <div
                className={`
                  absolute inset-0
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                  bg-gradient-to-br
                  ${feature.color}
                `}
              />

              {/* Border Glow */}
              <div
                className="
                  absolute inset-0
                  rounded-3xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                  bg-gradient-to-r
                  from-white/10
                  via-white/20
                  to-white/10
                "
              />

              {/* Content */}
              <div className="relative z-10 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`
                      w-16 h-16
                      rounded-2xl
                      flex items-center justify-center
                      text-2xl
                      bg-white/5
                      backdrop-blur-md
                      border border-white/10
                      ${feature.iconColor}
                      ${feature.glow}
                      shadow-xl
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:rotate-3
                    `}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}