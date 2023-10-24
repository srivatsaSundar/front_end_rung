import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../static/header.css';
import logo from '../images/rung_logo.png';
import Icofont from 'react-icofont';
import LanguageSwitcher from './languageSwitch';
import translations_en from '../translations/translation_en.json';
import translations_de from '../translations/translation_de.json';

export function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default to English

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
  };

  const translations = selectedLanguage === 'English' ? translations_en : translations_de;
  const hamburgerIcon: HTMLElement | null = document.querySelector('.hamburger-icon');
  const hamburgerMenu: HTMLElement | null = document.querySelector('.hamburger-menu');
  
  hamburgerIcon?.addEventListener('click', ():void => {
    hamburgerMenu?.classList.toggle('open');
  });
  
  
  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    
      <div className="navbar">
          <div className="hamburger-icon">
            
            <div className="hamburger-menu-icon">
              <Icofont  className="icon-menu" icon="icofont-navigation-menu" size="2" />
            </div>
            
          </div>
        
        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/home">
          {translations.home}
        </Link>

        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/menu">
          {translations.menu}
        </Link>

        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/discount">
          {translations.discount}
        </Link>

        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/contact">
          {translations.contact}
        </Link>
      </div>
      <div className="lang">
        <select onChange={handleLanguageChange} value={selectedLanguage}>
          <option value="English">English</option>
          <option value="German">German</option>
        </select>
        <Icofont className="icons-loc" icon="icofont-shopping-cart" size="1" />
      </div>
    </div>
  );
}
