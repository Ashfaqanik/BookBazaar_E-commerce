import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

function Sidebar({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("accountDetails");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const onLogoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="bg-slate-100 md:bg-slate-200 p-4 rounded hidden md:flex flex-col items-end md:items-center justify-between h-[100%]">
      <div className=" md:flex hidden items-center flex-col justify-center">
        <img src={data.avatar} className=" h-[12vh] rounded-full" alt="" />
        <p className="mt-3 text-xl font-semibold">{data.username}</p>
        <p className="mt-1 text-sm">{data.email}</p>
        <div className="w-full bg-zinc-500 mt-4 h-[1px] hidden lg:block" />
      </div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        {/* Account Details Link */}
        <Link
          to="/profile"
          onClick={() => handleLinkClick("accountDetails")}
          className={`font-semibold w-full py-2 text-center hover:bg-slate-300 rounded transition-all duration-300 ${
            activeLink === "accountDetails" ? "bg-slate-300" : ""
          }`}
        >
          Account Details
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
      </div>
      <button
        onClick={onLogoutHandler}
        className="flex hover:bg-slate-400 bg-slate-500 text-white hover:text-black w-[35%] lg:w-full md:mt-0 font-semibold items-center justify-center py-2 rounded  transition-all duration-300"
      >
        Log Out <FaArrowRightFromBracket className=" ms-4" />
      </button>
    </div>
  );
}

export default Sidebar;
