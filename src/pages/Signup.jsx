import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaGoogle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

import Navbar from "../components/landing/Navbar";
import Background from "../components/Background";

import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, googleLogin, user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleType: "Student",
    targetRole: "Software Engineer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await signup(
        formData.email,
        formData.password,
        {
          name: formData.name,
          roleType: formData.roleType,
          targetRole: formData.targetRole,
        }
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");

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
              <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-zinc-400">
                Join FinalRound
              </span>

              <h1 className="mt-8 text-6xl font-bold leading-tight">
                Start
                <br />
                Practicing
                <br />
                Smarter.
              </h1>

              <p className="mt-6 text-zinc-400 text-lg">
                Personalized AI interviews, instant feedback,
                performance analytics and preparation tailored
                to your dream role.
              </p>

              <div className="mt-12 flex gap-10">
                <div>
                  <h3 className="text-4xl font-bold">AI</h3>
                  <p className="text-zinc-500">
                    Interview Coach
                  </p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold">24/7</h3>
                  <p className="text-zinc-500">
                    Practice Anytime
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="flex justify-center">
              <div
                className="
                  w-full
                  max-w-lg
                  rounded-[32px]
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-2xl
                  p-8
                "
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold">
                    Create Account
                  </h2>

                  <p className="mt-3 text-zinc-500">
                    Begin your interview preparation journey
                  </p>
                </div>

                {error && (
                  <div className="mt-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGoogleSignup}
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
                    transition
                  "
                >
                  <FaGoogle />
                  Continue with Google
                </button>

                <div className="my-8 flex items-center">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="px-4 text-zinc-500 text-sm">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <form
                  onSubmit={handleSignup}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Full Name
                    </label>

                    <div className="relative mt-2">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4"
                        placeholder="Anchal Gupta"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Email
                    </label>

                    <div className="relative mt-2">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Password
                    </label>

                    <div className="relative mt-2">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  {/* Student/Professional */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      I Am
                    </label>

                    <select
                      name="roleType"
                      value={formData.roleType}
                      onChange={handleChange}
                      className="
                        mt-2
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-white/5
                        py-3 px-4
                      "
                    >
                      <option>Student</option>
                      <option>Professional</option>
                    </select>
                  </div>

                  {/* Target Role */}
                  <div>
                    <label className="text-sm text-zinc-400">
                      Target Role
                    </label>

                    <select
                      name="targetRole"
                      value={formData.targetRole}
                      onChange={handleChange}
                      className="
                        mt-2
                        w-full
                        rounded-xl
                        border border-white/10
                        bg-white/5
                        py-3 px-4
                      "
                    >
                      <option>Software Engineer</option>
                      <option>Frontend Developer</option>
                      <option>Backend Developer</option>
                      <option>Full Stack Developer</option>
                      <option>Product Manager</option>
                      <option>Data Analyst</option>
                      <option>UI/UX Designer</option>
                    </select>
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
                      transition
                    "
                  >
                    {loading
                      ? "Creating Account..."
                      : "Create Account"}
                  </button>
                </form>

                <p className="mt-8 text-center text-zinc-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-white"
                  >
                    Sign In
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