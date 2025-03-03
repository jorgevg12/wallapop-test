'use client';

import { memo, useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch: (text: string) => void;
}

function Search({ placeholder, onSearch }: SearchProps) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <label htmlFor="search">
        Search
      </label>
      <input
        id="search"
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => onSearch(inputValue)}>Search</button>
    </div>
  );
}

export default memo(Search);
