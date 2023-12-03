import React, { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Link, useNavigate } from "react-router-dom";

//display footer
export function Login() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;

  const handleLogin = async () => {
    if (username === "yes" && password === "no") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
      setTimeout(() => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
      }, 600000);
    } else {
      alert(translations.invalidCredentials);
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");

    }
  };

  return (
    <div>
      <div>
        <h2>Mr.Rung</h2>
        <h3>{translations.login}</h3>
      </div>
      {isLoggedIn ? (
        // Redirect to next page if logged in
        <Link to="/dashboard">{translations.dashboard}</Link>
      ) : (
        // Display login form if not logged in
        <div>
          <input 
            type="text"
            placeholder={translations.usernamePlaceholder}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder={translations.passwordPlaceholder}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>{translations.login}</button>
        </div>
      )}
    </div>
  );
}
