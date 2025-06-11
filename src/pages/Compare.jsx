import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBarChart2 } from "react-icons/fi";
import { Footer } from "./Footer";

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
          Torna alla home
        </Link>
      </div>
    );
  }

  if (phones.length !== 2) return null;

  const [phone1, phone2] = phones;

  const renderSpecRow = (label, value1, value2, unit = "") => (
    <div className="grid grid-cols-12 gap-4 py-3 even:bg-white/5">
      <div className="col-span-4 sm:col-span-3 text-right text-gray-700 font-medium">
        {label}
      </div>
      <div className="col-span-4 sm:col-span-3 text-center font-semibold text-white">
        {value1 || "N/A"} {unit}
      </div>
      <div className="col-span-4 sm:col-span-3 text-center font-semibold text-white">
        {value2 || "N/A"} {unit}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center mb-8 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Torna alla lista
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 mb-4">
            <FiBarChart2 className="text-blue-400 text-2xl" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Confronto Smartphone
          </h1>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Confronta le specifiche tecniche dei due dispositivi selezionati
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header with phone names */}
          <div className="grid grid-cols-2 border-b border-white/10">
            <div className="p-6 text-center border-r border-white/10">
              <h2 className="text-2xl font-bold text-white mb-1">
                {phone1.title}
              </h2>
              <p className="text-gray-700">{phone1.brand}</p>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-1">
                {phone2.title}
              </h2>
              <p className="text-gray-700">{phone2.brand}</p>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 py-8 px-6">
            <div className="flex justify-center border-r border-white/10">
              <div className="w-48 h-48 bg-gradient-to-br from-slate-800 to-purple-900/50 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={phone1.image}
                  alt={phone1.title}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=No+Image";
                  }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-slate-800 to-purple-900/50 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  src={phone2.image}
                  alt={phone2.title}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=No+Image";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Specs comparison */}
          <div className="p-6">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                Specifiche Tecniche
              </h3>

              {renderSpecRow("Prezzo", phone1.price, phone2.price, "€")}
              {renderSpecRow(
                "Categoria",
                phone1.category === "flagship"
                  ? "Top di gamma"
                  : phone1.category === "mid-range"
                  ? "Fascia media"
                  : "Economico",
                phone2.category === "flagship"
                  ? "Top di gamma"
                  : phone2.category === "mid-range"
                  ? "Fascia media"
                  : "Economico"
              )}
              {renderSpecRow(
                "Schermo",
                phone1.screenSize,
                phone2.screenSize,
                '"'
              )}
              {renderSpecRow("RAM", phone1.ram, phone2.ram, "GB")}
              {renderSpecRow("Memoria", phone1.storage, phone2.storage, "GB")}
              {renderSpecRow("Batteria", phone1.battery, phone2.battery, "mAh")}
              {renderSpecRow("Fotocamera", phone1.camera, phone2.camera)}
              {renderSpecRow("Sistema Operativo", phone1.os, phone2.os)}
              {renderSpecRow(
                "Anno di Rilascio",
                phone1.releaseYear,
                phone2.releaseYear
              )}
            </div>

            {/* Descriptions */}
            {(phone1.description || phone2.description) && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                  Descrizioni
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-bold text-white mb-2">
                      {phone1.title}
                    </h4>
                    <p className="text-gray-800">
                      {phone1.description || "Nessuna descrizione disponibile."}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="font-bold text-white mb-2">
                      {phone2.title}
                    </h4>
                    <p className="text-gray-800">
                      {phone2.description || "Nessuna descrizione disponibile."}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
