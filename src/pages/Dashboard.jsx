import DashboardNavbar from "../components/dashboard/Navbar";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsGrid from "../components/dashboard/StatsGrid";
import StartInterview from "../components/dashboard/StartInterview";
import ResumeSummaryCard from "../components/dashboard/ResumeSummaryCard";
import InsightsCard from "../components/dashboard/InsightsCard";
import RecentSessions from "../components/dashboard/RecentSessions";

import DashboardOrb from "../components/DashboardOrb";
import SplashCursor from "../components/SplashCursor";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Cursor Effect */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE
        COLOR="#A855F7"
      />

      {/* Navbar */}
      <DashboardNavbar />

      {/* Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-16">

        {/* Hero */}
        <section className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <WelcomeCard />

          <div className="hidden lg:flex justify-center">
            <DashboardOrb />
          </div>
        </section>

        {/* Stats */}
        <section className="mt-10">
          <StatsGrid />
        </section>

        {/* Start Interview */}
        <section className="mt-10">
          <StartInterview />
        </section>

        {/* Resume + AI Insights */}
        <section className="grid lg:grid-cols-2 gap-8 mt-10">
          <ResumeSummaryCard />
          <InsightsCard />
        </section>

        {/* Recent Sessions */}
        <section className="mt-10">
          <RecentSessions />
        </section>
      </main>
    </div>
  );
}
