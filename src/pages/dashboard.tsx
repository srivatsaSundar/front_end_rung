import React from "react";
import { useLanguage } from "../components/LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Link } from "react-router-dom";
import AppNavbar from "../components/navbar";
import { Footer } from "../components/footer";

//display footer
export function Dashboard() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "en" ? translations_en : translations_de;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  return (
    <div>
       <div className="yes">
        <AppNavbar />
        </div>
      <h1>{translations.dashboard}</h1>
      <Link to="/editmenu">
      <h3>{translations.menuname}</h3>
      </Link>
      <Link to="/postcodes">
      <h3>{translations.postcodes}</h3>
      </Link>
      <Link to="/holiday">
      <h3>{translations.holiday}</h3>
      </Link>
      <button onClick={handleLogout}>{translations.logoutButton}</button>
      <Footer />
    </div>
  );
}
  
