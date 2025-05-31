'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, initialValue = '', placeholder = "Search for products..." }) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-grow max-w-xl">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full p-3 pl-10 pr-10 rounded-md text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
          >
           
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;