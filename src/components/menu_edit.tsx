import React from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../static/postcodes.css"

//display footer
export function EditMenu() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const navigate = useNavigate;
  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const data = [
    {
      name: 'Chicken',
      price: '$20',
      available: 'True'
    },
    {
      name: 'Beef',
      price: '$20',
      available: 'True'
    },
  ]
  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <div className="menu-edit">
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>{translations.menuEdit}</h2>
        <div className="table-container center-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Change Availability</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.available}</td>
                  <td><button >Change Availability</button></td>
                  <td><button >Edit</button></td>
                  <td><button >Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <Link to="/dashboard"><button>{translations.gotodash}</button></Link>
          <button onClick={handleLogout}>{translations.logoutButton} </button>
        </div>
        <div style={{ position: "fixed", bottom: "0px", width: "100%" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
