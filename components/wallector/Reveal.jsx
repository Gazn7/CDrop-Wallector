"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const t = setTimeout(() => setShown(true), delay);
            io.disconnect();
            return () => clearTimeout(t);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);

    return () => io.disconnect();
  }, [delay]);

  const cls = `reveal${shown ? " in" : ""}${className ? " " + className : ""}`;
  return (
    <Tag ref={ref} className={cls}>
      {children}
    </Tag>
  );
}
