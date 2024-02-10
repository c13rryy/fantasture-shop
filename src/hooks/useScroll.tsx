import { useEffect, useState } from "react";

export default function useScroll() {
  const [scrollLength, setScrollLength] = useState({ y: 0, lastY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollLength(prev => {
        const length = window.scrollY;
        return {
          y: length,
          lastY: prev.y,
        };
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return scrollLength;
}
