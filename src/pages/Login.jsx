import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

import Navbar from "../components/landing/Navbar";
import Background from "../components/Background";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      await googleLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Background />

      <div className="relative z-10">
        <Navbar />

        <div className="min-h-screen flex items-center justify-center px-6 pt-32 pb-10">

          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Side */}
            <div className="hidden lg:block">
              <div className="max-w-xl">

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
                  Welcome Back
                </span>

                <h1 className="mt-8 text-6xl font-bold leading-tight">
                  Continue
                  <br />
                  Your Journey
                  <br />
                  To The
                  <span className="text-zinc-500">
                    {" "}Final Round.
                  </span>
                </h1>

                <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
                  Practice interviews, receive AI-powered
                  feedback, analyze performance and prepare
                  smarter for your next opportunity.
                </p>

                <div className="mt-12 flex gap-10">
                  <div>
                    <h3 className="text-4xl font-bold">
                      AI
                    </h3>
                    <p className="text-zinc-500">
                      Interview Coach
                    </p>
                  </div>

                  <div>
                    <h3 className="text-4xl font-bold">
                      24/7
                    </h3>
                    <p className="text-zinc-500">
                      Practice Sessions
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Login Card */}
            <div className="flex justify-center">

              <div
                className="
                  w-full
                  max-w-md
                  rounded-[32px]
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-2xl
                  p-8
                  shadow-[0_0_50px_rgba(255,255,255,0.05)]
                "
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold">
                    Sign In
                  </h2>

                  <p className="mt-3 text-zinc-500">
                    Welcome back to FinalRound
                  </p>
                </div>

                {error && (
                  <div
                    className="
                      mt-6
                      rounded-xl
                      border
                      border-red-500/20
                      bg-red-500/10
                      p-3
                      text-sm
                      text-red-300
                    "
                  >
                    {error}
                  </div>
                )}

                {/* Google */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="
                    mt-8
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    border border-white/10
                    bg-white/5
                    py-3
                    hover:bg-white/10
                    transition-all
                  "
                >
                  <FaGoogle />
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="px-4 text-zinc-500 text-sm">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Email */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Email
                    </label>

                    <div className="relative mt-2">
                      <FaEnvelope
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-zinc-500
                        "
                      />

                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                        placeholder="you@example.com"
                        className="
                          w-full
                          rounded-xl
                          border border-white/10
                          bg-white/5
                          py-3
                          pl-12
                          pr-4
                          outline-none
                          focus:border-white/30
                        "
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Password
                    </label>

                    <div className="relative mt-2">
                      <FaLock
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-zinc-500
                        "
                      />

                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        placeholder="••••••••"
                        className="
                          w-full
                          rounded-xl
                          border border-white/10
                          bg-white/5
                          py-3
                          pl-12
                          pr-4
                          outline-none
                          focus:border-white/30
                        "
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="
                        text-sm
                        text-zinc-400
                        hover:text-white
                        transition
                      "
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      rounded-xl
                      bg-white
                      text-black
                      py-3
                      font-semibold
                      hover:scale-[1.02]
                      transition-all
                    "
                  >
                    {loading
                      ? "Signing In..."
                      : "Sign In"}
                  </button>
                </form>

                <p className="mt-8 text-center text-zinc-500">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-white hover:text-zinc-300"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}