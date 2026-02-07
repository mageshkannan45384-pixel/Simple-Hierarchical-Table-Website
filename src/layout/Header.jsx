import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b dark:border-gray-700 flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Marketing Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 border rounded dark:border-gray-600 dark:text-gray-200"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <span className="text-sm font-medium uppercase text-gray-600 dark:text-gray-300">
          {user?.role}
        </span>

        <button
          onClick={() => dispatch(logout())}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
