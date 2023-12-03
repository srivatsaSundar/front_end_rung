import React from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";

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
            name:'Chicken',
            price:'$20',
            available:'True'
            },
            {
            name:'Beef',
            price:'$20',
            available:'True'
            },
        ]
  return (
    <div>
       <div className="yes">
        <AppNavbar />
        </div>
        <h1>{translations.menuEdit}</h1>
        <div className="table-container">
      <table>
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
          {/* {data.map((item) => (
            <tr>
              <td>{item.name}</td>
                <td>{item.price}</td>
              <td>{item.available}</td>
              <td><button >Change Availability</button></td>
              <td><button >Edit</button></td>
              <td><button >Delete</button></td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
        <Link to="/dashboard"><button>{translations.gotodash}</button></Link>
        <button onClick={handleLogout}>{translations.logoutButton} </button>
        <Footer />
    </div>
  );
}
