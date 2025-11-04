import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />

      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-neutral-600 text-lg md:text-xl mb-8">
            Explore my projects, skills, and professional experiences.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/projects"
              className="px-6 py-3 bg-neutral-900 text-white rounded-md font-medium "
            >
              View Projects
            </a>
            <a
              href="/skills"
              className="px-6 py-3 bg-neutral-100 text-neutral-900 rounded-md font-medium"
            >
              My Skills
            </a>
            <a
              href="/experiences"
              className="px-6 py-3 bg-neutral-100 text-neutral-900 rounded-md font-medium"
            >
              Experiences
            </a>
          </div>
        </div>
      </header>

      <section className="flex-1 max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">About Me</h2>
        <p className="text-neutral-600 leading-relaxed text-lg md:text-xl max-w-3xl mx-auto">
          Hi! I'm Mohamed Foullane, a full stack developer passionate about
          building robust and scalable web applications. I enjoy working across
          both frontend and backend technologies, solving complex problems, and
          creating seamless user experiences. I'm always eager to learn new
          tools and stay up-to-date with the latest trends in web development
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
