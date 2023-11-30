import React from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";

//display footer
export function EditMenu() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
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
        <h1>Menu Edit</h1>
        <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Change Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.name}</td>
                <td>{item.price}</td>
              <td>{item.available}</td>
              <td><button >Change Availability</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        <button onClick={handleLogout}> Logout </button>
    </div>
  );
}
