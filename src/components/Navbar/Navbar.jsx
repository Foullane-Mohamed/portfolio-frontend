import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white ">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-neutral-900">
          MyPortfolio
        </Link>

        <button
          className="md:hidden text-neutral-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-2xl">{isOpen ? "✖" : "☰"}</span>
        </button>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:gap-6`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-neutral-700 hover:text-neutral-900 transition ${
                isActive ? "font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-neutral-700 hover:text-neutral-900 transition ${
                isActive ? "font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Projects
          </NavLink>

          <NavLink
            to="/skills"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-neutral-700 hover:text-neutral-900 transition ${
                isActive ? "font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Skills
          </NavLink>

          <NavLink
            to="/experiences"
            className={({ isActive }) =>
              `block py-2 md:py-0 text-neutral-700 hover:text-neutral-900 transition ${
                isActive ? "font-semibold" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Experiences
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
