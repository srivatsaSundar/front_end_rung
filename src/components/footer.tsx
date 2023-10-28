// import css
import "../static/header.css";
import React from 'react';
import { useLanguage } from './LanguageProvider'; // Import the useLanguage hook
import translations_en from '../translations/translation_en.json'; // Import English translations
import translations_de from '../translations/translation_de.json'; // Import German translations

//display footer
export function Footer() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations = selectedLanguage === 'en' ? translations_en : translations_de;

    return (
      <div className="footer-container">
        <p className="footer" style={{alignItems:"center",marginTop:"10px"}}>{translations.copyrightNotice} <span >Powered by Team Trio</span></p>  
      </div>
    );
  }