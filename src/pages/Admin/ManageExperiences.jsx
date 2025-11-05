import { useEffect, useState } from "react";
import { fetchGraphQL } from "../../api/requests.js";
import {
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "../../api/mutations.js";
import { GET_EXPERIENCES } from "../../api/queries.js";
import { Link } from "react-router-dom";

const ManageExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  const loadExperiences = async () => {
    try {
      const data = await fetchGraphQL(GET_EXPERIENCES);
      setExperiences(data?.getExperiences || []);
    } catch (error) {
      console.error("Error loading experiences:", error);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetchGraphQL(UPDATE_EXPERIENCE, { id: editingId, input: form });
        setEditingId(null);
      } else {
        await fetchGraphQL(ADD_EXPERIENCE, { input: form });
      }
      setForm({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      loadExperiences();
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const handleEdit = (exp) => {
    setForm({
      title: exp.title,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description || "",
    });
    setEditingId(exp.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await fetchGraphQL(DELETE_EXPERIENCE, { id });
        loadExperiences();
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
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
              Manage Experiences
            </h1>
            <div className="w-20 h-1 bg-neutral-900 mx-auto"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-neutral-100 rounded-xl shadow p-8 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">
            {editingId ? "Edit Experience" : "Add New Experience"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Job Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Frontend Developer"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Company *
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g., TechCorp"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                required
              />
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
              placeholder="Describe your role and responsibilities..."
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
              rows="4"
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition"
            >
              {editingId ? "Update Experience" : "Add Experience"}
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

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-neutral-100 rounded-xl shadow p-6"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-neutral-600 mb-2">{exp.company}</p>
                  <p className="text-sm text-neutral-500 mb-3">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="px-4 py-2 bg-neutral-100 text-neutral-900 rounded-lg text-sm font-medium hover:bg-neutral-200 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageExperiences;
