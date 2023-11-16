import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap"; // Remove NavDropdown
import "bootstrap/dist/css/bootstrap.min.css";
import Rung from "../images/rung_logo.png";
import { useLanguage } from "./LanguageProvider"; // Import the useLanguage hook
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import Icofont from "react-icofont";
import "../static/navbar.css";

const AppNavbar = ({ count }) => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    alignItems: "center",
  };
  const customSelectStyle = {
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    height: "50px",
  };
  const navLinkHoverStyle = {
    color: "yellow",
    textDecoration: "underline",
  };
  const disp = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    changeLanguage(newLanguage);
  };

  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={Rung} alt="Rung Logo" className="nav-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={disp}>
            <Nav.Link
              style={navLinkStyle}
              activeStyle={navLinkHoverStyle}
              href="/home"
            >
              {translations.home}
            </Nav.Link>
            <Nav.Link
              style={navLinkStyle}
              activeStyle={navLinkHoverStyle}
              href="/menu"
            >
              {translations.menu}
            </Nav.Link>
            <Nav.Link
              style={navLinkStyle}
              activeStyle={navLinkHoverStyle}
              href="/discount"
            >
              {translations.discount}
            </Nav.Link>
            <Nav.Link
              style={navLinkStyle}
              activeStyle={navLinkHoverStyle}
              href="/contact"
            >
              {translations.contact}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div className="lang" style={{ display: "flex", alignItems: "center" }}>
        <select
          onChange={handleLanguageChange}
          value={selectedLanguage}
          style={customSelectStyle}
        >
          <option value="en" disabled hidden>
            {selectedLanguage === "en" ? "Language" : ""}
          </option>
          <option value="de" disabled hidden>
            {selectedLanguage === "de" ? "Sprache" : ""}
          </option>
          <option value="en" style={{ color: "gray" }}>
            English
          </option>
          <option value="de" style={{ color: "gray" }}>
            Deutsch
          </option>
        </select>
        <a href="menu#cart">
          <div style={{ position: "relative", display: "inline-block" }}>
            <Icofont
              icon="icofont-bag"
              style={{ color: "white", paddingLeft: "5px" }}
              size="1"
            />
            {count > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "-12px",
                  background: "red",
                  borderRadius: "50%",
                  padding: "2px 7px",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                {count}
              </div>
            )}
          </div>
        </a>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
