import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/Logo.png";

function NavBar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Effetto scroll per navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20"
          : "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo section con animazioni */}
          <div className="flex items-center group">
            <Link to="/" className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <img
                src={logo}
                alt="Logo"
                className="relative h-12 w-auto transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 filter brightness-110"
              />
            </Link>

            {/* Brand name */}
            <div className="ml-4 hidden sm:block">
              <h1
                className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500 ${
                  scrolled
                    ? "from-gray-800 to-gray-600"
                    : "from-white to-gray-200"
                }`}
              >
                SmartBool Store
              </h1>
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-300"
              } ${location.pathname === "/" ? "text-blue-500" : ""}`}
            >
              <span className="relative z-10">Home</span>

              {/* Hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>

              {/* Active indicator */}
              {location.pathname === "/" && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
