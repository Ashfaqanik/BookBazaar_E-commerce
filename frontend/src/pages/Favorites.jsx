import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";
import axios from "axios";

function Favorites() {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:1000/api/v1/getFavorites", {
        headers,
      });
      setFavoriteBooks(res.data.data || []);
    };
    fetch();
  }, [favoriteBooks]);
  return (
    <div className="mt-[4rem]">
      <h1 className="ml-3 mt-[4rem] text-3xl font-semibold text-zinc-700 mb-5">
        Favorites
      </h1>
      {favoriteBooks.length === 0 && (
        <div className="mt-[5rem] h-[100%] text-4xl font-semibold text-slate-500 flex items-center justify-center w-full">
          No Favorite Books Added
        </div>
      )}
      <div className="mx-4 mt-4 grid grid-cols-4 gap-4">
        {favoriteBooks &&
          favoriteBooks.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Favorites;
