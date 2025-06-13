import { useEffect } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

export function Toast({
  message,
  type = "warning",
  isVisible,
  onClose,
  duration = 2000,
}) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    warning: "bg-gradient-to-r from-blue-500 to-purple-500 shadow-blue-500/25",
    error: "bg-gradient-to-r from-red-500 to-pink-500",
    success: "bg-gradient-to-r from-green-500 to-emerald-500",
    info: "bg-gradient-to-r from-blue-500 to-purple-500",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div
        className={`${typeStyles[type]} text-white px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 max-w-sm`}
      >
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-sm leading-relaxed">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
