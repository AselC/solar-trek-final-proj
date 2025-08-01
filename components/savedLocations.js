export default function SavedLocations({ savedLocations, onSelect, onDelete }) {
  if (!savedLocations || savedLocations.length === 0)
    return <p className="text-sm text-gray-600 mb-6">No saved locations yet.</p>;

  return (
    <div className="mt-6 mb-6 text-left"> 
      <h3 className="text-xl font-bold text-left mb-4 px-1 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">📍 Saved Locations</h3>
      <ul className="space-y-2">
        {savedLocations.map((loc) => (
          <li
            key={loc.id}
            className="flex justify-between items-center bg-white/70 p-3 rounded-xl border border-gray-200"
          >
            <span
              className="cursor-pointer text-sm font-medium text-blue-800 hover:underline"
              onClick={() => onSelect({ lat: loc.lat, lng: loc.lng })}
            >
              {loc.name}
            </span>
            <button
              onClick={() => onDelete(loc.id)}
              className="ml-2 text-xs bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
