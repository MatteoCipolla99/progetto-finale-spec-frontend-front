import { useState, useMemo } from "react";
import { debounce } from "../utils/debounce";

export function useSmartphoneFilters(smartphones) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("tutte");
  const [sortOrder, setSortOrder] = useState("asc");
  const [inputValue, setInputValue] = useState("");

  // Debounced funzione di ricerca
  const debouncedSearch = useMemo(() => debounce(setSearchTerm, 1000), []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // Filtra e ordina gli smartphone
  const filteredSmartphones = useMemo(() => {
    let filtered = smartphones
      .filter((phone) =>
        phone.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((phone) =>
        selectedCategory === "tutte"
          ? true
          : phone.category === selectedCategory
      );

    return [...filtered].sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }, [smartphones, searchTerm, selectedCategory, sortOrder]);

  return {
    inputValue,
    selectedCategory,
    sortOrder,
    filteredSmartphones,
    handleSearchChange,
    setSelectedCategory,
    setSortOrder,
  };
}
