import { Link } from "react-router-dom";

const AdminDashboard = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4 py-16">
    <h1 className="text-3xl font-bold mb-8 text-neutral-900">Admin Dashboard</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl w-full">
      <Link to="/admin/ManageProfile" className="btn">Manage Profile</Link>
      <Link to="/admin/ManageProjects" className="btn">Manage Projects</Link>
      <Link to="/admin/ManageSkills" className="btn">Manage Skills</Link>
      <Link to="/admin/ManageExperience" className="btn">Manage Experiences</Link>
    </div>
  </div>
);

export default AdminDashboard;
