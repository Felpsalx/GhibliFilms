

import React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por título..."
        className="w-fit p-2 rounded border border-gray-300 text-xl"
      />
    </div>
  );
}
