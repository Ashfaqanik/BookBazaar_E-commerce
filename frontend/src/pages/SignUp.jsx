import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Simple regex for 10-digit phone numbers
    return phoneRegex.test(phone);
  };

  const onSubmitHandler = async () => {
    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === "" ||
        values.phoneNumber === ""
      ) {
        alert("All fields are required");
      } else if (!validatePhoneNumber(values.phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
      } else {
        const res = await axios.post(
          "https://bookbazaar-e-commerce.onrender.com/api/v1/signUp",
          values
        );
        alert(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="h-auto px-12 py-8 flex items-center justify-center mt-6">
      <div className="bg-slate-400 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-slate-900 text-2xl text-center font-semibold">
          Sign Up
        </p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-slate-800">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-200 text-slate-600 p-2 outline-none rounded-md"
              placeholder="username"
              name="username"
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-slate-800">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 bg-slate-200 text-slate-600 p-2 outline-none rounded-md"
              placeholder="xyz@example.com"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-slate-800">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-slate-200 text-slate-600 p-2 outline-none rounded-md"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-slate-800">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-200 text-slate-600 p-2 outline-none rounded-md"
              placeholder="phone number"
              name="phoneNumber"
              required
              value={values.phoneNumber}
              onChange={change}
            />
          </div>
          <div className="mt-4 mb-4">
            <label htmlFor="" className="text-slate-800">
              Address
            </label>
            <textarea
              className="w-full mt-2 bg-slate-200 text-slate-600 p-2 outline-none rounded-md"
              placeholder="address"
              rows={3}
              name="address"
              required
              value={values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 mb-4">
            <button
              type="submit"
              onClick={onSubmitHandler}
              className="w-full mt-2 border border-blue-500 bg-blue-500 text-black rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 py-2 font-semibold"
            >
              SignUp
            </button>
          </div>
        </div>
        <p className="text-center text-slate-800 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-950 hover:text-blue-800 underline font-semibold"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
