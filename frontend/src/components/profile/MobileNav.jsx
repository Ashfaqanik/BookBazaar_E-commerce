import React, { useState } from "react";
import { Link } from "react-router-dom";

function MobileNav() {
  const [activeLink, setActiveLink] = useState("accountDetails");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="w-full flex items-center justify-between my-4 bg-slate-300 md:hidden">
      {/* Account Details Link */}
      <Link
        to="/profile"
        onClick={() => handleLinkClick("accountDetails")}
        className={`font-semibold w-full py-2 text-center  rounded transition-all duration-300 ${
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
  );
}

export default MobileNav;
