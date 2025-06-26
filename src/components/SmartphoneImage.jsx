import { useState, useMemo } from "react";
import { getImageForPhone } from "../utils/smartphoneImage";

export default function SmartphoneImage({ phone, alt, className = "" }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const src = useMemo(() => getImageForPhone(phone), [phone]);

  return (
    <div
      className={`${className} bg-gray-100 flex items-center justify-center relative`}
    >
      {imageLoading && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {imageError ? (
        <div className="text-gray-500 text-center p-4">
          <div className="text-4xl mb-2">📱</div>
          <div className="text-sm">Immagine non disponibile</div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${className} ${
            imageLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
