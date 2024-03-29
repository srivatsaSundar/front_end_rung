// imports
import { Footer } from "../components/footer";
import { SocialLogin } from "../components/socialmedia";
import React from "react";
import "../static/menu.css";
import { useLanguage } from "../components/LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import AppNavbar from "../components/navbar";
import { useState, useEffect } from "react";
import axios from "axios";

export function Discount() {
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
  const [data, setData] = useState([]);
  const api = translations.urldis;

  const fetchData = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error in dicount:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="yes">
        <AppNavbar count={cartCount} />
        <div
          style={{ paddingTop: 20, paddingBottom: 10, marginTop: 20 }}
          className="up"
        >
          <h3
            style={{
              fontFamily: "Great Vibes",
              fontStyle: "italic",
              color: "white",
            }}
          >
            {translations.discount}
          </h3>
          <p style={{ fontFamily: "Great Vibes", color: "white" }}>
            {translations.home} &rsaquo; {translations.discount}
          </p>
        </div>
      </div>
      <div className="title-Discount">
        <h1 style={{ padding: 20 }}>{translations.discount}</h1>
        <hr></hr>
        <div className="discount-list">
          {data.map((coupon) => (
            <div key={coupon.coupon_code} className="coupon-item">
              <div>
                <h2 style={{ fontSize: "24px", color: "#333", marginBottom: "10px", color: "rgb(196, 80, 7)" }}>{coupon.coupon_code}</h2>
                {/* <p style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>{coupon.coupon_name}</p> */}
                <p style={{ fontSize: "16px", color: "#555", marginBottom: "10px" }}>{translations.getFlat} {coupon.discount_percentage}% {translations.discountPrice}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div className="home-container yes">
        <SocialLogin />
      </div>
      <div>
        <Footer />
      </div>
    </div >
  );
}
