import React, { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    if (username === "mrrung" && password === "admin@123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
      toast.success("Admin Login Successful");
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
    <div className="login">
      <div className="login-header">
        <h2>Mr.Rung</h2>
        <h3>{translations.login}</h3>
      </div>
      {isLoggedIn ? (
        // Redirect to next page if logged in
        <Link to="/dashboard">{translations.dashboard}</Link>
      ) : (
        // Display login form if not logged in
        <div className="login-input">
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
