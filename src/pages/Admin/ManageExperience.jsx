import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGraphQL } from "../../api/requests";
import { GET_EXPERIENCES } from "../../api/queries";
import { ADD_EXPERIENCE_MUTATION } from "../../api/mutations";

const ManageExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const loadExperiences = async () => {
    try {
      const data = await fetchGraphQL(GET_EXPERIENCES);
      setExperiences(data.getExperiences);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleAddExperience = async e => {
    e.preventDefault();
    try {
      await fetchGraphQL(ADD_EXPERIENCE_MUTATION, {
        input: { title, company, startDate, endDate, description }
      });
      setTitle(""); setCompany(""); setStartDate(""); setEndDate(""); setDescription("");
      loadExperiences();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 bg-neutral-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">Manage Experiences</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleAddExperience} className="flex flex-col gap-3 w-full max-w-md mb-6 bg-white p-6 rounded shadow">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="input"/>
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} className="input"/>
        <input type="date" placeholder="Start Date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input"/>
        <input type="date" placeholder="End Date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input"/>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input"/>
        <button type="submit" className="btn">Add Experience</button>
      </form>

      <ul className="w-full max-w-md mb-6">
        {experiences.map(exp => (
          <li key={exp.id} className="mb-2 p-3 border rounded bg-white">{exp.title} at {exp.company}</li>
        ))}
      </ul>

      <Link to="/admin/AdminDashboard" className="btn mt-4">Back to Dashboard</Link>
    </div>
  );
};

export default ManageExperiences;
