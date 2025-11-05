import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { fetchGraphQL } from "../api/requests";
import { GET_PROJECTS } from "../api/queries";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchGraphQL(GET_PROJECTS);
        setProjects(data.getProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-neutral-300 border-t-neutral-700 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-neutral-600">Loading Projects...</p>
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
            Portfolio
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-3">
            Projects
          </h1>
          <div className="w-20 h-1 bg-neutral-900 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="bg-white rounded-xl shadow border border-neutral-100 overflow-hidden transition"
            >
              <div className="p-7">
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  {project.title}
                </h2>

                <p className="text-neutral-600 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-neutral-50 text-neutral-600 text-xs font-medium rounded-md border border-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 "
                >
                  <span>View Project</span>
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
