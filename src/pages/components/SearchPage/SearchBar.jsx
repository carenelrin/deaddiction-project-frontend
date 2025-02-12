import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import bgImage from "../../../assets/SearchImages/rehab.jpg";

const SearchBar = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://deaddiction-project-backend.onrender.com/api/search?query=${searchQuery.trim()}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data.data); 
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]); 
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); 
  };

  return (
    <div
      className="Search_bar bg-cover bg-center h-[30rem] flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="wrapper max-w-6xl mx-auto p-6 sm:p-8 md:p-12 rounded-lg shadow-xl border border-white"
        style={{ backgroundColor: "#78adf7", opacity: "0.9" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
          Find a Deaddiction Centre
        </h1>
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-3/4">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 text-2xl" />
              <input
                type="text"
                placeholder="Search by name, state, city, or specialization..."
                value={searchQuery}
                onChange={handleInputChange} 
                className="w-full p-4 pl-12 text-blue-700 bg-white border-2 border-blue-400 rounded-full placeholder-blue-500 text-lg focus:outline-none focus:border-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
              />
            </div>
            <button
              type="submit"
              className="h-14 w-full md:w-auto text-white font-semibold rounded-full shadow-lg transition-colors duration-300 hover:bg-blue-600 flex items-center justify-center px-8"
              style={{
                cursor: "pointer",
                backgroundColor: "#2f7ae4",
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
