import React, { useState } from "react";
import './Search.css';

const Search = ({ onPostClick }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `http://hn.algolia.com/api/v1/search?query=${e.target.value}`
        );
        const data = await response.json();

        // Check if the data.hits array is available and not empty
        if (data.hits && data.hits.length > 0) {
          setSearchResults(data.hits);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching Hacker News:", error);
      }
    }, 300);
  };

  return (
    <div>
      <h1>Enter text in the Search input box.</h1>
      <input
        type="text"
        onChange={handleSearch}
        className="Search-bar"
        value={search}
        placeholder="Type here..."
      />
      <div>
        <ul>
          {searchResults.map((searchResult) => (
            searchResult.objectID && searchResult.title && (
              <li key={searchResult.objectID} onClick={() => { onPostClick(searchResult.objectID) }}>
                {searchResult.title}
              </li>
            )
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
