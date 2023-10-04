// imports
import { Header } from "../components/header";
import { CardHome } from "../components/card";
import '../static/card.css'
import CitySearch from "../components/citysearch";
import { Footer } from "../components/footer";
import React from 'react';

export function Home() {

// home page
  return (
    <div>
      <Header />
     
      <CitySearch/>

      <div className="home-container">
      <CardHome />
      </div>
      <Footer/>
    </div>
  );
}
