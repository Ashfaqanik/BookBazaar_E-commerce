import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaPencilAlt } from "react-icons/fa";

function AccountDetails() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState({ address: "", phoneNumber: "" }); // Added phoneNumber to state
  const [successMessage, setSuccessMessage] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false); // Edit mode for address
  const [isEditingPhone, setIsEditingPhone] = useState(false); // Edit mode for phone number

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
        setValue({
          address: res.data.address,
          phoneNumber: res.data.phoneNumber,
        }); // Setting initial values
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile data");
        setLoading(false);
      }
    };
    fetchData();
  }, [successMessage]);

  // Handling address update
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
      setIsEditingAddress(false); // Hiding the form after successful update
    } catch (err) {
      setUpdateError("Failed to update address");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle phone number update
  const handleUpdatePhoneNumber = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setSuccessMessage(null);
    setUpdateError(null);

    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/updatePhoneNumber",
        { phoneNumber: value.phoneNumber },
        { headers }
      );
      setSuccessMessage(res.data.message);
      setIsEditingPhone(false); // Hiding the form after successful update
    } catch (err) {
      setUpdateError("Failed to update phone number");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handling form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  // Toggling edit mode for address
  const handleEditAddressClick = () => {
    setIsEditingAddress(!isEditingAddress);
  };

  // Toggling edit mode for phone number
  const handleEditPhoneClick = () => {
    setIsEditingPhone(!isEditingPhone);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader />
      </div>
    );

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
                onClick={handleEditAddressClick}
                className="ml-2 text-black hover:text-blue-700"
              >
                <FaPencilAlt />{" "}
              </button>
            </p>

            {/* Phone Number Display and Edit */}
            <p className="text-lg text-gray-700 flex items-center mt-2">
              <strong>Phone Number:&nbsp; </strong> {profileData.phoneNumber}
              <button
                onClick={handleEditPhoneClick}
                className="ml-2 text-black hover:text-blue-700"
              >
                <FaPencilAlt />{" "}
              </button>
            </p>

            {/* Address Update Form */}
            {isEditingAddress && (
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
            {/* Phone Number Update Form */}
            {isEditingPhone && (
              <form
                onSubmit={handleUpdatePhoneNumber}
                className="flex flex-col mt-4 space-y-4"
              >
                <label htmlFor="phoneNumber" className="text-lg text-gray-700">
                  <strong>Edit Phone Number:</strong>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={value.phoneNumber}
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
                  {isUpdating ? "Updating..." : "Update Phone Number"}
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
