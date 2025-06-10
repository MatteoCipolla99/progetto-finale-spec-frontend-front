import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBalanceScale } from "react-icons/fa";
import { debounce } from "../utils/debounce";

export default function Home() {
  const [smartphones, setSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("tutte");
  const [sortOrder, setSortOrder] = useState("asc");
  const [comparisonList, setComparisonList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Usa la tua funzione debounce
  const debouncedSearch = debounce(setSearchTerm, 150);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Aggiornamento immediato dell'input visivo
    debouncedSearch(value); // Aggiornamento filtrato con debounce
  };
  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    fetch(`${import.meta.env.VITE_API_URL}/smartphones`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella risposta del server");
        return res.json();
      })
      .then((data) => {
        setSmartphones(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle smartphone in favorites
  const toggleFavorite = (phone) => {
    const isFavorite = favorites.some((fav) => fav.id === phone.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== phone.id));
    } else {
      setFavorites([...favorites, phone]);
    }
  };
  // Save comparison list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
  }, [comparisonList]);

  // Inoltre, aggiungi questo useEffect per caricare la lista di confronto all'avvio:
  useEffect(() => {
    const storedComparison = localStorage.getItem("comparisonList");
    if (storedComparison) {
      setComparisonList(JSON.parse(storedComparison));
    }
  }, []);

  // Toggle smartphone in comparison
  const toggleCompare = (phone) => {
    const isSelected = comparisonList.some((p) => p.id === phone.id);

    if (isSelected) {
      setComparisonList(comparisonList.filter((p) => p.id !== phone.id));
    } else if (comparisonList.length < 2) {
      setComparisonList([...comparisonList, phone]);
    } else {
      alert("Puoi confrontare solo 2 smartphone alla volta.");
    }
  };

  // Image component with loading and error states
  const SmartphoneImage = ({ src, alt, className }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center relative`}
      >
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {imageError ? (
          <div className="text-gray-500 text-center p-4">
            <div className="text-4xl mb-2">📱</div>
            <div className="text-sm">Immagine non disponibile</div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={`${className} ${
              imageLoading ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoading(false)}
            style={{ display: imageLoading ? "none" : "block" }}
          />
        )}
      </div>
    );
  };

  // Category label mapping
  const categoryLabel = (cat) => {
    const labels = {
      flagship: "Top di gamma",
      "mid-range": "Fascia media",
      budget: "Economici",
    };
    return labels[cat] || cat;
  };

  // Filtering and sorting
  const filtered = smartphones
    .filter((phone) =>
      phone.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((phone) =>
      selectedCategory === "tutte" ? true : phone.category === selectedCategory
    );

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  // Render loading state
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  // Render error state
  if (error)
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <strong>Errore:</strong> {error}
      </div>
    );

  return (
    <div className="p-4 pb-20">
      {/* Favorites sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          showFavorites ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Preferiti ({favorites.length})</h2>
          <button
            onClick={() => setShowFavorites(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-60px)]">
          {favorites.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <FaRegHeart className="mx-auto text-4xl mb-2" />
              <p>Nessun preferito aggiunto</p>
            </div>
          ) : (
            <ul>
              {favorites.map((phone) => (
                <li key={phone.id} className="border-b p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-16 h-16 mr-3">
                      <SmartphoneImage
                        src={phone.image}
                        alt={phone.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{phone.title}</h3>
                      <p className="text-sm text-gray-600">{phone.brand}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(phone)}
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label="Rimuovi dai preferiti"
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

      {/* Favorites floating button */}
      <button
        onClick={() => setShowFavorites(true)}
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

      <h1 className="text-2xl font-bold mb-4">Lista Smartphone</h1>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Cerca per titolo"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={handleSearchChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="tutte">Tutte le categorie</option>
            <option value="flagship">Top di gamma</option>
            <option value="mid-range">Fascia media</option>
            <option value="budget">Economici</option>
          </select>

          <select
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ordina A-Z</option>
            <option value="desc">Ordina Z-A</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {sorted.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nessun smartphone trovato con i filtri selezionati.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((phone) => {
            const isFavorite = favorites.some((fav) => fav.id === phone.id);
            const isInComparison = comparisonList.some(
              (p) => p.id === phone.id
            );

            return (
              <div
                key={phone.id}
                className="border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 relative"
              >
                {/* Favorite badge */}
                <button
                  onClick={() => toggleFavorite(phone)}
                  className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow text-red-500 hover:text-red-700"
                  aria-label={
                    isFavorite
                      ? "Rimuovi dai preferiti"
                      : "Aggiungi ai preferiti"
                  }
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>

                <Link to={`/smartphones/${phone.id}`} className="block">
                  <div className="w-full h-64 bg-white flex items-center justify-center rounded-t-lg overflow-hidden">
                    <SmartphoneImage
                      src={phone.image}
                      alt={phone.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      {phone.title}
                    </h2>
                    <p className="text-gray-600 mb-1">{phone.brand}</p>
                    <p className="text-sm text-blue-600 mb-2">
                      {categoryLabel(phone.category)}
                    </p>
                  </div>
                </Link>

                <div className="px-4 pb-4 flex space-x-2">
                  <button
                    onClick={() => toggleCompare(phone)}
                    className={`flex-1 px-3 py-2 rounded text-sm font-semibold ${
                      isInComparison
                        ? "bg-red-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {isInComparison ? "Rimuovi" : "Confronta"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
