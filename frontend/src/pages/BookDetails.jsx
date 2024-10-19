import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useState, useEffect } from "react";
import { GrLanguage } from "react-icons/gr";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function BookDetails() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/getBookById/${id}`
      );
      console.log(res);
      setData(res.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const submitFavoriteHandler = async () => {
    if (isLoggedIn) {
      const res = await axios.put(
        "http://localhost:1000/api/v1/addBookToFavorite",
        {},
        { headers }
      );
      alert(res.data.message);
    } else {
      navigate("/login");
    }
  };

  const submitCartHandler = async () => {
    if (isLoggedIn) {
      const res = await axios.put(
        "http://localhost:1000/api/v1/addToCart",
        {},
        { headers }
      );
      alert(res.data.message);
    } else {
      navigate("/login");
    }
  };

  const deleteBookHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        const res = await axios.delete(
          "http://localhost:1000/api/v1/deleteBook",
          {
            headers,
          }
        );
        alert(res.data.message);
        navigate("/all-books"); // Redirect to the all-books page
      } catch (error) {
        alert(error.response?.data?.message || "Failed to delete the book");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/update-book/${id}`); // Navigate to the update book page
  };

  return (
    <>
      {data.length === 0 && (
        <div className="h-screen bg-slate-100 flex items-center justify-center">
          <Loader />
        </div>
      )}
      {data !== 0 && (
        <div className="mt-7 px-4 md:px-12 py-8 bg-slate-100 flex flex-col md:flex-row gap-8">
          <div className=" bg-slate-100 p-2 h-[58vh] lg:h-[68vh] w-full lg:w-3/6 flex items-center justify-center">
            <img
              src={data.url}
              alt="/"
              className="h-[50vh] lg:h-[60vh] rounded-xl"
            />
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-slate-600 font-semibold mr-8">
              {data.title}
            </h1>
            <p className=" text-slate-500 mt-1"> by {data.author}</p>
            <p className="text-xl text-slate-700 mt-4">{data.desc}</p>
            <p className="flex items-center justify-start text-slate-700 mt-4">
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 text-slate-600 text-3xl font-semibold">
              Price: $ {data.price}
            </p>
            {role === "user" && (
              <div className="flex mt-12 justify-center md:justify-end">
                <button
                  onClick={submitFavoriteHandler}
                  className="bg-pink-800 hover:bg-pink-700 text-white py-2 px-4 rounded"
                >
                  Add to Favorites
                </button>
                <button
                  onClick={submitCartHandler}
                  className="ml-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              </div>
            )}
            {role === "admin" && (
              <div className="flex mt-12 justify-center md:justify-end">
                <button
                  onClick={deleteBookHandler}
                  className="flex bg-pink-800 hover:bg-pink-700 text-white py-2 px-4 rounded"
                >
                  Delete
                  <MdDeleteOutline className="ml-1 h-6" />
                </button>
                <button
                  onClick={handleEdit}
                  className="flex ml-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Edit
                  <FaRegEdit className="ml-2 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BookDetails;
