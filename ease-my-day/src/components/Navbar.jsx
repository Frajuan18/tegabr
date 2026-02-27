// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Features", href: "#" },
    { name: "Services", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "How it works", href: "#" },
    { name: "Contact us", href: "#" },
  ];

  return (
    <nav className="bg-[#F2F2F7] shadow-[0_4px_12px_rgba(0,0,0,0.05)] font-outfit sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* logo / brand */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">
              Tegbar
            </a>
          </div>

          {/* center links */}
          <div className="hidden md:flex md:space-x-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#6B6B70] hover:text-[#1C1C1E] hover:bg-[#E5E5EA] px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* right side buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-semibold text-[#1C1C1E] bg-white rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1C1C1E] rounded-2xl shadow-[0_8px_0_#000000,0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_8px_16px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200"
            >
              Sign up
            </Link>
          </div>

          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-[#6B6B70] hover:text-[#1C1C1E] p-2 rounded-2xl hover:bg-white hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)] focus:outline-none transition-all duration-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F2F2F7] border-t border-[#E5E5EA] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-[#6B6B70] hover:text-[#1C1C1E] hover:bg-[#E5E5EA] px-4 py-3 rounded-2xl text-base font-medium transition-all duration-200 hover:shadow-[0_4px_8px_rgba(0,0,0,0.05)]"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 space-y-2">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 text-[#1C1C1E] bg-white font-semibold rounded-2xl shadow-[0_4px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center px-4 py-3 text-white font-semibold rounded-2xl bg-[#1C1C1E] shadow-[0_8px_0_#000000,0_4px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_#000000,0_8px_16px_rgba(0,0,0,0.3)] hover:translate-y-1 transition-all duration-200"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}