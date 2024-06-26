import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Link } from "react-router-dom";
import "../static/postcodes.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import "react-toastify/dist/ReactToastify.css";

export function ContactView() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const [data, setData] = useState([]);
  const api = "https://api.mrrung.com/get_contact_us/";

  const fetchData = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching data");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = () => {
    fetchData();
  };

  const scrollToDiv = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (message) => {
    axios
      .delete(
        `https://api.mrrung.com/delete_contact_us/${message}/`,
      )
      .then((response) => {
        // console.log("Delete Response:", response.data);
        const deleted = () => toast.success("Contact deleted successfully!");
        deleted();
        updateData();
      })
      .catch((error) => {
        // console.error("Delete Error:", error);
        toast.error("Error deleting contact!");
      });
  };
  
  return (
    <div>
      <div className="yes">
        <AppNavbar />
        <ToastContainer />
      </div>
      <div className="holiday" id="scrollableDiv">
        <h3>{translations.contactUs}</h3>
        <div className="table-container center-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Date</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.date.slice(0,10)} {item.date.slice(12,16)}</td>
                    <td>{item.message}</td>
                    <td><button onClick={() => handleDelete(item.message)}>
                        Delete
                      </button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{translations.contactLoad}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="buttons" style={{ marginBottom: "30px" }}>
          <Link to="/dashboard">
            <button>{translations.gotodash}</button>
          </Link>
          <button onClick={handleLogout}>{translations.logoutButton}</button>
        </div>
        <ScrollToTop
          smooth
          color="black"
          height="10px"
          className="scroll"
          onClick={scrollToDiv}
          top={2}
        />
        <Footer />
      </div>
    </div>
  );
}
