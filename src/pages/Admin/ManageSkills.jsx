import { useEffect, useState } from "react";
import { fetchGraphQL } from "../../api/requests.js";
import {
  ADD_COMPETENCE,
  UPDATE_COMPETENCE,
  DELETE_COMPETENCE,
} from "../../api/mutations.js";
import { GET_COMPETENCES } from "../../api/queries.js";
import { Link } from "react-router-dom";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    name: "",
    level: "Beginner",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const loadSkills = async () => {
    try {
      const data = await fetchGraphQL(GET_COMPETENCES);
      setSkills(data?.getCompetences || []);
    } catch (error) {
      console.error("Error loading skills:", error);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetchGraphQL(UPDATE_COMPETENCE, { id: editingId, input: form });
        setEditingId(null);
      } else {
        await fetchGraphQL(ADD_COMPETENCE, { input: form });
      }
      setForm({ name: "", level: "Beginner", description: "" });
      loadSkills();
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  const handleEdit = (skill) => {
    setForm({
      name: skill.name,
      level: skill.level,
      description: skill.description || "",
    });
    setEditingId(skill.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await fetchGraphQL(DELETE_COMPETENCE, { id });
        loadSkills();
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({ name: "", level: "Beginner", description: "" });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-16">
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
              Manage Skills
            </h1>
            <div className="w-20 h-1 bg-neutral-900 mx-auto"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-neutral-100 rounded-xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">
            {editingId ? "Edit Skill" : "Add New Skill"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Skill Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., JavaScript, React, GraphQL"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Level *
              </label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your experience with this skill..."
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              rows="3"
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition"
            >
              {editingId ? "Update Skill" : "Add Skill"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2.5 bg-neutral-100 text-neutral-900 rounded-lg font-medium hover:bg-neutral-200 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white border border-neutral-100 rounded-xl shadow p-6"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {skill.name}
                </h3>
                <p className="text-sm text-neutral-500 mb-3">Level: {skill.level}</p>
                {skill.description && (
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="flex-1 px-3 py-2 bg-neutral-100 text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
