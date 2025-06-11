import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (phone) => {
    const isFavorite = favorites.some((fav) => fav.id === phone.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== phone.id));
    } else {
      setFavorites([...favorites, phone]);
    }
  };

  const isFavorite = (phoneId) => favorites.some((fav) => fav.id === phoneId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
