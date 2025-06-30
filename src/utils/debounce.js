export function debounce(callback, delay) {
  let timer; // Variabile per memorizzare il timeout
  return (...args) => {
    clearTimeout(timer); // Cancella il timeout precedente se esiste
    timer = setTimeout(() => {
      callback(...args); // Passo tutti gli argomenti eseguendo la funzione originale
    }, delay);
  };
}
