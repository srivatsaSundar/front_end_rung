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
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Contact() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartCount(JSON.parse(storedCart).length); // Assuming cart is an array
    }
  }, []);

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed - Name: ${name}, Value: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assuming your backend endpoint is 'https://api.mrrung.com/create_contact_us/'
    axios
      .post("https://api.mrrung.com/contact_us/", formData)
      .then((response) => {
        console.log("Success", response.data);
        // Handle success, e.g., show a success message
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          message: "",
        });
        toast.success("Message sent successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors if needed
        toast.error("Error in sending message");
      });
  };

  return (
    <div>
      <div style={{ fontSize: 16 }} className="yes">
        <AppNavbar count={cartCount} />
        <ToastContainer />
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
          <form onSubmit={handleSubmit}>
            <div className="name-email">
              <input
                type="text"
                name="name"
                placeholder={translations.formNamePlaceholder}
                value={formData.name}
                onChange={handleInputChange}
                style={{ color: "white" }}
              />
              <input
                type="text"
                name="email"
                placeholder={translations.formEmailPlaceholder}
                value={formData.email}
                onChange={handleInputChange}
                style={{ color: "white" }}
              />
            </div>
            <div className="contact-mobile">
              <input
                type="text"
                name="phone_number"
                placeholder={translations.formMobilePlaceholder}
                value={formData.phone_number}
                onChange={handleInputChange}
                style={{ color: "white" }}
              />
              <br></br>
              <div className="contact-mess">
                <input
                  type="textarea"
                  name="message"
                  placeholder={translations.formMessagePlaceholder}
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{ color: "white" }}
                />
              </div>
            </div>
            <button className="search-b">
              {" "}
              {translations.formSubmitButton}
            </button>
          </form>
        </div>
      </div>
      <ScrollToTop smooth color="black" height="10px" className="scroll" />
      <div className="home-container yes">
        <SocialLogin />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
