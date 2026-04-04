"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "it" || stored === "en") setLangState(stored);
    } catch (_) {}
  }, []);

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch (_) {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
