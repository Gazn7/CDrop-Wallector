"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Disable smooth scroll to prevent animated scroll-from-restored-position
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    // Re-enable smooth scroll after a frame
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "";
      document.body.style.scrollBehavior = "";
    });
  }, []);

  return null;
}
