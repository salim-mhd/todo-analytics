import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  // Function to check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      {/* Logo */}
      <div className="font-extrabold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400 cursor-pointer">
        MyApp 🚀
      </div>

      {/* Links */}
      <div className="flex space-x-6 items-center">
        <Link
          to="/dashboard"
          className={`transition duration-200 hover:text-yellow-300 ${
            isActive("/dashboard")
              ? "border-b-2 border-yellow-400 pb-1 font-semibold"
              : "pb-1"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/analytics"
          className={`transition duration-200 hover:text-yellow-300 ${
            isActive("/analytics")
              ? "border-b-2 border-yellow-400 pb-1 font-semibold"
              : "pb-1"
          }`}
        >
          Analytics
        </Link>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full shadow-md transition transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
