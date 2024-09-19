import React from "react";

function SignUp() {
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
              className="w-full mt-2 bg-slate-300 text-slate-600 p-2 outline-none rounded-md"
              placeholder="username"
              name="username"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-slate-800">
              Email
            </label>
            <input
              type="email"
              className="w-full mt-2 bg-slate-300 text-slate-600 p-2 outline-none rounded-md"
              placeholder="xyz@example.com"
              name="email"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-slate-800">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-slate-300 text-slate-600 p-2 outline-none rounded-md"
              placeholder="password"
              name="password"
              required
            />
          </div>

          <div className="mt-4 mb-4">
            <label htmlFor="" className="text-slate-800">
              Address
            </label>
            <textarea
              className="w-full mt-2 bg-slate-300 text-slate-600 p-2 outline-none rounded-md"
              placeholder="address"
              rows={3}
              name="address"
              required
            />
          </div>
          <div className="mt-4 mb-4">
            <button className="w-full mt-2 border border-blue-500 bg-blue-500 text-black rounded-lg hover:bg-blue-800 hover:text-white transition-all duration-200 py-2 font-semibold">
              SignUp
            </button>
          </div>
        </div>
        <p className="text-center text-slate-800 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-950 hover:text-blue-800 underline font-semibold"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
