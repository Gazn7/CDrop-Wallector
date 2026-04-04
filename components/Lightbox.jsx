"use client";

import { useState, useEffect } from "react";

export default function Lightbox({ children }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="lightbox-trigger" onClick={() => setOpen(true)}>
        {children}
      </div>
      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
