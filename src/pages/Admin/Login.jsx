import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGraphQL } from "../../api/requests.js";
import { LOGIN } from "../../api/mutations.js";
import { AuthContext } from "../../context/AuthContext.jsx";

const Login = () => {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("jwtToken");
    if (token || sessionToken) {
      navigate("/admin/AdminDashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await fetchGraphQL(LOGIN, { username, password });
      if (data?.login?.token) {
        login(data.login.token);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError(err.message || "Error logging in");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow border border-neutral-100 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">Admin Login</h2>
          <p className="text-neutral-600 text-sm">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-neutral-900 text-white py-3 rounded-lg font-medium hover:bg-neutral-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
