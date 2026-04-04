"use client";

import { useLanguage } from "./LanguageContext";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="lang-toggle">
      <button
        className={lang === "en" ? "lang-btn lang-active" : "lang-btn"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="lang-sep">|</span>
      <button
        className={lang === "it" ? "lang-btn lang-active" : "lang-btn"}
        onClick={() => setLang("it")}
      >
        IT
      </button>
    </div>
  );
}
