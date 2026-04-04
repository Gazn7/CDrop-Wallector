"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

function MenuOverlay({ open, onClose }) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const links = [
    { label: t.productTitle, href: "#product" },
    { label: t.howTitle, href: "#how-it-works" },
    { label: t.contactTitle, href: "#contact" },
  ];

  return (
    <div className={`mobile-menu-overlay${open ? " mobile-menu-visible" : ""}`}>
      <nav className="mobile-menu-nav">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu-link"
            onClick={onClose}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="mobile-menu-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        <span className={`hamburger${open ? " hamburger-open" : ""}`}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {mounted && createPortal(
        <MenuOverlay open={open} onClose={() => setOpen(false)} />,
        document.body
      )}
    </>
  );
}
