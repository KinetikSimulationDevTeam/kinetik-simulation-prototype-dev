import { useState, useEffect } from "react";

const LoadingReminder = ({ components }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    }, 8000);

    return () => {
      clearInterval(timer);
    };
  }, [components]);

  return components[currentIndex];
};

export default LoadingReminder;
