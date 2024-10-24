import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useSelector } from "react-redux";

export default function BookCard({ data }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          "https://bookbazaar-e-commerce.onrender.com/api/v1/getFavorites",
          { headers }
        );
        setFavoriteBooks(res.data.data || []);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    isLoggedIn && fetchFavorites();
  }, [favoriteBooks]);

  const isFavorite = favoriteBooks.some((book) => book._id === data._id);

  // Adding the book to the favorites list
  const submitFavoriteHandler = async () => {
    if (isLoggedIn) {
      try {
        const res = await axios.put(
          "https://bookbazaar-e-commerce.onrender.com/api/v1/addBookToFavorite",
          { bookId: data._id }, // Passing the book ID to the API
          { headers }
        );
        alert(res.data.message);

        setFavoriteBooks((prevFavorites) => [...prevFavorites, data]);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    } else {
      alert("Please log in to your account");
    }
  };

  // Removing the book from the favorites list
  const removeFavoriteHandler = async () => {
    try {
      const res = await axios.put(
        "https://bookbazaar-e-commerce.onrender.com/api/v1/removeBookFromFavorite",
        {},
        { headers }
      );
      alert(res.data.message);

      setFavoriteBooks((prevFavorites) =>
        prevFavorites.filter((book) => book._id !== data._id)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return (
    <Link to={`/book-details/${data._id}`}>
      <div className="bg-slate-300 rounded-lg mx-2 md:mx-0 p-4 flex flex-col transition-transform duration-200 hover:scale-105">
        <div className="flex items-center justify-center">
          <img
            src={data.url}
            alt={data.title}
            className="h-[20vh] md:h-[25vh] w-auto rounded"
          />
        </div>
        <div className="h-[6.5rem] overflow-hidden text-ellipsis whitespace-nowrap">
          <h2 className="text-slate-800 mt-4 text-lg md:text-xl font-semibold">
            {data.title}
          </h2>
          <p className="mt-1 text-slate-600 font-semibold text-sm md:text-base">
            by {data?.author}
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-slate-900 font-semibold text-lg md:text-xl">
              $ {data?.price}
            </p>
            <div
              className="hover:text-red-500 transition-all duration-200"
              onClick={(e) => {
                e.preventDefault();
                isFavorite ? removeFavoriteHandler() : submitFavoriteHandler();
              }}
            >
              {isFavorite ? (
                <MdFavorite size="23px" color="red" />
              ) : (
                <MdFavoriteBorder size="23px" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
