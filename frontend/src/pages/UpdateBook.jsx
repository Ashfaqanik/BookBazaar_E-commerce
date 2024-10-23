import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateBook() {
  const { id } = useParams();
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    discount: "",
    desc: "",
    category: "",
    language: "",
  });

  const categories = [
    "Arts & Photography",
    "Biographies",
    "Business & Money",
    "Children's Books",
    "Christian Books & Bibles",
    "Comics & Graphic Novels",
    "Computers & Technology",
    "Cookbooks, Food & Wine",
    "Crafts, Hobbies & Home",
    "Education & Teaching",
    "Engineering & Transportation",
    "Health, Fitness & Dieting",
    "History",
    "Humor & Entertainment",
    "Law",
    "Literature & Fiction",
    "Medical Books",
    "Mystery, Thriller & Suspense",
    "Parenting & Relationships",
    "Politics & Social Sciences",
    "Reference",
    "Religion & Spirituality",
    "Romance",
    "Science & Math",
    "Science Fiction & Fantasy",
    "Self-Help",
    "Sports & Outdoors",
    "Teen & Young Adult Books",
    "Travel",
  ];
  const languages = [
    "English",
    "German",
    "Spanish",
    "Italian",
    "Hindi",
    "Japanese",
    "Norwegian",
  ];

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1000/api/v1/getBookById/${id}`
        );
        setData(res.data.data);
      } catch (error) {
        alert("Error fetching book details");
      }
    };
    fetchBookDetails();
  }, [id]);

  const headers = {
    bookid: id,
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Checking for empty fields
      if (
        !data.url.trim() ||
        !data.title.trim() ||
        !data.author.trim() ||
        !data.price.trim() ||
        !data.discount.trim() ||
        !data.desc.trim() ||
        !data.category.trim() ||
        !data.language.trim()
      ) {
        alert("All fields are required");
        return;
      }

      // Checking URL length
      if (data.url.length > 2048) {
        alert("URL must be 2048 characters or less.");
        return;
      }

      // Validating price and discount
      if (isNaN(data.price) || isNaN(data.discount)) {
        alert("Price and Discount must be valid numbers.");
        return;
      }
      const response = await axios.put(
        "http://localhost:1000/api/v1/updateBook",
        { ...data, id },
        { headers }
      );
      alert(response.data.message);
      navigate("/all-books"); // Redirecting to the all-books page
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-8 mt-12">
      <h1 className="text-2xl md:text-4xl font-semibold text-slate-500 mb-5">
        Update Book
      </h1>
      <div className="p-4 bg-slate-300 rounded">
        <form onSubmit={submit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="url"
            >
              Image URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={data.url}
              onChange={change}
              className="mt-1 block w-full  bg-slate-100 text-slate-900 border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={change}
              className="mt-1 block w-full bg-slate-100 text-slate-900 border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="author"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={data.author}
              onChange={change}
              className="mt-1 block w-full bg-slate-100 text-slate-900 border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={data.price}
              onChange={change}
              className="mt-1 block w-full bg-slate-100 text-slate-900 border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="discount"
            >
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={data.discount}
              onChange={change}
              className="mt-1 block w-full bg-slate-100 text-slate-900 border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="desc"
            >
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={data.desc}
              onChange={change}
              className="mt-1 block w-full border bg-slate-100 text-slate-900 border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={data.category}
              onChange={change}
              className="mt-1 block w-full bg-slate-100 text-slate-900 border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="language"
            >
              Language
            </label>
            <select
              id="language"
              name="language"
              value={data.language}
              onChange={change}
              className="mt-1 block w-full bg-slate-100 text-slate-900 border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-1 px-3 bg-blue-800 text-slate-200 font-semibold py-2 rounded hover:bg-blue-600 transition-all"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateBook;
