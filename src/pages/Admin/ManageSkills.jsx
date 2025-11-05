import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGraphQL } from "../../api/requests";
import { GET_COMPETENCES } from "../../api/queries";
import { ADD_COMPETENCE_MUTATION } from "../../api/mutations";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const loadSkills = async () => {
    try {
      const data = await fetchGraphQL(GET_COMPETENCES);
      setSkills(data.getCompetences);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleAddSkill = async e => {
    e.preventDefault();
    try {
      await fetchGraphQL(ADD_COMPETENCE_MUTATION, {
        input: { name, level, description }
      });
      setName(""); setLevel(""); setDescription("");
      loadSkills();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen px-4 py-16 bg-neutral-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">Manage Skills</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleAddSkill} className="flex flex-col gap-3 w-full max-w-md mb-6 bg-white p-6 rounded shadow">
        <input placeholder="Skill Name" value={name} onChange={e => setName(e.target.value)} className="input"/>
        <input placeholder="Level" value={level} onChange={e => setLevel(e.target.value)} className="input"/>
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input"/>
        <button type="submit" className="btn">Add Skill</button>
      </form>

      <ul className="w-full max-w-md mb-6">
        {skills.map(skill => (
          <li key={skill.id} className="mb-2 p-3 border rounded bg-white">{skill.name} - {skill.level}</li>
        ))}
      </ul>

      <Link to="/admin/AdminDashboard" className="btn mt-4">Back to Dashboard</Link>
    </div>
  );
};

export default ManageSkills;
