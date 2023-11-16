// import css
import "../static/header.css";
import React from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";

//display footer
export function Footer() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;

  return (
    <div className="footer-container">
      <p className="footer" style={{ alignItems: "center", marginTop: "10px" }}>
        {translations.copyrightNotice} <span>Powered by Team Trio</span>
      </p>
    </div>
  );
}
