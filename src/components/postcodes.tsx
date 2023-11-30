import React from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
//display footer
export function Postcodes() {
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
            postcode:'12345',
            available:'True'
            },
            {
            postcode:'12346',
            available:'True'
            },
        ]
  return (
    <div>
        <h1>Postcodes Edit</h1>
        <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Postcode</th>
            <th>Availability</th>
            <th>Change Availability</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.postcode}</td>
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
function setState(arg0: { data: any[]; }) {
    throw new Error("Function not implemented.");
}

