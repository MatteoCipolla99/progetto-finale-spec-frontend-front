import { useEffect, useState } from "react";
import SearchFilters from "../components/SearchFilters";
import SmartphoneCard from "../components/SmartphoneCard";
import FavoritesSidebar from "../components/FavoritesSidebar";
import FloatingButtons from "../components/FloatingButtons";
import {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
} from "../components/LoadingError";
import { useFavorites } from "../hooks/useFavorites";
import { useComparison } from "../hooks/useComparison";
import { useSmartphoneFilters } from "../hooks/useSmartphoneFilters";
import { Footer } from "../pages/Footer";

export default function Home() {
  const [smartphones, setSmartphones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  // Custom hooks
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { comparisonList, toggleCompare, isInComparison } = useComparison();
  const {
    inputValue,
    selectedCategory,
    sortOrder,
    filteredSmartphones,
    handleSearchChange,
    setSelectedCategory,
    setSortOrder,
  } = useSmartphoneFilters(smartphones);

  // Fetch smartphones data
  useEffect(() => {
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

  // Loading state
  if (loading) return <LoadingSpinner />;

  // Error state
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl mix-blend-overlay"></div>
      </div>

      {/* Favorites sidebar */}
      <FavoritesSidebar
        showFavorites={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      {/* Floating buttons */}
      <FloatingButtons
        favorites={favorites}
        comparisonList={comparisonList}
        onShowFavorites={() => setShowFavorites(true)}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header with gradient text */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            SmartBool Store
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Scopri la nostra collezione di smartphone e trova il dispositivo
            perfetto per te
          </p>
        </div>

        {/* Filters with glassmorphism effect */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 mb-8 shadow-lg">
          <SearchFilters
            inputValue={inputValue}
            onSearchChange={handleSearchChange}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />
        </div>

        {/* Results */}
        {filteredSmartphones.length === 0 ? (
          <EmptyState message="Nessun smartphone trovato con i filtri selezionati." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSmartphones.map((phone) => (
              <SmartphoneCard
                key={phone.id}
                phone={phone}
                isFavorite={isFavorite(phone.id)}
                isInComparison={isInComparison(phone.id)}
                onToggleFavorite={toggleFavorite}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
