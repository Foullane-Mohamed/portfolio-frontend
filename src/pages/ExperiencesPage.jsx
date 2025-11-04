import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { fetchGraphQL } from "../api/requests";
import { GET_EXPERIENCES } from "../api/queries";

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await fetchGraphQL(GET_EXPERIENCES);
        setExperiences(data.getExperiences);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadExperiences();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-neutral-300 border-t-neutral-700 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-neutral-600">Loading Experiences...</p>
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
            Career Journey
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
            Experiences
          </h1>
          <div className="w-20 h-1 bg-neutral-900 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-xl shadow border border-neutral-100 p-6 "
            >
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                {exp.title} — <span className="text-neutral-600">{exp.company}</span>
              </h2>
              <p className="text-sm text-neutral-500 mb-3">
                {exp.startDate} → {exp.endDate}
              </p>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExperiencesPage;
