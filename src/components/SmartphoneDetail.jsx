import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SmartphoneDetail() {
  const { id } = useParams(); // prendi l'id da URL
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

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!phone) return <p>Nessun dettaglio disponibile</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{phone.title}</h1>
      <p>
        <strong>Marca:</strong> {phone.brand}
      </p>
      <p>
        <strong>Categoria:</strong> {phone.category}
      </p>
      <p>
        <strong>Prezzo:</strong> {phone.price} €
      </p>
      <p>
        <strong>Dimensione schermo:</strong> {phone.screenSize}"
      </p>
      <p>
        <strong>Memoria:</strong> {phone.storage} GB
      </p>
      <p>
        <strong>RAM:</strong> {phone.ram} GB
      </p>
      <p>
        <strong>Batteria:</strong> {phone.battery} mAh
      </p>
      <p>
        <strong>Fotocamera:</strong> {phone.camera}
      </p>
      <p>
        <strong>Sistema operativo:</strong> {phone.os}
      </p>
      <p>
        <strong>Anno rilascio:</strong> {phone.releaseYear}
      </p>
      <p>
        <strong>Descrizione:</strong> {phone.description}
      </p>
    </div>
  );
}
