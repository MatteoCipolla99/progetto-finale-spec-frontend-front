import { useState } from "react";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const categories = [
  { value: "tutte", label: "Tutte le categorie", icon: "🏪" },
  { value: "flagship", label: "Top di gamma", icon: "👑" },
  { value: "mid-range", label: "Fascia media", icon: "⭐" },
  { value: "budget", label: "Economici", icon: "💰" },
];

export default function SearchFilters({
  inputValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const hasActiveFilters =
    inputValue || selectedCategory !== "tutte" || sortOrder !== "asc";

  const clearFilters = () => {
    onSearchChange({ target: { value: "" } });
    onCategoryChange("tutte");
    onSortChange("asc");
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow">
            <FaFilter className="text-white w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Cerca e Filtra
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors duration-300"
          >
            <FaTimes className="w-3 h-3" />
            Pulisci filtri
          </button>
        )}
      </div>

      {/* Search input */}
      <div className="relative">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl transition-opacity duration-300 ${
            isSearchFocused ? "opacity-100" : "opacity-0"
          }`}
          style={{ padding: "2px" }}
        >
          <div className="bg-slate-800 rounded-xl h-full w-full"></div>
        </div>

        <div className="relative flex items-center">
          <FaSearch
            className={`absolute left-4 text-slate-400 transition-all duration-300 ${
              isSearchFocused ? "text-blue-400 scale-110" : ""
            }`}
          />
          <input
            type="text"
            placeholder="Cerca smartphone..."
            className="w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl focus:outline-none text-white placeholder-slate-400 transition-all duration-300"
            value={inputValue}
            onChange={onSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Categoria
          </label>
          <select
            className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map((cat) => (
              <option
                key={cat.value}
                value={cat.value}
                className="bg-slate-800"
              >
                {cat.icon} {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Ordinamento
          </label>
          <select
            className="w-full p-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="asc" className="bg-slate-800">
              📈 A-Z
            </option>
            <option value="desc" className="bg-slate-800">
              📉 Z-A
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
