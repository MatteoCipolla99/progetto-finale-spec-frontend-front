export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    // Accetta multipli argomenti
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args); // Passo tutti gli argomenti
    }, delay);
  };
}
