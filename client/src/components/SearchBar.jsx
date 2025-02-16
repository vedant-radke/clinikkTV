import React, { useState } from "react";

const SearchBar = ({ setSearchQuery }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearchQuery(input);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>🔍 Search</button>
    </div>
  );
};

export default SearchBar;
