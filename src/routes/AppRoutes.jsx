// App Routes

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ResumeAnalytics from "../pages/ResumeAnalytics";

import InterviewSetup from "../pages/InterviewSetup";
import InterviewResume from "../pages/InterviewResume";
import InterviewTechnical from "../pages/InterviewTechnical";
import InterviewHR from "../pages/InterviewHR";
import InterviewResults from "../pages/InterviewResults";

import ProtectedRoute from "../components/ProtectedRoutes";
import InterviewProtectedRoute from "../components/InterviewProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Resume Viewer */}

        <Route
          path="/dashboard/resume"
          element={
            <ProtectedRoute>
              <ResumeAnalytics />
            </ProtectedRoute>
          }
        />

        {/* Interview Setup */}

        <Route
          path="/interview/setup"
          element={
            <ProtectedRoute>
              <InterviewSetup />
            </ProtectedRoute>
          }
        />

        {/* Resume Round */}

        <Route
          path="/interview/resume"
          element={
            <ProtectedRoute>
              <InterviewProtectedRoute requiredStage="resume">
                <InterviewResume />
              </InterviewProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* Technical Round */}

        <Route
          path="/interview/technical"
          element={
            <ProtectedRoute>
              <InterviewProtectedRoute requiredStage="technical">
                <InterviewTechnical />
              </InterviewProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* HR Round */}

        <Route
          path="/interview/hr"
          element={
            <ProtectedRoute>
              <InterviewProtectedRoute requiredStage="hr">
                <InterviewHR />
              </InterviewProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* Results */}

        <Route
          path="/interview/results"
          element={
            <ProtectedRoute>
              <InterviewProtectedRoute requiredStage="completed">
                <InterviewResults />
              </InterviewProtectedRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
