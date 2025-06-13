import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import SmartphoneImage from "./SmartphoneImage";

export default function SmartphoneCard({
  phone,
  isFavorite,
  isInComparison,
  onToggleFavorite,
  onToggleCompare,
}) {
  const categoryStyles = {
    flagship: "from-purple-600 to-pink-600",
    "mid-range": "from-blue-600 to-cyan-600",
    budget: "from-green-600 to-emerald-600",
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
      {/* Favorite button */}
      <button
        onClick={() => onToggleFavorite(phone)}
        className="absolute top-4 right-4 z-10 p-2 bg-slate-700/80 backdrop-blur rounded-full shadow-lg text-red-400 hover:text-red-300 transition-colors duration-300"
        aria-label={
          isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
        }
      >
        {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>

      <Link to={`/smartphones/${phone.id}`} className="block">
        {/* Image container */}
        <div className="h-64 bg-slate-800 flex items-center justify-center p-4">
          <SmartphoneImage
            src={phone.image}
            alt={phone.title}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product info */}
        <div className="p-5 pt-3">
          <h2 className="text-xl font-semibold text-white mb-2">
            {phone.title}
          </h2>
          <p className="text-slate-300 mb-3">{phone.brand}</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${
              categoryStyles[phone.category]
            } text-white`}
          >
            {phone.category === "flagship"
              ? "Top di gamma"
              : phone.category === "mid-range"
              ? "Fascia media"
              : "Economici"}
          </span>
        </div>
      </Link>

      {/* Compare button */}
      <div className="px-5 pb-5">
        <button
          onClick={() => onToggleCompare(phone)}
          className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-300 ${
            isInComparison
              ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-red-500/25"
              : "bg-gradient-to-r from-blue-500 to-purple-500 shadow-blue-500/25"
          } text-white hover:shadow-lg relative overflow-hidden`}
        >
          <div className="flex items-center justify-center gap-2">
            <FaBalanceScale className="w-4 h-4" />
            <span>
              {isInComparison
                ? "Rimuovi dal confronto"
                : "Aggiungi al confronto"}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
