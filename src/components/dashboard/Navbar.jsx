import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardNavbar() {
  const { user } = useAuth();

  const [active, setActive] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "#",
    },
    {
      name: "Interviews",
      href: "#",
    },
    {
      name: "Analytics",
      href: "#",
    },
    {
      name: "Resume",
      href: "#",
    },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className="
          w-full
          max-w-6xl
          rounded-full
          border border-white/10
          bg-black/60
          backdrop-blur-xl
          shadow-[0_0_30px_rgba(255,255,255,0.05)]
          px-4 py-3
        "
      >
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="
              text-2xl
              font-bold
              text-white
              tracking-tight
            "
          >
            FinalRound
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 relative">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className="
                  relative
                  px-5
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                {active === item.name && (
                  <motion.div
                    layoutId="dashboard-pill"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-white
                    "
                  />
                )}

                <span
                  className={`
                    relative z-10 transition-colors
                    ${
                      active === item.name
                        ? "text-black"
                        : "text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">

            <div
              className="
                flex
                items-center
                gap-3
                px-3
                py-1.5
                rounded-full
                border border-white/10
                bg-white/5
              "
            >
              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-gradient-to-br
                  from-violet-500
                  to-cyan-500
                "
              />

              <div className="text-left">
                <p className="text-sm text-white">
                  {user?.displayName ||
                    user?.email?.split("@")[0]}
                </p>

                <p className="text-[11px] text-zinc-500">
                  Candidate
                </p>
              </div>
            </div>

          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: menuOpen ? "auto" : 0,
            opacity: menuOpen ? 1 : 0,
          }}
          className="
            md:hidden
            overflow-hidden
          "
        >
          <div className="flex flex-col gap-4 pt-4">

            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActive(item.name);
                  setMenuOpen(false);
                }}
                className="
                  text-left
                  text-zinc-300
                  hover:text-white
                "
              >
                {item.name}
              </button>
            ))}

            <div
              className="
                pt-4
                border-t
                border-white/10
              "
            >
              <p className="text-sm text-white">
                {user?.displayName ||
                  user?.email?.split("@")[0]}
              </p>

              <p className="text-xs text-zinc-500">
                Candidate
              </p>
            </div>

          </div>
        </motion.div>

      </nav>
    </header>
  );
}