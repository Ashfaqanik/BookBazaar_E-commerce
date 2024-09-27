import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

function Sidebar({ data }) {
  const [activeLink, setActiveLink] = useState("favorites");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="bg-slate-200 p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-[12vh] rounded-full" alt="" />
        <p className="mt-3 text-xl font-semibold">{data.username}</p>
        <p className="mt-1 text-sm">{data.email}</p>
        <div className="w-full bg-zinc-500 mt-4 h-[1px] hidden lg:block" />
      </div>

      <div className="mt-2 w-full flex-col items-center justify-center hidden lg:flex">
        {/* Favorites Link */}
        <Link
          to="/profile"
          onClick={() => handleLinkClick("favorites")}
          className={`font-semibold w-full py-2 text-center hover:bg-slate-300 rounded transition-all duration-300 ${
            activeLink === "favorites" ? "bg-slate-300" : ""
          }`}
        >
          Favorites
        </Link>

        {/* Order History Link */}
        <Link
          to="/profile/orderHistory"
          onClick={() => handleLinkClick("orderHistory")}
          className={`font-semibold w-full py-2 text-center hover:bg-slate-300 rounded transition-all duration-300 ${
            activeLink === "orderHistory" ? "bg-slate-300" : ""
          }`}
        >
          Order History
        </Link>

        {/* Settings Link */}
        <Link
          to="/profile/settings"
          onClick={() => handleLinkClick("settings")}
          className={`font-semibold w-full py-2 text-center hover:bg-slate-300 rounded transition-all duration-300 ${
            activeLink === "settings" ? "bg-slate-300" : ""
          }`}
        >
          Settings
        </Link>
      </div>
      <button className="bg-slate-400 hover:text-white  w-3/6 lg:w-full mt-4 lg:mt-0 font-semibold flex items-center justify-center py-2 rounded hover:bg-slate-500 transition-all duration-300">
        Log Out <FaArrowRightFromBracket className=" ms-4" />
      </button>
    </div>
  );
}

export default Sidebar;
