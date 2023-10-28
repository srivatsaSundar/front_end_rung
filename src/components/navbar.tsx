import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Remove NavDropdown
import 'bootstrap/dist/css/bootstrap.min.css';
import Rung from '../images/rung_logo.png';
import { useLanguage } from './LanguageProvider'; // Import the useLanguage hook
import translations_en from '../translations/translation_en.json';
import translations_de from '../translations/translation_de.json';
import Icofont from 'react-icofont';
import style from "../static/nabvar.css"

const AppNavbar = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const navLinkStyle = {
    color: 'white', // Set text color to white
    textDecoration: 'none',
    alignItems: 'center',
    
  };
  const customSelectStyle = {
    background: 'transparent',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    height:"50px"
  };


  const navLinkHoverStyle = {
    color: 'yellow', // Set hover text color
    textDecoration: 'underline', // Add underline when hovered
  };
  const disp = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    changeLanguage(newLanguage);
  };

  const translations = selectedLanguage === 'en' ? translations_en : translations_de;

  return (
    <Navbar expand="lg">
      <Container >
        <Navbar.Brand href="#home" >
          <img src={Rung} alt="Rung Logo" className='nav-logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"  >
          <Nav className="ml-auto" style={disp}>
            <Nav.Link style={navLinkStyle} activeStyle={navLinkHoverStyle} href="/home">{translations.home}</Nav.Link>
            <Nav.Link style={navLinkStyle} activeStyle={navLinkHoverStyle} href="/menu">{translations.menu}</Nav.Link>
            <Nav.Link style={navLinkStyle} activeStyle={navLinkHoverStyle} href="/discount">{translations.discount}</Nav.Link>
            <Nav.Link style={navLinkStyle} activeStyle={navLinkHoverStyle} href="/contact">{translations.contact}</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
      <div className="lang" style={{ display: 'flex', alignItems: 'center' }}>
        <select onChange={handleLanguageChange} value={selectedLanguage} style={customSelectStyle}>
          <option value="en" disabled hidden>{selectedLanguage === 'en' ? 'Language' : ''}</option>
          <option value="de" disabled hidden>{selectedLanguage === 'de' ? 'Sprache' : ''}</option>
          <option value="en" style={{ color: 'gray' }}>English</option>
          <option value="de" style={{ color: 'gray' }}>Deutsch</option>

        </select>
        <Icofont icon="icofont-bag" style={{ color: 'white' }} size="1" />

      </div>
    </Navbar>
  );
};

export default AppNavbar;
