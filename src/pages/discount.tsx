// imports
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SocialLogin } from "../components/socialmedia";
import React from 'react';
import "../static/menu.css";
import { useLanguage } from '../components/LanguageProvider'; // Import the useLanguage hook
import translations_en from '../translations/translation_en.json'; // Import English translations
import translations_de from '../translations/translation_de.json'; // Import German translations
import { Navbar } from "react-bootstrap";
import AppNavbar from "../components/navbar";

export function Discount() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations = selectedLanguage === 'en' ? translations_en : translations_de;

    return (
      // basic contact information
      <div >
        <div className="yes">
         <AppNavbar />
         <div className="up">
         <h3>{translations.discount}</h3>
         <p>{translations.home}&rsaquo; {translations.discount}</p>
         </div>
        </div>
        <div className="title-Discount">
          <h1>{translations.discount}</h1>
          <hr></hr>
        </div>
      <div className="home-container yes">
        <SocialLogin />
      </div>
        <div>
          <Footer />
        </div>
      </div>      
    );
  }
  