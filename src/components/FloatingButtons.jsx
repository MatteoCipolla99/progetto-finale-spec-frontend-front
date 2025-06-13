import { useNavigate } from "react-router-dom";
import { FaHeart, FaBalanceScale } from "react-icons/fa";

export default function FloatingButtons({
  favorites,
  comparisonList,
  onShowFavorites,
}) {
  const navigate = useNavigate();

  const handleCompareClick = () => {
    if (comparisonList.length === 2) {
      // Naviga alla pagina di confronto passando i dati tramite state
      navigate("/compare", {
        state: { comparisonList },
      });
    } else {
      alert(
        `Seleziona esattamente 2 smartphone per il confronto. Attualmente ne hai ${comparisonList.length} selezionati.`
      );
    }
  };

  return (
    <>
      {/* Favorites floating button */}
      {favorites.length > 0 && (
        <button
          onClick={onShowFavorites}
          className="fixed right-4 bottom-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg z-40 flex items-center transition-all duration-300 hover:scale-110"
          aria-label="Mostra preferiti"
        >
          <FaHeart className="mr-2" />
          <span className="font-semibold">{favorites.length}</span>
        </button>
      )}

      {/* Comparison floating button */}
      {comparisonList.length > 0 && (
        <button
          onClick={handleCompareClick}
          className={`fixed left-4 bottom-4 text-white rounded-full p-4 shadow-lg z-40 flex items-center transition-all duration-300 hover:scale-110 ${
            comparisonList.length === 2
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          aria-label={
            comparisonList.length === 2
              ? "Confronta smartphone"
              : "Aggiungi smartphone al confronto"
          }
        >
          <FaBalanceScale className="mr-2" />
          <span className="font-semibold">{comparisonList.length}/2</span>
        </button>
      )}
    </>
  );
}
