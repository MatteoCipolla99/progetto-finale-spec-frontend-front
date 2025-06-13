import { useState } from "react";

export function useComparison() {
  const [comparisonList, setComparisonList] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "warning",
  });

  const showToast = (message, type = "warning") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: "", type: "warning" });
  };

  const toggleCompare = (phone) => {
    const isSelected = comparisonList.some((p) => p.id === phone.id);

    if (isSelected) {
      setComparisonList(comparisonList.filter((p) => p.id !== phone.id));
    } else if (comparisonList.length < 2) {
      setComparisonList([...comparisonList, phone]);
      showToast(`${phone.title} aggiunto al confronto!`, "success");
    } else {
      showToast(
        "Puoi confrontare massimo 2 smartphone alla volta. Rimuovi uno smartphone dal confronto per aggiungerne un altro.",
        "warning"
      );
    }
  };

  const isInComparison = (phoneId) => {
    return comparisonList.some((p) => p.id === phoneId);
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return {
    comparisonList,
    toggleCompare,
    isInComparison,
    clearComparison,
    toast,
    hideToast,
  };
}
