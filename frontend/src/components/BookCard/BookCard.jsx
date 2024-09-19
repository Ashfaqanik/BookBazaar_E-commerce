import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ data }) {
  return (
    <>
      <Link to={`/book-details/${data._id}`}>
        <div className="bg-slate-300 rounded mr-6 ml-6 md:m-0 p-6 md:p-4 flex flex-col">
          <div className="rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <div className="h-[6.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
            <h2 className="text-slate-800 mt-4 text-xl font-semibold">
              {data.title}
            </h2>
            <p className="mt-1 text-slate-600 font-semibold">
              by {data?.author}
            </p>
            <p className="mt-1 text-slate-900 font-semibold text-xl">
              $ {data?.price}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}
