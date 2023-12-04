import React from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Link } from "react-router-dom";
import "../static/postcodes.css"

//display footer
export function Holiday() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const data = [
    {
      startdate: '2021-08-01',
      enddate: '2021-08-02',
      starttime: '12:00',
      endtime: '13:00'
    },
    {
      startdate: '2021-08-02',
      enddate: '2021-08-03',
      starttime: '12:00',
      endtime: '13:00'
    },
  ]
  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <div className="holiday">
        <h3>{translations.holidayEdit}</h3>
        <form>
          <div>
            Start Date :<input type="date" id="start" name="startdate" />
            End Date : <input type="date" id="end" name="enddate" />
            Start Time :<input type="time" id="start" name="starttime" />
            End Time : <input type="time" id="end" name="endtime" />
          </div>
          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div className="table-container center-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.startdate}</td>
                  <td>{item.enddate}</td>
                  <td>{item.starttime}</td>
                  <td>{item.endtime}</td>
                  <td><button >Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttons" style={{ marginBottom: "30px" }}>
          <Link to="/dashboard"><button>{translations.gotodash}</button></Link>
          <button onClick={handleLogout}> {translations.logoutButton}</button>
        </div>
        <Footer />
      </div>
    </div >
  );
}
