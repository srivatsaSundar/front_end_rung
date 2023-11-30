import React from "react";
import { useLanguage } from "../components/LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Link } from "react-router-dom";

//display footer
export function Dashboard() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "en" ? translations_en : translations_de;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/editmenu">
      <h3>Menu edit</h3>
      </Link>
      <Link to="/postcodes">
      <h3>Postcodes edit</h3>
      </Link>
      <Link to="/holiday">
      <h3>Closing edit</h3>
      </Link>
      <button onClick={handleLogout}> Logout </button>
    </div>
  );
}
  
