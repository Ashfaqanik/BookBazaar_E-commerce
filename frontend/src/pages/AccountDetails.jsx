import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaPencilAlt } from "react-icons/fa";
function AccountDetails() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState({ address: "" });
  const [successMessage, setSuccessMessage] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  // Headers to authenticate API requests
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetching user profile data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/getUserInformation",
          { headers }
        );
        setProfileData(res.data);
        setValue({ address: res.data.address });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile data");
        setLoading(false);
      }
    };
    fetchData();
  }, [successMessage]);

  // Handle address update
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccessMessage(null);
    setUpdateError(null);

    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/updateAddress",
        { address: value.address },
        { headers }
      );
      setSuccessMessage(res.data.message);
      setIsEditing(false); // Hide the form after successful update
    } catch (err) {
      setUpdateError("Failed to update address");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handling form input change
  const handleInputChange = (e) => {
    setValue({ ...value, address: e.target.value });
  };

  // Toggling edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  if (loading) return <Loader />;

  if (error) return <div>{error}</div>;

  return (
    <div className="mx-auto p-2 bg-slate-100 rounded-lg">
      <h1 className="text-3xl font-semibold text-slate-500 mb-8">
        Your Account Details
      </h1>

      {profileData && (
        <div className="flex flex-col items-center">
          <div className="w-full text-left">
            <p className="text-lg text-gray-700">
              <strong>Username:&nbsp;</strong> {profileData.username}
            </p>
            <p className="text-lg text-gray-700 mt-2">
              <strong>Email:&nbsp;</strong> {profileData.email}
            </p>
            <p className="text-lg text-gray-700 flex items-center mt-2">
              <strong>Address:&nbsp; </strong> {profileData.address}
              <button
                onClick={handleEditClick}
                className="ml-2 text-black hover:text-blue-700"
              >
                <FaPencilAlt />{" "}
              </button>
            </p>

            {isEditing && (
              <form
                onSubmit={handleUpdateAddress}
                className="flex flex-col mt-4 space-y-4"
              >
                <label htmlFor="address" className="text-lg text-gray-700">
                  <strong>Edit Address:</strong>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={value.address}
                  onChange={handleInputChange}
                  className="md:w-[50%] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className={`md:w-[50%] py-2 px-4 rounded-lg text-white ${
                    isUpdating
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update Address"}
                </button>
              </form>
            )}

            {successMessage && (
              <p className="text-green-600 mt-4">{successMessage}</p>
            )}
            {updateError && <p className="text-red-600 mt-4">{updateError}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountDetails;
