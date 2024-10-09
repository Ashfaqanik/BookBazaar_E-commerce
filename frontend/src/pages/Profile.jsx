import React, { useEffect, useState } from "react";
import Sidebar from "../components/profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/profile/MobileNav";

function Profile() {
  const [profile, setProfile] = useState();

  // headers to authenticate API requests
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetching user profile data from the server
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/getUserInformation",
        { headers }
      );
      setProfile(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content Wrapper */}
      <div className="flex-grow flex flex-col md:flex-row mt-9 px-2 md:px-12 py-8 gap-4">
        {!profile && (
          <div className="w-full h-[100%] flex justify-center items-center">
            <Loader />
          </div>
        )}

        {profile && (
          <>
            {/* Sidebar Section */}
            <div className="w-full md:w-1/6">
              <Sidebar data={profile} />
              <MobileNav />
            </div>
            {/* Main Content Section */}
            <div className="w-full md:w-5/6">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
