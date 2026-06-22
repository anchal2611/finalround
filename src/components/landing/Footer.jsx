import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-20">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">
              FinalRound
            </h2>

            <p className="mt-4 text-zinc-400 max-w-md leading-relaxed">
              AI-powered interview preparation platform helping
              candidates practice smarter, improve faster,
              and perform confidently.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:items-end">
            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <a
                href="#features"
                className="hover:text-white transition"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="hover:text-white transition"
              >
                How It Works
              </a>

              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="hover:text-white transition"
              >
                Sign Up
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">

          <p className="text-zinc-500 text-sm">
            © 2026 FinalRound. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-zinc-400">

            <a
              href="#"
              className="hover:text-white transition text-lg"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              className="hover:text-white transition text-lg"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="hover:text-white transition text-lg"
            >
              <FaXTwitter />
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
}
