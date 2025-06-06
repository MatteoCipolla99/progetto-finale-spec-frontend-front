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

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista Smartphone</h1>

      <input
        type="text"
        placeholder="Cerca per titolo"
        className="border p-2 w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="border p-2 mb-4 w-full"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="tutte">Tutte le categorie</option>
        <option value="flagship">Top di gamma</option>
        <option value="mid-range">Fascia media</option>
        <option value="budget">Economici</option>
      </select>

      <select
        className="border p-2 mb-4 w-full"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">Ordina A-Z</option>
        <option value="desc">Ordina Z-A</option>
      </select>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((phone) => (
          <li key={phone.id} className="border p-4 rounded shadow bg-white">
            <Link to={`/smartphones/${phone.id}`}>
              <h2 className="text-xl font-semibold">{phone.title}</h2>
              <p className="text-gray-600">{phone.brand}</p>
              <p className="text-sm">{categoryLabel(phone.category)}</p>
              <p className="text-sm">Prezzo: {phone.price} €</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
