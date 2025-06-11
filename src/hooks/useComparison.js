// hooks/useComparison.js
import { useState, useEffect } from "react";

export function useComparison() {
  const [comparisonList, setComparisonList] = useState([]);

  // Load comparison list from localStorage on mount
  useEffect(() => {
    const storedComparison = localStorage.getItem("comparisonList");
    if (storedComparison) {
      setComparisonList(JSON.parse(storedComparison));
    }
  }, []);

  // Save comparison list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
  }, [comparisonList]);

  const toggleCompare = (phone) => {
    const isSelected = comparisonList.some((p) => p.id === phone.id);

    if (isSelected) {
      setComparisonList(comparisonList.filter((p) => p.id !== phone.id));
    } else if (comparisonList.length < 2) {
      setComparisonList([...comparisonList, phone]);
    } else {
      alert("Puoi confrontare solo 2 smartphone alla volta.");
    }
  };

  const isInComparison = (phoneId) => {
    return comparisonList.some((p) => p.id === phoneId);
  };

  return {
    comparisonList,
    toggleCompare,
    isInComparison,
  };
}
