import React from "react";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex w-250 mx-auto mt-10 border  items-center border-red-400">
      <div className="w-40 bg-purple-500 h-150 border border-gray-800 px-2">
        <div className="w-30 bg-black border border-xl px-5 py-1 mt-2">
          <h2 className="text-white font-semibold">eNoteBook</h2>
        </div>
        <div className="flex flex-col px-8">
          <ul className="mt-10 text-[15px] font-bold">
            <li className="mt-5">
              <Link to="/">Home</Link>
            </li>
            <li className="mt-5">
              <Link to="/add-notes">Add Note</Link>
            </li>
            <li className="mt-5">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="mt-5">Logout</li>
          </ul>
        </div>
      </div>
      {/* <div className="">
        <div className="border border-red-400 w-[850px] mx-1 mt-1 h-146">
          <h1>Hellow </h1>
        </div>
      </div> */}
      <HeroSection />
    </div>
  );
};

export default Sidebar;
