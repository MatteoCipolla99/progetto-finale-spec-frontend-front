// hooks/useFavorites.js
import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (phone) => {
    const isFavorite = favorites.some((fav) => fav.id === phone.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== phone.id));
    } else {
      setFavorites([...favorites, phone]);
    }
  };

  const isFavorite = (phoneId) => {
    return favorites.some((fav) => fav.id === phoneId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
