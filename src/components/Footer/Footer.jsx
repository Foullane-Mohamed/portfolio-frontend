import React from "react";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 text-neutral-700 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-neutral-900 transition">Twitter</a>
          <a href="#" className="hover:text-neutral-900 transition">LinkedIn</a>
          <a href="#" className="hover:text-neutral-900 transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
