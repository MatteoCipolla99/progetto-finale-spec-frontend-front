import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [smartphones, setSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("tutte");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/smartphones`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella risposta del server");
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data);
        setSmartphones(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Componente per gestire le immagini con fallback
  const SmartphoneImage = ({ src, alt, className }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
      setImageError(true);
      setImageLoading(false);
    };

    const handleImageLoad = () => {
      setImageLoading(false);
    };

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
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoading ? "block" : "block" }}
          />
        )}
      </div>
    );
  };

  // Funzione per mappare le categorie in label leggibili
  const categoryLabel = (cat) => {
    switch (cat) {
      case "flagship":
        return "Top di gamma";
      case "mid-range":
        return "Fascia media";
      case "budget":
        return "Economici";
      default:
        return cat;
    }
  };

  // Filtri e ordinamento
  const filtered = smartphones
    .filter((phone) =>
      phone.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((phone) =>
      selectedCategory === "tutte" ? true : phone.category === selectedCategory
    );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <strong>Errore:</strong> {error}
      </div>
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista Smartphone</h1>

      {/* Filtri */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Cerca per titolo"
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Risultati */}
      {sorted.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Nessun smartphone trovato con i filtri selezionati.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sorted.map((phone) => (
            <div
              key={phone.id}
              className="border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/smartphones/${phone.id}`} className="block">
                <div className="w-full h-64 bg-white flex items-center justify-center rounded-t-lg overflow-hidden">
                  <img
                    src={phone.image}
                    alt={phone.title}
                    className="max-h-full max-w-full object-contain"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
