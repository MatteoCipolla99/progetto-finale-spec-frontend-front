import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FaBalanceScaleRight } from "react-icons/fa";
import { Footer } from "./Footer";

export default function Compare() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        const comparisonPhones = location.state?.comparisonList;

        if (!comparisonPhones || comparisonPhones.length !== 2) {
          setError(
            "Devi selezionare esattamente 2 smartphone per il confronto"
          );
          setLoading(false);
          return;
        }

        const [phone1Response, phone2Response] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_API_URL}/smartphones/${
              comparisonPhones[0].id
            }`
          ),
          fetch(
            `${import.meta.env.VITE_API_URL}/smartphones/${
              comparisonPhones[1].id
            }`
          ),
        ]);

        if (!phone1Response.ok || !phone2Response.ok) {
          throw new Error("Errore nel recupero dei dettagli");
        }

        const phone1Data = await phone1Response.json();
        const phone2Data = await phone2Response.json();

        setPhones([phone1Data.smartphone, phone2Data.smartphone]);
      } catch (err) {
        setError("Errore nel caricamento del confronto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, [location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || phones.length !== 2) {
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

  const [phone1, phone2] = phones;

  const specs = [
    {
      label: "Prezzo",
      value1: `${phone1.price} €`,
      value2: `${phone2.price} €`,
    },
    {
      label: "Categoria",
      value1: getCategoryLabel(phone1.category),
      value2: getCategoryLabel(phone2.category),
    },
    {
      label: "Schermo",
      value1: `${phone1.screenSize}"`,
      value2: `${phone2.screenSize}"`,
    },
    { label: "RAM", value1: `${phone1.ram} GB`, value2: `${phone2.ram} GB` },
    {
      label: "Memoria",
      value1: `${phone1.storage} GB`,
      value2: `${phone2.storage} GB`,
    },
    {
      label: "Batteria",
      value1: `${phone1.battery} mAh`,
      value2: `${phone2.battery} mAh`,
    },
    { label: "Fotocamera", value1: phone1.camera, value2: phone2.camera },
    { label: "Sistema Operativo", value1: phone1.os, value2: phone2.os },
    {
      label: "Anno di Rilascio",
      value1: phone1.releaseYear,
      value2: phone2.releaseYear,
    },
  ];

  function getCategoryLabel(category) {
    switch (category) {
      case "flagship":
        return "Top di gamma";
      case "mid-range":
        return "Fascia media";
      case "budget":
        return "Economico";
      default:
        return category;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Link
          to="/"
          className="inline-flex items-center mb-8 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Torna alla lista
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 mb-4">
            <FaBalanceScaleRight className="text-gray-500 w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2">
            Confronto Smartphone
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Confronta le specifiche tecniche dei due dispositivi selezionati
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-white/10 text-center">
            <div className="p-6 border-r border-white/10">
              <h2 className="text-2xl font-bold">{phone1.title}</h2>
              <p className="text-gray-500">{phone1.brand}</p>
            </div>
            <div className="p-6 border-r border-white/10 font-bold text-lg text-gray-500">
              <h2 className="text-gray-500">Specifiche</h2>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold">{phone2.title}</h2>
              <p className="text-gray-500">{phone2.brand}</p>
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-3 py-6 px-4 border-b border-white/10">
            <div className="flex justify-center items-center">
              <img
                src={phone1.image}
                alt={phone1.title}
                className="w-32 h-32 object-contain"
              />
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <FaBalanceScaleRight className="w-8 h-8 text-gray-500" />
            </div>
            <div className="flex justify-center items-center">
              <img
                src={phone2.image}
                alt={phone2.title}
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>

          {/* Specifiche con label centrale */}
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="p-6 space-y-4">
              {specs.map((s, i) => (
                <div key={i} className="text-center font-semibold">
                  {s.value1}
                </div>
              ))}
            </div>
            <div className="p-6 space-y-4 text-center text-gray-500 font-medium">
              {specs.map((s, i) => (
                <div key={i}>{s.label}</div>
              ))}
            </div>
            <div className="p-6 space-y-4">
              {specs.map((s, i) => (
                <div key={i} className="text-center font-semibold">
                  {s.value2}
                </div>
              ))}
            </div>
          </div>

          {/* Descrizioni */}
          {(phone1.description || phone2.description) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-t border-white/10">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-bold text-white mb-2">{phone1.title}</h4>
                <p className="text-gray-500">
                  {phone1.description || "Nessuna descrizione disponibile."}
                </p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="font-bold text-white mb-2">{phone2.title}</h4>
                <p className="text-gray-500">
                  {phone2.description || "Nessuna descrizione disponibile."}
                </p>
              </div>
            </div>
          )}

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
