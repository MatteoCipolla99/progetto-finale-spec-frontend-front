import { useState } from "react";

export function useComparison() {
  const [comparisonList, setComparisonList] = useState([]);

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

  const isInComparison = (phoneId) =>
    comparisonList.some((p) => p.id === phoneId);

  return {
    comparisonList,
    toggleCompare,
    isInComparison,
  };
}
