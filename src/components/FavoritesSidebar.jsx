import { FaHeart, FaRegHeart } from "react-icons/fa";
import SmartphoneImage from "./SmartphoneImage";

export default function FavoritesSidebar({
  showFavorites,
  onClose,
  favorites,
  onToggleFavorite,
}) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-slate-900 border-l border-slate-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        showFavorites ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex justify-between items-center">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Preferiti ({favorites.length})
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-68px)] overflow-y-auto">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <FaRegHeart className="text-4xl mb-3 opacity-50" />
            <p>Nessun preferito</p>
          </div>
        ) : (
          <ul>
            {favorites.map((phone) => (
              <li
                key={phone.id}
                className="p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4 bg-slate-800 rounded-lg flex items-center justify-center">
                    <SmartphoneImage
                      src={phone.image}
                      alt={phone.title}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">
                      {phone.title}
                    </h3>
                    <p className="text-sm text-slate-400">{phone.brand}</p>
                  </div>
                  <button
                    onClick={() => onToggleFavorite(phone)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    <FaHeart />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
