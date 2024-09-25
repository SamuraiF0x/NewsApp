import { useEffect, useState } from "react";

export const useTimer = () => {
  const [showNoArticles, setShowNoArticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNoArticles(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return showNoArticles;
};
