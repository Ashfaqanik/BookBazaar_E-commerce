import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MobileNav() {
  const [activeLink, setActiveLink] = useState("accountDetails");
  const role = useSelector((state) => state.auth.role);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      {role === "user" && (
        <div className="w-full flex items-center justify-between my-4 bg-slate-300 md:hidden">
          {/* Account Details Link */}
          <Link
            to="/profile"
            onClick={() => handleLinkClick("accountDetails")}
            className={`font-semibold w-full py-2 text-center rounded transition-all duration-300 ${
              activeLink === "accountDetails" ? "bg-slate-400" : ""
            }`}
          >
            Account Details
          </Link>

          {/* Order History Link */}
          <Link
            to="/profile/orderHistory"
            onClick={() => handleLinkClick("orderHistory")}
            className={`font-semibold w-full py-2 text-center rounded transition-all duration-300 ${
              activeLink === "orderHistory" ? "bg-slate-400" : ""
            }`}
          >
            Order History
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex items-center justify-between my-4 bg-slate-300 md:hidden">
          {/* All Orders Link */}
          <Link
            to="/profile"
            onClick={() => handleLinkClick("accountDetails")}
            className={`font-semibold w-full py-2 text-center rounded transition-all duration-300 ${
              activeLink === "accountDetails" ? "bg-slate-400" : ""
            }`}
          >
            All Orders
          </Link>

          {/* Add Book Link */}
          <Link
            to="/profile/addBook"
            onClick={() => handleLinkClick("addBook")}
            className={`font-semibold w-full py-2 text-center rounded transition-all duration-300 ${
              activeLink === "addBook" ? "bg-slate-400" : ""
            }`}
          >
            Add Book
          </Link>
        </div>
      )}
    </>
  );
}

export default MobileNav;
