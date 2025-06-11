// components/FloatingButtons.jsx
import { Link } from "react-router-dom";
import { FaHeart, FaBalanceScale } from "react-icons/fa";

export default function FloatingButtons({
  favorites,
  comparisonList,
  onShowFavorites,
}) {
  return (
    <>
      {/* Favorites floating button */}
      <button
        onClick={onShowFavorites}
        className="fixed right-4 bottom-4 bg-red-500 text-white rounded-full p-4 shadow-lg z-40 flex items-center"
        aria-label="Mostra preferiti"
      >
        <FaHeart className="mr-2" />
        <span>{favorites.length}</span>
      </button>

      {/* Comparison floating button */}
      {comparisonList.length > 0 && (
        <Link to="/compare">
          <div className="fixed left-4 bottom-4 bg-blue-500 text-white rounded-full p-4 shadow-lg z-40 flex items-center">
            <FaBalanceScale />
            <span>{comparisonList.length}/2</span>
          </div>
        </Link>
      )}
    </>
  );
}
