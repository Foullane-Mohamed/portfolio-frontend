import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGraphQL } from "../../api/requests";
import { GET_PROJECTS } from "../../api/queries";
import { ADD_PROJECT_MUTATION } from "../../api/mutations";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState(null);

  const loadProjects = async () => {
    try {
      const data = await fetchGraphQL(GET_PROJECTS);
      setProjects(data.getProjects);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAddProject = async e => {
    e.preventDefault();
    try {
      await fetchGraphQL(ADD_PROJECT_MUTATION, {
        input: {
          title,
          description,
          technologies: technologies.split(",").map(t => t.trim()),
          link
        }
      });
      setTitle(""); setDescription(""); setTechnologies(""); setLink("");
      loadProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 bg-neutral-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">Manage Projects</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleAddProject} className="flex flex-col gap-3 w-full max-w-md mb-6 bg-white p-6 rounded shadow">
        <input placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} className="input"/>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input"/>
        <input placeholder="Technologies (comma separated)" value={technologies} onChange={e => setTechnologies(e.target.value)} className="input"/>
        <input placeholder="Project Link" value={link} onChange={e => setLink(e.target.value)} className="input"/>
        <button type="submit" className="btn">Add Project</button>
      </form>

      <ul className="w-full max-w-md mb-6">
        {projects.map(proj => (
          <li key={proj.id} className="mb-2 p-3 border rounded bg-white">{proj.title}</li>
        ))}
      </ul>

      <Link to="/admin/AdminDashboard" className="btn mt-4">Back to Dashboard</Link>
    </div>
  );
};

export default ManageProjects;
