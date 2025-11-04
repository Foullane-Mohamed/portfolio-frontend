import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { fetchGraphQL } from "../api/requests";
import { GET_COMPETENCES } from "../api/queries";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchGraphQL(GET_COMPETENCES);
        setSkills(data.getCompetences);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-neutral-300 border-t-neutral-700 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-neutral-600">Loading Skills...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50 p-6">
        <div className="bg-white border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3">
            My Skills
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
            Skills
          </h1>
          <div className="w-20 h-1 bg-neutral-900 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-xl shadow border border-neutral-100 p-6"
            >
              <h2 className="text-lg font-semibold text-neutral-900 mb-2">
                {skill.name}
              </h2>
              <p className="text-sm text-neutral-500 mb-3">Level: {skill.level}</p>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SkillsPage;
