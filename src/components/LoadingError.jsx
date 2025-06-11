// components/LoadingError.jsx
export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

export function ErrorMessage({ error }) {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      <strong>Errore:</strong> {error}
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="text-center py-8 text-gray-500">
      <p>{message}</p>
    </div>
  );
}
