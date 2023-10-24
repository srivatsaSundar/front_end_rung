// imports
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SocialLogin } from "../components/socialmedia";
import React from 'react';
import "../static/menu.css";
import Icofont from 'react-icofont';
import { useLanguage } from '../components/LanguageProvider'; // Import the useLanguage hook
import translations_en from '../translations/translation_en.json'; // Import English translations
import translations_de from '../translations/translation_de.json'; // Import German translations
import { Navbar } from "react-bootstrap";
import AppNavbar from "../components/navbar";

export function Contact() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations = selectedLanguage === 'en' ? translations_en : translations_de;

    return (
      // basic contact information
      <div >
        <div className="yes">
         <AppNavbar />
         <div className="up">
         <h3>{translations.contact}</h3>
         <p>{translations.home} &rsaquo; {translations.contact}</p>
         </div>
        </div>
        <div className="reservation">
          <h1>{translations.contact}</h1>
          <div className="contact-form">
            <form>
              <div className="name-email">
              <input type="text" placeholder={translations.formNamePlaceholder} />
              <input type="text" placeholder={translations.formEmailPlaceholder} />
              </div>
              <div className="contact-mobile">
              <input type="text" placeholder={translations.formMobilePlaceholder}/>
              <br></br>
              <div className="contact-mess">
              <input type="textarea" placeholder={translations.formMessagePlaceholder}/>
              </div>
              <input type="text" placeholder={translations.formCaptchaPlaceholder} />
              <br></br>
              </div>
              <button className='search-b'> {translations.formSubmitButton}</button>
            </form>
          </div>
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
  