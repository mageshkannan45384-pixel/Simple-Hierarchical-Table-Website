import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded text-sm ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-56 bg-white border-r p-4">
      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          Dashboard
        </NavLink>

        {isAdmin && (
          <NavLink to="/campaigns" className={linkClass}>
            Campaigns
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
