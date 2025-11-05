import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-2">
            Dashboard
          </h1>
          <div className="w-20 h-1 bg-neutral-900 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <Link 
            to="/admin/ManageProfile" 
            className="group bg-white border border-neutral-100 rounded-xl shadow p-8 "
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Manage Profile</h2>
            <p className="text-neutral-600 text-sm">Update your personal information and bio</p>
          </Link>

          <Link 
            to="/admin/ManageExperiences" 
            className="group bg-white border border-neutral-100 rounded-xl shadow p-8 "
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Manage Experiences</h2>
            <p className="text-neutral-600 text-sm">Add and edit your work experiences</p>
          </Link>

          <Link 
            to="/admin/ManageProjects" 
            className="group bg-white border border-neutral-100 rounded-xl shadow p-8 "
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Manage Projects</h2>
            <p className="text-neutral-600 text-sm">Showcase your portfolio projects</p>
          </Link>

          <Link 
            to="/admin/ManageSkills" 
            className="group bg-white border border-neutral-100 rounded-xl shadow p-8 "
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              
            </div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Manage Skills</h2>
            <p className="text-neutral-600 text-sm">List your competencies and expertise</p>
          </Link>
        </div>

        <div className="bg-white border border-neutral-100 rounded-xl shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">Log out : </h3>
          
            </div>
            <button
              onClick={logout}
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
