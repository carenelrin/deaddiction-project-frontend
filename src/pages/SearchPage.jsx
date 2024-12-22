import React, { useState } from "react";
import SearchNavbar from "../components/Navbar";
import SearchBar from "./components/SearchPage/SearchBar";
import SearchCard from "./components/SearchPage/SearchCard";
import SearchFooter from "../components/Footer";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <>
      <SearchNavbar />
      <SearchBar setSearchResults={setSearchResults} />
      <SearchCard centers={searchResults} />
      <SearchFooter />
    </>
  );
};

export default SearchPage;
