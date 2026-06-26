import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ResumeViewer() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <p className="text-white text-lg">
          Loading Resume...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen w-screen bg-[#09090b]">
      <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-white">
          Resume Viewer
        </h1>

        <button
          onClick={() => window.history.back()}
          className="
            px-4
            py-2
            rounded-lg
            bg-cyan-500
            text-black
            font-medium
            hover:bg-cyan-400
            transition
          "
        >
          Back
        </button>
      </div>

      <iframe
        title="Resume"
        src={`/api/view-resume?uid=${user.uid}`}
        className="w-full h-[calc(100vh-64px)] bg-white"
      />
    </div>
  );
}