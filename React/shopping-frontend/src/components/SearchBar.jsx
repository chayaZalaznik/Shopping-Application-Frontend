import React, { useState } from 'react';
import { searchItems } from '../api';

const SearchBar = ({ setItems }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await searchItems(query);
      if (response.length === 0) {
        alert('No items found');
      } else {
        setItems(response);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  return (
    <div className="search-bar-container mt-3 mb-3">
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for items"
      />
      <button className="btn btn-primary ml-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
