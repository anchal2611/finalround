import { useAuth } from "../context/AuthContext";

export default function ResumeViewer() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="h-screen bg-black">
      <iframe
        title="Resume"
        src={`/api/view-resume?uid=${user.uid}`}
        className="w-full h-full border-0"
      />
    </div>
  );
}