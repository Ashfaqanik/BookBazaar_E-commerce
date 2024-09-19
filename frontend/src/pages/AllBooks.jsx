import React from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard/BookCard";

function Allbooks() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/getAllBooks");
      setData(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-slate-100 py-4 h-auto px-12">
      <h1 className="font-medium text-3xl text-slate-700">All Books</h1>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Allbooks;
