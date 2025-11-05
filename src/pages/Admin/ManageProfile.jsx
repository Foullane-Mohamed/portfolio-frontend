import { Link } from "react-router-dom";

const ManageProfile = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 bg-neutral-50">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">Manage Profile</h1>

      <form className="flex flex-col gap-3 w-full max-w-md mb-6 bg-white p-6 rounded shadow">
        <input placeholder="Full Name" className="input"/>
        <input placeholder="Email" className="input"/>
        <textarea placeholder="Bio" className="input"/>
        <button type="submit" className="btn">Update Profile</button>
      </form>

      <Link to="/admin/AdminDashboard" className="btn mt-4">Back to Dashboard</Link>
    </div>
  );
};

export default ManageProfile;
