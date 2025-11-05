import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProjectsPage from "../pages/ProjectsPage";
import SkillsPage from "../pages/SkillsPage";
import ExperiencesPage from "../pages/ExperiencesPage";
import Login from "../pages/Admin/Login.jsx";

import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import ManageExperience from "../pages/Admin/ManageExperience.jsx";
import ManageProfile from "../pages/Admin/ManageProfile.jsx";
import ManageSkills from "../pages/Admin/ManageSkills.jsx";
import ManageProjects from "../pages/Admin/ManageProjects.jsx";



const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />

        <Route path="/admin/login" element={<Login />} />

        <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/ManageExperience" element={<ManageExperience />} />
        <Route path="/admin/ManageProfile" element={<ManageProfile />} />
        <Route path="/admin/ManageSkills" element={<ManageSkills />} />
        <Route path="/admin/ManageProjects" element={<ManageProjects />} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;
