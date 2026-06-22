import {
  FaFileUpload,
  FaBrain,
  FaMicrophoneAlt,
  FaChartLine,
  FaTrophy,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaFileUpload />,
    title: "Resume Upload",
    description:
      "Upload your resume and select the role you're preparing for.",
    color: "text-violet-400",
    glow: "bg-violet-500/20",
  },
  {
    icon: <FaBrain />,
    title: "Profile Analysis",
    description:
      "AI analyzes your profile and generates personalized interview paths.",
    color: "text-cyan-400",
    glow: "bg-cyan-500/20",
  },
  {
    icon: <FaMicrophoneAlt />,
    title: "AI Interview",
    description:
      "Practice realistic technical and behavioral interview scenarios.",
    color: "text-emerald-400",
    glow: "bg-emerald-500/20",
  },
  {
    icon: <FaChartLine />,
    title: "Skill Insights",
    description:
      "Get detailed analytics on communication, confidence, and performance.",
    color: "text-orange-400",
    glow: "bg-orange-500/20",
  },
  {
    icon: <FaTrophy />,
    title: "Offer Ready",
    description:
      "Track improvements and walk into interviews with confidence.",
    color: "text-yellow-400",
    glow: "bg-yellow-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-violet-600/10 blur-[180px]" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
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
            How It Works
          </span>

          <h2 className="mt-8 text-4xl md:text-6xl font-bold">
            Your Journey To
            <br />
            <span className="text-zinc-400">
              Interview Success
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-500">
            A streamlined AI-powered workflow that helps you
            prepare smarter, improve faster, and perform better.
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">

          {/* Desktop Connecting Line */}
          <div
            className="
              hidden lg:block
              absolute
              top-10
              left-[10%]
              right-[10%]
              h-[2px]
              bg-gradient-to-r
              from-violet-500/10
              via-violet-400/50
              to-violet-500/10
            "
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="
                  group
                  relative
                  flex
                  flex-col
                  items-center
                  text-center
                "
              >
                {/* Icon */}
                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-center
                    w-20
                    h-20
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    group-hover:scale-110
                  "
                >
                  <div
                    className={`
                      absolute
                      inset-0
                      rounded-full
                      opacity-0
                      group-hover:opacity-100
                      blur-xl
                      transition-all
                      duration-500
                      ${step.glow}
                    `}
                  />

                  <span
                    className={`
                      relative
                      z-10
                      text-3xl
                      ${step.color}
                    `}
                  >
                    {step.icon}
                  </span>
                </div>

                {/* Step Label */}
                <span
                  className="
                    mt-6
                    text-xs
                    tracking-[0.3em]
                    uppercase
                    text-zinc-500
                  "
                >
                  Step {index + 1}
                </span>

                {/* Title */}
                <h3 className="mt-3 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-zinc-500 text-sm leading-relaxed max-w-[220px]">
                  {step.description}
                </p>

                {/* Mobile Connector */}
                {index !== steps.length - 1 && (
                  <div
                    className="
                      lg:hidden
                      mt-6
                      w-[2px]
                      h-12
                      bg-gradient-to-b
                      from-violet-500/40
                      to-transparent
                    "
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}