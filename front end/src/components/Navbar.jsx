import React from "react";
import job_board from "../assets/images/job_board.png";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, setUser } = useAuth(); // Ensure setUser is available in AuthContext
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("authToken"); // Remove token if stored
    navigate("/login"); // Redirect to login page
  };

  const linkclass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-indigo-700 border-b border-indigo-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* Logo */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto rounded-full"
                src={job_board}
                alt="job board"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Job board
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/" className={linkclass}>
                  Home
                </NavLink>
                <NavLink to="/jobs" className={linkclass}>
                  Jobs
                </NavLink>
                <NavLink to="/add-job" className={linkclass}>
                  Add Job
                </NavLink>
                {/* Manage Users Button for Admin */}
                {user &&
                  user.role === "admin" && ( // Check if user is admin
                    <NavLink to="/admin/users" className={linkclass}>
                      Manage Users
                    </NavLink>
                  )}
                {/* Profile Icon */}
                {user ? (
                  <Link
                    to="/profile"
                    className="text-white hover:bg-gray-900 rounded-md px-3 py-2"
                  >
                    <FaUserCircle className="text-2xl" />
                  </Link>
                ) : (
                  <NavLink to="/login" className={linkclass}>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
