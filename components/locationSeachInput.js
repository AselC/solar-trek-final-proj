'use client';

import { useState } from 'react';
import debounce from 'lodash.debounce';

export default function LocationSearchInput({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = debounce(async (text) => {
    if (text.length < 2) return;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    setResults(data);
  }, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setResults([]);
    onSelect({
      name: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });
  };

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a location..."
        className="w-full px-4 py-2 rounded-xl border border-white/40 bg-white/30 backdrop-blur-sm font-medium text-earth focus:outline-none"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white/90 text-earth mt-1 max-h-60 overflow-y-auto rounded-xl shadow-lg border border-white/40">
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-peach cursor-pointer text-sm"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
