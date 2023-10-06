// imports
import { Header } from "../components/header";
import '../static/card.css'
import CitySearch from "../components/citysearch";
import { Footer } from "../components/footer";
import React from 'react';
import { SocialLogin } from "../components/socialmedia";

export function Home() {

// home page
  return (
    <div className="yes-1">
      <Header />
     
      <CitySearch/>

      <div className="home-container">
      <SocialLogin />
      </div>
      <Footer/>
    </div>
  );
}
