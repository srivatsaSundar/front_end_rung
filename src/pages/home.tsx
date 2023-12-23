// imports
import "../static/card.css";
import CitySearch from "../components/citysearch";
import { Footer } from "../components/footer";
import React from "react";
import { SocialLogin } from "../components/socialmedia";
import AppNavbar from "../components/navbar";
import { useState, useEffect } from "react";

export function Home() {
  // home page
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartCount(JSON.parse(storedCart).length); // Assuming cart is an array
    }
  }, []);

  return (
    <div className="yes-1">
      <AppNavbar count={cartCount} />
      <CitySearch />
      <div className="home-container">
        <SocialLogin />
      </div>
      <Footer />
    </div>
  );
}
