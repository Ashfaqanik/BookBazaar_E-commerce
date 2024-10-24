import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBook() {
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
    "Bangla",
  ];

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
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
        toast.error("All fields are required");
        return;
      }

      // Checking URL length
      if (data.url.length > 2048) {
        toast.error("URL must be 2048 characters or less.");
        return;
      }

      // Validating price and discount
      if (isNaN(data.price) || isNaN(data.discount)) {
        toast.error("Price and Discount must be valid numbers.");
        return;
      }

      const response = await axios.post(
        "https://bookbazaar-e-commerce.onrender.com/api/v1/addBook",
        data,
        { headers }
      );

      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        discount: "",
        desc: "",
        category: "",
        language: "",
      });

      // Showing success message
      toast.success(response.data.message || "Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-500 mb-4">
        Add Book
      </h1>
      <div className="p-4 bg-slate-300 rounded">
        <div className="mt-4">
          <label htmlFor="url" className="text-slate-800">
            Image URL
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none placeholder:text-slate-600"
            placeholder="Image URL"
            name="url"
            value={data.url}
            onChange={change}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="text-slate-800">
            Title of book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none placeholder:text-slate-600"
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={change}
            required
          />
        </div>
        <div className="mt-4">
          <label htmlFor="author" className="text-slate-800">
            Author
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none placeholder:text-slate-600"
            placeholder="Author"
            name="author"
            value={data.author}
            onChange={change}
            required
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="language" className="text-slate-800">
              Language
            </label>
            <select
              className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none"
              name="language"
              value={data.language}
              onChange={change}
              required
            >
              <option value="" disabled>
                Select language
              </option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div className="w-3/6">
            <label htmlFor="price" className="text-slate-800">
              Price
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none placeholder:text-slate-600"
              placeholder="Price"
              name="price"
              value={data.price}
              onChange={change}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="category" className="text-slate-800">
              Category
            </label>
            <select
              className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none"
              name="category"
              value={data.category}
              onChange={change}
              required
            >
              <option value="">Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="w-3/6">
            <label htmlFor="discount" className="text-slate-800">
              Discount
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none placeholder:text-slate-600"
              placeholder="Discount"
              name="discount"
              value={data.discount}
              onChange={change}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="desc" className="text-slate-800">
            Description
          </label>
          <textarea
            className="w-full mt-2 bg-slate-400 text-slate-900 p-2 outline-none placeholder:text-slate-600"
            placeholder="Description..."
            rows="5"
            name="desc"
            value={data.desc}
            onChange={change}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={submit}
          className="mt-4 px-3 bg-blue-800 text-slate-200 font-semibold py-2 rounded hover:bg-blue-600 transition-all"
        >
          Add Book
        </button>
      </div>
    </div>
  );
}

export default AddBook;
