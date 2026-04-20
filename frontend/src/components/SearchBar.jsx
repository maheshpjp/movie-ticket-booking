import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';

/**
 * Search Bar Component - Reusable search input
 */
const SearchBar = ({ onSearch, placeholder = 'Search movies...', size = 'md' }) => {
  const [value, setValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const sizeClasses = {
    sm: 'py-2 px-3',
    md: 'py-2.5 px-4',
    lg: 'py-3 px-5',
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <motion.div
        whileFocus={{ scale: 1.02 }}
        className={`relative flex items-center ${sizeClasses[size]} card-elevated focus-within:ring-2 focus-within:ring-primary transition-all`}
      >
        <FiSearch className="text-text-secondary mr-3" size={20} />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-text-primary placeholder-text-secondary"
        />
      </motion.div>
    </form>
  );
};

export default SearchBar;
