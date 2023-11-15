// LanguageProvider.js
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [selectedLanguage, setSelectedLanguage] = useState("de");

  const changeLanguage = (newLanguage) => {
    setSelectedLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
