import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSmartphone } from "react-icons/fi";
import { Footer } from "../pages/Footer";

export default function SmartphoneDetail() {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoneData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/smartphones/${id}`
        );
        if (!response.ok) throw new Error("Errore nel recupero del dettaglio");
        const data = await response.json();
        setPhone(data.smartphone);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneData();
  }, [id]);

  const DetailImage = ({ src, alt }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    return (
      <div className="w-full max-w-md mx-auto bg-gradient-to-br from-slate-800 to-purple-900/50 rounded-xl overflow-hidden flex items-center justify-center p-8">
        {imageError ? (
          <div className="h-64 flex items-center justify-center text-gray-800">
            <div className="text-center">
              <div className="text-6xl mb-4">📱</div>
              <div>Immagine non disponibile</div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-64">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm text-center">
        <h3 className="text-xl font-bold text-red-100 mb-2">Errore</h3>
        <p className="text-red-200 mb-4">{error}</p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Torna alla lista
        </Link>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl backdrop-blur-sm text-center">
        <h3 className="text-xl font-bold text-blue-100 mb-2">
          Nessun risultato
        </h3>
        <p className="text-blue-200 mb-4">
          Nessun dettaglio disponibile per questo dispositivo
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Torna alla lista
        </Link>
      </div>
    );
  }

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

  const renderSpecRow = (label, value, unit = "") => (
    <div className="grid grid-cols-12 gap-4 py-3 even:bg-white/5">
      <div className="col-span-5 sm:col-span-4 text-right text-gray-800 font-medium pr-4">
        {label}
      </div>
      <div className="col-span-7 sm:col-span-8 text-left font-semibold text-white">
        {value || "N/A"} {unit}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center mb-8 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Torna alla lista
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 mb-4">
            <FiSmartphone className="text-blue-400 text-2xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Dettaglio Smartphone
          </h1>
          <p className="text-gray-900 max-w-2xl mx-auto">
            Tutte le specifiche tecniche e informazioni sul dispositivo
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="p-6 text-center border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-1">
              {phone.title}
            </h2>
            <p className="text-gray-800">{phone.brand}</p>
          </div>

          {/* Content */}
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2 p-6 border-r border-white/10">
              <DetailImage src={phone.image} alt={phone.title} />
            </div>

            {/* Specs */}
            <div className="md:w-1/2 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                  Specifiche Tecniche
                </h3>

                {renderSpecRow("Prezzo", phone.price, "€")}
                {renderSpecRow("Categoria", categoryLabel(phone.category))}
                {renderSpecRow("Schermo", phone.screenSize, '"')}
                {renderSpecRow("RAM", phone.ram, "GB")}
                {renderSpecRow("Memoria", phone.storage, "GB")}
                {renderSpecRow("Batteria", phone.battery, "mAh")}
                {renderSpecRow("Fotocamera", phone.camera)}
                {renderSpecRow("Sistema Operativo", phone.os)}
                {renderSpecRow("Anno di Rilascio", phone.releaseYear)}
              </div>

              {phone.description && (
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">
                    Descrizione
                  </h3>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-gray-800">{phone.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FiArrowLeft className="mr-2" />
              Torna alla lista
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
