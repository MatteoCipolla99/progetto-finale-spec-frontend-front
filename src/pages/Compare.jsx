import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Compare() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const stored = localStorage.getItem("comparisonList");
        if (stored) {
          const parsedPhones = JSON.parse(stored);

          if (parsedPhones.length !== 2) {
            navigate("/");
            return;
          }

          // Recupera i dati completi usando gli ID
          const [phone1Response, phone2Response] = await Promise.all([
            fetch(
              `${import.meta.env.VITE_API_URL}/smartphones/${
                parsedPhones[0].id
              }`
            ),
            fetch(
              `${import.meta.env.VITE_API_URL}/smartphones/${
                parsedPhones[1].id
              }`
            ),
          ]);

          const phone1Data = await phone1Response.json();
          const phone2Data = await phone2Response.json();

          // Estrai i dati degli smartphone dalla risposta API
          setPhones([phone1Data.smartphone, phone2Data.smartphone]);
        } else {
          navigate("/");
        }
      } catch (err) {
        setError("Errore nel caricamento del confronto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, [navigate]);

  const CompareImage = ({ src, alt }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    return (
      <div className="w-full max-w-xs mx-auto mb-4 bg-gray-100 rounded-lg overflow-hidden">
        {imageError ? (
          <div className="h-48 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <div className="text-sm">Immagine non disponibile</div>
            </div>
          </div>
        ) : (
          <div className="relative h-48">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              onLoad={() => setImageLoading(false)}
            />
          </div>
        )}
      </div>
    );
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <strong>Errore:</strong> {error}
        <Link to="/" className="block mt-2 text-blue-600 hover:text-blue-800">
          ← Torna alla lista
        </Link>
      </div>
    );
  }

  if (phones.length !== 2) return null;

  const [phone1, phone2] = phones;

  const categoryLabel = (cat) => {
    switch (cat) {
      case "flagship":
        return "Top di gamma";
      case "mid-range":
        return "Fascia media";
      case "budget":
        return "Economico";
      default:
        return cat;
    }
  };

  // Funzione per formattare i valori
  const formatValue = (value, unit) => {
    if (value === undefined || value === null || value === "") return "N/A";
    return unit ? `${value} ${unit}` : value;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
      >
        ← Torna alla lista
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Confronto Smartphone
      </h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-2 gap-8 p-6 border-b border-gray-200">
          <div className="text-center">
            <CompareImage src={phone1.image} alt={phone1.title} />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {phone1.title}
            </h2>
            <p className="text-lg text-gray-600">{phone1.brand}</p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {categoryLabel(phone1.category)}
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-green-600">
                {formatValue(phone1.price, "€")}
              </span>
            </div>
          </div>

          <div className="text-center">
            <CompareImage src={phone2.image} alt={phone2.title} />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {phone2.title}
            </h2>
            <p className="text-lg text-gray-600">{phone2.brand}</p>
            <div className="mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {categoryLabel(phone2.category)}
              </span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-green-600">
                {formatValue(phone2.price, "€")}
              </span>
            </div>
          </div>
        </div>

        {/* Specifiche principali */}
        <div className="p-6 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Specifiche Principali
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Schermo */}
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">Schermo</div>
              <div className="font-semibold">
                {formatValue(phone1.screenSize, '"')}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">Schermo</div>
              <div className="font-semibold">
                {formatValue(phone2.screenSize, '"')}
              </div>
            </div>

            {/* Memoria */}
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">Memoria</div>
              <div className="font-semibold">
                {formatValue(phone1.storage, "GB")}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">Memoria</div>
              <div className="font-semibold">
                {formatValue(phone2.storage, "GB")}
              </div>
            </div>

            {/* RAM */}
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">RAM</div>
              <div className="font-semibold">
                {formatValue(phone1.ram, "GB")}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">RAM</div>
              <div className="font-semibold">
                {formatValue(phone2.ram, "GB")}
              </div>
            </div>

            {/* Batteria */}
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">Batteria</div>
              <div className="font-semibold">
                {formatValue(phone1.battery, "mAh")}
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded shadow">
              <div className="text-sm text-gray-600">Batteria</div>
              <div className="font-semibold">
                {formatValue(phone2.battery, "mAh")}
              </div>
            </div>
          </div>
        </div>

        {/* Dettagli aggiuntivi */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Altre Caratteristiche
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Fotocamera:</span>
                <span className="text-gray-800">
                  {formatValue(phone1.camera)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Sistema operativo:
                </span>
                <span className="text-gray-800">{formatValue(phone1.os)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Anno di rilascio:
                </span>
                <span className="text-gray-800">
                  {formatValue(phone1.releaseYear)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Fotocamera:</span>
                <span className="text-gray-800">
                  {formatValue(phone2.camera)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Sistema operativo:
                </span>
                <span className="text-gray-800">{formatValue(phone2.os)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Anno di rilascio:
                </span>
                <span className="text-gray-800">
                  {formatValue(phone2.releaseYear)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Descrizioni */}
        {(phone1.description || phone2.description) && (
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Descrizione
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="font-bold text-gray-800 mb-2">{phone1.title}</h4>
                <p className="text-gray-700">
                  {phone1.description || "Nessuna descrizione disponibile."}
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="font-bold text-gray-800 mb-2">{phone2.title}</h4>
                <p className="text-gray-700">
                  {phone2.description || "Nessuna descrizione disponibile."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pulsante per tornare alla lista */}
        <div className="p-6 border-t border-gray-200 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Torna alla lista smartphone
          </Link>
        </div>
      </div>
    </div>
  );
}
