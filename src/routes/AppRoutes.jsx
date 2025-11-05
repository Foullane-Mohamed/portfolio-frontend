import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import ProjectsPage from "../pages/ProjectsPage.jsx";
import SkillsPage from "../pages/SkillsPage.jsx";
import ExperiencesPage from "../pages/ExperiencesPage.jsx";

import Login from "../pages/Admin/Login.jsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import ManageExperiences from "../pages/Admin/ManageExperiences.jsx";
import ManageProjects from "../pages/Admin/ManageProjects.jsx";
import ManageSkills from "../pages/Admin/ManageSkills.jsx";
import ManageProfile from "../pages/Admin/ManageProfile.jsx";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  const sessionToken = sessionStorage.getItem("jwtToken");
  if (!token && !sessionToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/experiences" element={<ExperiencesPage />} />
      <Route path="/admin/login" element={<Login />} />

      <Route
        path="/admin/AdminDashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ManageExperiences"
        element={
          <ProtectedRoute>
            <ManageExperiences />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ManageProjects"
        element={
          <ProtectedRoute>
            <ManageProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ManageSkills"
        element={
          <ProtectedRoute>
            <ManageSkills />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/ManageProfile"
        element={
          <ProtectedRoute>
            <ManageProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
