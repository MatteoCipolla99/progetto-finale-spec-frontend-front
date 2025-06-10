// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Pagina non trovata
      </h1>
      <p className="mb-6">Ops! La pagina che cerchi non esiste.</p>
      <Link to="/" className="text-blue-500 underline">
        Torna alla Home
      </Link>
    </div>
  );
};

export default PageNotFound;
