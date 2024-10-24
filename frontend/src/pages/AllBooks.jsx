import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";

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

function Allbooks() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(
        "https://bookbazaar-e-commerce.onrender.com/api/v1/getAllBooks"
      );
      setData(res.data.data);
      setFilteredData(res.data.data);
    };
    fetchBooks();
  }, []);

  // Filtering handler
  const handleFilter = () => {
    let filteredBooks = data;

    if (selectedCategories.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    if (selectedLanguages.length > 0) {
      filteredBooks = filteredBooks.filter((book) =>
        selectedLanguages.includes(book.language)
      );
    }

    setFilteredData(filteredBooks);
  };

  // Handling category change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(category);
      const updatedCategories = isSelected
        ? prev.filter((cat) => cat !== category)
        : [...prev, category];
      return updatedCategories;
    });
  };

  // Handling language change
  const handleLanguageChange = (language) => {
    setSelectedLanguages((prev) => {
      const isSelected = prev.includes(language);
      const updatedLanguages = isSelected
        ? prev.filter((lang) => lang !== language)
        : [...prev, language];
      return updatedLanguages;
    });
  };

  // Updating filter whenever the selected categories or languages change
  useEffect(() => {
    handleFilter();
  }, [selectedCategories, selectedLanguages]);

  return (
    <div className="mt-14 bg-slate-100 py-4 h-auto px-12 flex">
      {/* Filter Section */}
      <div className="w-[45%] md:w-1/4 p-4 bg-slate-300 shadow-md rounded-md mr-4">
        <h2 className="text-lg font-semibold text-slate-700">Category</h2>
        <div className="mt-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center mb-2 text-sm">
              <input
                type="checkbox"
                id={category}
                name={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={category} className="text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-slate-700 mt-6">Language</h2>
        <div className="mt-4">
          {languages.map((language) => (
            <div key={language} className="flex items-center mb-2 text-sm">
              <input
                type="checkbox"
                id={language}
                name={language}
                checked={selectedLanguages.includes(language)}
                onChange={() => handleLanguageChange(language)}
                className="mr-2"
              />
              <label htmlFor={language} className="text-gray-700">
                {language}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Book Display Section */}
      <div className="w-3/4">
        <h1 className="text-3xl font-semibold text-slate-500">Books</h1>

        {/* Loader */}
        {!data && (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        )}

        <div className="my-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredData &&
            filteredData.map((item, i) => (
              <div key={i}>
                <BookCard data={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Allbooks;
