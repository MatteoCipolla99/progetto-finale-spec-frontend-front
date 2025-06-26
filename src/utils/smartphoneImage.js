// Mappa modello → immagine (la tua originale)
const smartphoneImagesMap = {
  "iphone 15 pro":
    "https://m.media-amazon.com/images/I/81Wwngkh2OL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "iphone 15":
    "https://m.media-amazon.com/images/I/61eEYLATF9L.__AC_SY445_SX342_QL70_ML2_.jpg",
  "samsung galaxy s24 ultra":
    "https://m.media-amazon.com/images/I/61oRWx985-L.__AC_SY300_SX300_QL70_ML2_.jpg",
  "samsung galaxy a54":
    "https://m.media-amazon.com/images/I/513Mfi-b2VL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "google pixel 8 pro":
    "https://m.media-amazon.com/images/I/71HBgGfmUsL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "oneplus 12":
    "https://m.media-amazon.com/images/I/61trZcCnMvL._AC_UL640_FMwebp_QL65_.jpg",
  "xiaomi 14":
    "https://m.media-amazon.com/images/I/51mQAURXywL._AC_UL640_FMwebp_QL65_.jpg",
  "nothing phone 2":
    "https://m.media-amazon.com/images/I/81uGOCbTaiL._AC_UL640_FMwebp_QL65_.jpg",
  "realme gt 5":
    "https://m.media-amazon.com/images/I/71mNWBH-V1L._AC_UL640_FMwebp_QL65_.jpg",
  "motorola edge 40":
    "https://m.media-amazon.com/images/I/71bmeYvLqTL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "oppo find x6 pro":
    "https://m.media-amazon.com/images/I/71bfhOZiWPL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "honor magic 5 pro":
    "https://m.media-amazon.com/images/I/71ZJ7aVRpYL._AC_SX679_.jpg",
};

const defaultSmartphoneImage =
  "https://via.placeholder.com/300x300?text=Immagine+non+disponibile";

function getImageForPhone(phone) {
  if (!phone || !phone.title) return defaultSmartphoneImage;
  const key = phone.title.toLowerCase().trim();
  return smartphoneImagesMap[key] || defaultSmartphoneImage;
}

export { getImageForPhone };
