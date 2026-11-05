import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Component
 * Ensures that whenever a user navigates to any route,
 * the viewport resets smoothly and efficiently to the very top without forced reflow.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!hash) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    } else {
      const targetId = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, [pathname, hash]);

  return null;
}
