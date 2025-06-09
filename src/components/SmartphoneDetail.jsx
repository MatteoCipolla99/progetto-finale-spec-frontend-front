import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SmartphoneDetail() {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/smartphones/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero del dettaglio");
        return res.json();
      })
      .then((data) => {
        setPhone(data.smartphone);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Componente per l'immagine di dettaglio
  const DetailImage = ({ src, alt }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    return (
      <div className="w-full max-w-md mx-auto mb-6 bg-gray-100 rounded-lg overflow-hidden">
        {imageError ? (
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <div>Immagine non disponibile</div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            )}
            <img
              src={src}
              alt={alt}
              className={`w-full h-auto transition-opacity duration-300 ${
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

  if (!phone)
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Nessun dettaglio disponibile</p>
      </div>
    );

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Pulsante indietro */}
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors"
      >
        ← Torna alla lista
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Immagine */}
          <div className="md:w-1/2 p-6">
            <DetailImage src={phone.image} alt={phone.title} />
          </div>

          {/* Dettagli */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {phone.title}
            </h1>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">Marca:</span>
                <span className="text-gray-800">{phone.brand}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">Categoria:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {categoryLabel(phone.category)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-600">Prezzo:</span>
                <span className="text-2xl font-bold text-green-600">
                  {phone.price}€
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">Schermo</div>
                <div className="font-semibold">{phone.screenSize}"</div>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">Memoria</div>
                <div className="font-semibold">{phone.storage} GB</div>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">RAM</div>
                <div className="font-semibold">{phone.ram} GB</div>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">Batteria</div>
                <div className="font-semibold">{phone.battery} mAh</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Fotocamera:</span>
                <span className="text-gray-800">{phone.camera}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Sistema operativo:
                </span>
                <span className="text-gray-800">{phone.os}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">
                  Anno rilascio:
                </span>
                <span className="text-gray-800">{phone.releaseYear}</span>
              </div>
            </div>

            {phone.description && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Descrizione
                </h3>
                <p className="text-gray-700">{phone.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
