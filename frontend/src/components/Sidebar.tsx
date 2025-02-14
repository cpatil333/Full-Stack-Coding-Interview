import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
//import "../styles/Navbar.css";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove user authentication data
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <nav className="bg-purple-500 text-white w-full md:w-1/4 lg:w-1/5 h-auto md:h-screen px-4 py-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="bg-gray-900 text-white py-3 px-4 text-center border border-white rounded-md shadow-lg w-full">
            <hr className="lg:w-[130px] lg:ml-[-15px]" />
            <h2 className="text-2xl font-bold tracking-wide">eNoteBook</h2>
            <hr className="lg:w-[130px] lg:ml-[68px]" />
            <p className="text-xl mt-1 text-[10px] lg:ml-[95px]">
              Powered By Devlrus
            </p>
          </div>
        </div>
        <ul className="mt-10 space-y-10 font-bold text-center">
          <li>
            <Link to="/hero-section" className="text-black no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-notes" className="text-black no-underline">
              Add Note
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-black no-underline">
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-black no-underline bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <Outlet /> {/* Dynamic content will be rendered here */}
      </main>
    </div>
  );
};

export default Sidebar;
