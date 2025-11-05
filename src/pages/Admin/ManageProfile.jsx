import { useState, useEffect } from "react";
import { fetchGraphQL } from "../../api/requests";
import { GET_PROFILE } from "../../api/queries";
import { UPDATE_PROFILE, ADD_PROFILE } from "../../api/mutations";
import { Link } from "react-router-dom";

const ManageProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    email: "",
    socialLinks: "",
  });
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadProfile = async () => {
    try {
      const data = await fetchGraphQL(GET_PROFILE);
      if (data?.getProfil) {
        const profileData = data.getProfil;
        setProfile({
          name: profileData.name || "",
          bio: profileData.bio || "",
          email: profileData.email || "",
          socialLinks: Array.isArray(profileData.socialLinks)
            ? profileData.socialLinks.join(", ")
            : profileData.socialLinks || "",
        });
        setProfileExists(true);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const socialLinksArray = profile.socialLinks
        .split(",")
        .map((link) => link.trim())
        .filter((link) => link !== "");

      const input = {
        name: profile.name,
        bio: profile.bio,
        email: profile.email,
        socialLinks: socialLinksArray,
      };

      if (profileExists) {
        await fetchGraphQL(UPDATE_PROFILE, { input });
        setMessage("Profile updated successfully!");
      } else {
        await fetchGraphQL(ADD_PROFILE, { input });
        setMessage("Profile created successfully!");
        setProfileExists(true);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Error saving profile: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-neutral-300 border-t-neutral-700 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-neutral-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <Link
            to="/admin/AdminDashboard"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition"
          >

            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>

          <div className="text-center">
            <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
              Admin Panel
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
              Manage Profile
            </h1>
            <div className="w-20 h-1 bg-neutral-900 mx-auto"></div>
          </div>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.includes("Error")
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-green-50 border-green-200 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-neutral-100 rounded-xl shadow p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Name *
              </label>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Bio *
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                rows="6"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Social Links
              </label>
              <textarea
                name="socialLinks"
                value={profile.socialLinks}
                onChange={handleChange}
                placeholder="https://github.com/username, https://linkedin.com/in/username"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                rows="3"
              ></textarea>
              <p className="text-xs text-neutral-500 mt-1">
                Enter multiple links separated by commas
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition"
          >
            {profileExists ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;
