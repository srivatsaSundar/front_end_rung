// imports
import '../static/card.css'
import CitySearch from "../components/citysearch";
import { Footer } from "../components/footer";
import React from 'react';
import { SocialLogin } from "../components/socialmedia";
import AppNavbar from "../components/navbar";

export function Home() {

  // home page
  return (
    <div className="yes-1">
      <AppNavbar />

      <CitySearch />

      <div className="home-container">
        <SocialLogin />
      </div>
      <Footer />
    </div>
  );
}
