import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const onSubmitHandler = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("All fields are required");
      } else {
        const res = await axios.post(
          "https://bookbazaar-e-commerce.onrender.com/api/v1/signIn",
          values
        );
        dispatch(authActions.login());
        dispatch(authActions.changeRole(res.data.role));
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        navigate("/");
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
    <div className="h-auto mt-10 md:mt-20 px-12 py-8 flex items-center justify-center">
      <div className="bg-slate-400 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-slate-900 text-2xl text-center font-semibold">
          Log In
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

          <div className="mt-4 mb-4">
            <button
              type="submit"
              onClick={onSubmitHandler}
              className="w-full mt-2 border border-blue-500 bg-blue-500 text-black rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 py-2 font-semibold"
            >
              Log In
            </button>
          </div>
        </div>
        <p className="text-center text-slate-800 mt-4">
          Don't have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-950 hover:text-blue-800 underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
