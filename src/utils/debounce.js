export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    // Accetta multipli argomenti
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args); // Passa tutti gli argomenti
    }, delay);
  };
}
