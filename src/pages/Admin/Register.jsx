import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchGraphQL } from "../../api/requests";
import { REGISTER_MUTATION } from "../../api/queries";


const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await fetchGraphQL(REGISTER_MUTATION, form);
      setSuccess(true);
      setTimeout(() => navigate("/admin/login"), 1500);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow border border-neutral-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-neutral-900 text-center mb-6">
          Admin Register
        </h1>

        {error && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded mb-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-600 text-sm bg-green-50 border border-green-200 p-2 rounded mb-4">
            Registration successful! Redirecting to login...
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-2 rounded-md font-medium hover:bg-neutral-800 transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-neutral-900 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
