"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const links = [
  { label: "Home", href: "#" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

function MenuOverlay({ open, onClose }) {
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

  // Close menu on scroll
  useEffect(() => {
    if (!open) return;
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
