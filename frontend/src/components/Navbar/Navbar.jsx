import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  let cartItemCount = 1;

  const links = [
    {
      title: "Home",
      link: "/",
    },

    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
  ];
  return (
    <>
      <nav className="flex bg-slate-200 text-white px-8 py-1.5 overflow-hidden justify-between ">
        <img className="h-[4rem]" src="/logo.png" alt="logo" />
        <div className="hidden md:flex text-black  items-center gap-4">
          {links.map((items, i) => (
            <Link
              to={items.link}
              className="hover:text-blue-800 transition-all duration-200 hover:underline"
              key={i}
            >
              {items.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 items-center text-black">
          <div className="relative">
            <Link
              to="/cart"
              className="hover:text-blue-800 transition-all duration-200 hover:underline"
            >
              <IoCartOutline size="25px" />
              {cartItemCount > 0 && (
                <span className="absolute bottom-3 left-2.5 inline-flex items-center justify-center px-1.5 py-1 text-[9px] font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <div className="relative">
            <Link
              to="/favorites"
              className="hover:text-blue-800 transition-all duration-200 hover:underline"
            >
              <MdFavoriteBorder size="23px" />
              {cartItemCount > 0 && (
                <span className="absolute bottom-2.5 left-3 inline-flex items-center justify-center px-1.5 py-1 text-[9px] font-bold leading-none text-white bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {!isLoggedIn ? (
            // Show the Login button if the user is not logged in
            <Link
              to="/login"
              className="hidden md:flex items-center h-9 px-4 border border-blue-800 bg-blue-400 text-black rounded hover:bg-blue-800 hover:text-white transition-all duration-200"
            >
              Login
            </Link>
          ) : (
            <Link to="/profile" className="hidden md:flex items-center">
              <img
                src="/avator.png"
                alt="User Profile"
                className="w-8 h-8 rounded-full"
              />
            </Link>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="text-black text-2xl block lg:hidden"
        >
          <IoMenu />
        </button>
      </nav>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-50 lg:hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 text-lg font-bold">BookBazaar</div>
        <ul>
          {links.map((item) => (
            <Link key={item.title} to={item.link} onClick={toggleSidebar}>
              <li className="p-4 border-b border-gray-700">{item.title}</li>
            </Link>
          ))}
        </ul>
        <Link
          to="/login"
          className="flex items-center h-9 px-4 border border-blue-800 bg-blue-400 text-black rounded hover:bg-blue-800 hover:text-white transition-all duration-200"
        >
          Login
        </Link>
      </div>

      {/* Overlay to close the sidebar by clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}

export default Navbar;
