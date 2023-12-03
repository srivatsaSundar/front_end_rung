import React, { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Link } from "react-router-dom";
import AppNavbar from "./navbar";
import { Footer } from "./footer";
//display footer
export function Postcodes() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const [data, setData] = React.useState([]);
  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/manage";
      };
      
      const api= "https://backend-rung.onrender.com/all_values/"
      useEffect(() => {
        fetch(api)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setData(data))
          .catch((err) => console.log("error in fetching the pin", err));
      }, [api]);
      console.log(api)
      console.log(data);
      const handlepin = data.postal_codes;
console.log(handlepin);
  return (
    <div>
       <div className="yes">
        <AppNavbar />
        </div>
        <h1>{translations.postcodesEdit}</h1>
        <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Postcode</th>
            {/* <th>Availability</th> */}
            <th>Change Availability</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {handlepin ? (
   handlepin.map((item, index) => (
            <tr>
              <td>{item.postal_code}</td>
              {/* <td>{item.available}</td> */}
              <td><button >Change Availability</button></td>
              <td><button >Delete</button></td>
            </tr>
          ))
        ) : (
          <tr>
           {translations.Loading}
          </tr>
        )}
        </tbody>
      </table>
    </div>
          <Link to="/dashboard"><button>{translations.gotodash}</button></Link>
        <button onClick={handleLogout}> {translations.logoutButton}</button>
        <Footer />
    </div>
    
  );
}
