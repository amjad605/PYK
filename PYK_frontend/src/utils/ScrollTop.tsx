import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch {
        // fallback للمتصفحات اللي مش بتدعم smooth
        window.scrollTo(0, 0);
      }
    });
  }, [pathname]);

  return null;
}
