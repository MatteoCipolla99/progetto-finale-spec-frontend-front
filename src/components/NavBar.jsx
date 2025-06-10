import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function NavBar() {
  return (
    <nav className="flex items-center justify-between bg-gray-900 text-white px-6 py-3 shadow">
      {/* Logo a sinistra */}
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt={logo} className="h-10 w-auto" />
        </Link>
      </div>

      {/* Link centrali */}
      <ul className="flex gap-8 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
