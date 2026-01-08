import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/student/Dashboard";
import SurveyPage from "./pages/student/SurveyPage";
import StudentFeedback from "./pages/student/StudentFeedback";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateSurvey from "./pages/admin/CreateSurvey";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";

export default function App() {
  return (
    <Routes>
      {/* ---------- PUBLIC ---------- */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ---------- ADMIN LOGIN ---------- */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ---------- STUDENT ---------- */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="survey/:id" element={<SurveyPage />} />
        <Route path="feedback" element={<StudentFeedback />} />
      </Route>

      {/* ---------- ADMIN ---------- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="create" element={<CreateSurvey />} />
      </Route>

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
