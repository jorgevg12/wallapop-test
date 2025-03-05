'use client';

import { memo, useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch: (text: string) => void;
}

function Search({ placeholder, onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  return (
    <div className='flex items-center space-x-2 w-full md:w-96'>
      <label htmlFor="search" className='sr-only'>
        Search
      </label>
      <input
        className='border border-gray-300 p-2 rounded-sm w-full'
        id="search"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search input"
      />
      <button 
        className='border border-gray-300 p-2 rounded-sm cursor-pointer' 
        onClick={() => onSearch(inputValue)}
        onKeyDown={handleKeyDown}
        aria-label="Search button"
      >
        Search
      </button>
    </div>
  );
}

export default memo(Search);
