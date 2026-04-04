"use client";

import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const handle = (l) => (e) => {
    if (e.type === "touchend") e.preventDefault();
    setLang(l);
  };

  return (
    <div className="lang-toggle">
      <button
        className={lang === "en" ? "lang-btn lang-active" : "lang-btn"}
        onTouchEnd={handle("en")}
        onClick={handle("en")}
      >
        EN
      </button>
      <span className="lang-sep">|</span>
      <button
        className={lang === "it" ? "lang-btn lang-active" : "lang-btn"}
        onTouchEnd={handle("it")}
        onClick={handle("it")}
      >
        IT
      </button>
    </div>
  );
}
