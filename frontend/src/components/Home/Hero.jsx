import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="h-[75vh] flex">
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-semibold text-slate-700 text-center lg:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-slate-900 text-center lg:text-left">
          Uncover stories,enriching knowledge and endless inspiration from our
          collection of books
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-slate-800 sm:text-xl lg:text-2xl font-semibold border bg-blue-400 border-blue-500 px-4 sm:px-6 md:px-7 lg:px-8 py-2 sm:py-3 md:py-3 lg:py-3 hover:bg-blue-800 hover:text-white rounded-full"
          >
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full md:w-4/6 lg:w-3/6 h-[80%] lg:h-[100%] flex items-center justify-center">
        <img
          className="object-cover h-[80%] w-[80%] rounded-md"
          src="./hero.png"
          alt="hero"
        />
      </div>
    </div>
  );
}

export default Hero;
