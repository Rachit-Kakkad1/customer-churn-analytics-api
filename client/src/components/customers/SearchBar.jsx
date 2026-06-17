import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Debounced search input component styled with glassmorphism.
 */
export const SearchBar = ({ onSearch, placeholder = 'Search customers...' }) => {
  const [value, setValue] = useState('');

  // Debounce side effect to defer dispatching the query change to the parent
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms debounce

    return () => clearTimeout(handler);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
  };

  return (
    <div className="relative flex max-w-md w-full select-none">
      {/* Search Icon */}
      <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-500 transition-colors pointer-events-none" />

      {/* Input Element */}
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/5 bg-[#0c0c14]/40 py-2.5 pr-10 pl-10 text-xs text-white placeholder-neutral-500 transition-all focus:border-indigo-500/30 focus:bg-[#0c0c14]/80 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-inner"
      />

      {/* Reset/Clear Action Button */}
      {value && (
        <button
          onClick={handleClear}
          className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 flex items-center justify-center rounded-md text-neutral-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          title="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
