import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

function RecentlyAdded() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/getRecentBooks"
      );
      setData(res.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4 md:px-6">
      <h1 className="font-medium text-3xl text-slate-700">Latest Books</h1>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
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

export default RecentlyAdded;
