// ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // لو في hash (زي /#contact) → scroll للـ section
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // لو مفيش hash → scroll to top
    requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, behavior: "auto" });
      } catch {
        window.scrollTo(0, 0);
      }
    });
  }, [pathname, hash]);

  return null;
}
