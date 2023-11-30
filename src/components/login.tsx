// import css
import "../static/header.css";
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

  const handleLogin = async () => {
    if (username === "yes" && password === "no") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");

    }
  };

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;

  return (
    <div className="login">
      <div>
        <h2>Mr.Rung</h2>
        <h3>Login</h3>
      </div>
      {isLoggedIn ? (
        // Redirect to next page if logged in
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        // Display login form if not logged in
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
