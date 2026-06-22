import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Dashboard", href: "/dashboard" },
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
            to="/"
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
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
                className="
                  relative
                  px-5
                  py-2
                  rounded-full
                  text-sm
                  font-medium
                  transition-colors
                "
              >
                {active === item.name && (
                  <motion.div
                    layoutId="navbar-pill"
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
                    relative z-10
                    ${
                      active === item.name
                        ? "text-black"
                        : "text-zinc-400 hover:text-white"
                    }
                  `}
                >
                  {item.name}
                </span>
              </a>
            ))}

          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">

            <Link
              to="/login"
              className="
                text-zinc-300
                hover:text-white
                transition
              "
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
                px-5 py-2
                rounded-full
                bg-white
                text-black
                font-medium
                hover:scale-105
                transition
              "
            >
              Get Started
            </Link>

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
              <a
                key={item.name}
                href={item.href}
                className="
                  text-zinc-300
                  hover:text-white
                "
              >
                {item.name}
              </a>
            ))}

            <Link
              to="/login"
              className="text-zinc-300"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="
                bg-white
                text-black
                px-5
                py-2
                rounded-full
                text-center
                font-medium
              "
            >
              Get Started
            </Link>

          </div>
        </motion.div>
      </nav>
    </header>
  );
}