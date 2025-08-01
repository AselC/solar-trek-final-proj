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
    <div className="relative mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a location..."
        className="
          w-full px-4 py-3 rounded-2xl
          bg-gradient-to-br from-white/50 via-soft-blue/30 to-white/20
          text-earth font-medium
          shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.08)]
          backdrop-blur-lg border border-white/40
          focus:outline-none focus:ring-2 focus:ring-peach/60
          placeholder:text-earth/50
          transition-all
        "
      />
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white/70 backdrop-blur-md text-earth rounded-2xl shadow-xl border border-white/40 max-h-60 overflow-y-auto">
          {results.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-peach/30 cursor-pointer text-sm transition-colors"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
