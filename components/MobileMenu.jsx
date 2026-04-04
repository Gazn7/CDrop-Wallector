"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import translations from "./translations";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: t.productTitle, href: "#product" },
    { label: t.howTitle, href: "#how-it-works" },
    { label: t.contactTitle, href: "#contact" },
  ];

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

      <div className={`mobile-menu-overlay${open ? " mobile-menu-visible" : ""}`}>
        <nav className="mobile-menu-nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
