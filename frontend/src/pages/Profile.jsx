import React, { useEffect, useState } from "react";
import Sidebar from "../components/profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

function Profile() {
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
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
    <div className="px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4">
      {!profile && (
        <div className="w-full h-[100%] flex justify-center items-center">
          <Loader />
        </div>
      )}

      {profile && (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
