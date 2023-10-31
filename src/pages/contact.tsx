// imports
import { Footer } from "../components/footer";
import { SocialLogin } from "../components/socialmedia";
import React from "react";
import "../static/menu.css";
import { useLanguage } from "../components/LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import AppNavbar from "../components/navbar";
import ScrollToTop from "react-scroll-to-top";

export function Contact() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "en" ? translations_en : translations_de;

  return (
    <div>
      <div style={{ fontSize: 16, marginBottom: 10 }} className="yes">
        <AppNavbar />
        <div
          style={{ paddingTop: 20, paddingBottom: 20, marginTop: 30 }}
          className="up"
        >
          <h3
            style={{
              fontFamily: "Great Vibes",
              fontStyle: "italic",
              color: "white",
            }}
          >
            {translations.contact}
          </h3>
          <p style={{ fontFamily: "Great Vibes", color: "white" }}>
            {translations.home} &rsaquo; {translations.contact}
          </p>
        </div>
      </div>
      <div className="reservation">
        <h1>{translations.contact}</h1>
        <div className="contact-form">
          <form>
            <div className="name-email">
              <input
                type="text"
                placeholder={translations.formNamePlaceholder}
              />
              <input
                type="text"
                placeholder={translations.formEmailPlaceholder}
              />
            </div>
            <div className="contact-mobile">
              <input
                type="text"
                placeholder={translations.formMobilePlaceholder}
              />
              <br></br>
              <div className="contact-mess">
                <input
                  type="textarea"
                  placeholder={translations.formMessagePlaceholder}
                />
              </div>
              <input
                type="text"
                placeholder={translations.formCaptchaPlaceholder}
              />
              <br></br>
            </div>
            <button className="search-b">
              {" "}
              {translations.formSubmitButton}
            </button>
          </form>
        </div>
      </div>
      <ScrollToTop smooth  color="black" height="10px" className="scroll"/>
      <div className="home-container yes">
        <SocialLogin />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
