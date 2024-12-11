import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    onSearch({ query, category });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Tìm kiếm video..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Tất cả thể loại</option>
        <option value="Hành động">Hành động</option>
        <option value="Hài">Hài</option>
        <option value="Kinh dị">Kinh dị</option>
      </select>
      <button onClick={handleSearch}>Tìm Kiếm</button>
    </div>
  );
};

export default SearchBar;
