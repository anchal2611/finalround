//App Routes

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "../components/ProtectedRoutes";
import Dashboard from "../pages/Dashboard";
import ResumeViewer from "../pages/ResumeViewer";
import InterviewSetup from "../pages/InterviewSetup";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/setup"
          element={
            <ProtectedRoute>
              <InterviewSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/resume"
          element={
            <ProtectedRoute>
              <ResumeViewer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/resume"
          element={
            <ProtectedRoute>
              <InterviewResume />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}