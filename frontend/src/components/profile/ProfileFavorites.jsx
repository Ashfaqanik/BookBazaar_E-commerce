import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import axios from "axios";

function ProfileFavorites() {
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
      {favoriteBooks.length === 0 && (
        <div className="h-[100%] text-4xl font-semibold text-slate-500 flex items-center justify-center w-full">
          No Favorite Books Added
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
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

export default ProfileFavorites;
