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
    <>
      <h1 className="ml-4 mt-1 font-bold text-xl text-slate-800">Favorites</h1>
      <div className="mx-4 mt-4 grid grid-cols-4 gap-4">
        {favoriteBooks &&
          favoriteBooks.map((item, i) => (
            <div key={i}>
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Favorites;
