import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-4 text-center">
      <div className="max-w-md mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl font-bold text-red-500/20 animate-pulse">
              404
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Pagina non trovata
        </h1>
        <p className="text-gray-800 mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <FiArrowLeft className="mr-2" />
          Torna alla Home
        </Link>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-600/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-600/20 rounded-full filter blur-3xl -z-10"></div>
      </div>
    </div>
  );
}
