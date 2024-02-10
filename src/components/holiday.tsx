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

  const [data, setData] = useState([]);
  const api = "http://api.mrrung.com/holiday/";
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
        // Handle errors if needed
      });
  };
  useEffect(() => {
    fetchData();
    console.log(api);
    console.log(data);
  }, []);

  const [formData, setFormData] = useState({
    start_data: "",
    end_data: "",
    start_time: "",
    end_time: "",
    holiday_note: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateData = () => {
    // Fetch data again after form submission or deletion
    fetchData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Assuming your backend endpoint is 'http://api.mrrung.com/submit_data/'
    axios
      .post("http://api.mrrung.com/add_holiday/", formData)
      .then((response) => {
        console.log("Server Response:", response.data);
        const add = () => toast.success("Holiday added successfully!");
        add();
        updateData();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error adding holiday!");
        // Handle errors if needed
      });
  };

  const handleDelete = (startData) => {
    axios
      .delete(`http://api.mrrung.com/delete_holiday/${startData}/`)
      .then((response) => {
        console.log("Delete Response:", response.data);
        // Update the list of holidays after successful deletion
        const deleted = () => toast.success("Holiday deleted successfully!");
        deleted();
        updateData();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error("Error deleting holiday!");
        // Handle errors if needed
      });
  };

  const scrollToDiv = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="yes">
        <AppNavbar />
        <ToastContainer />
      </div>
      <div className="holiday" id="scrollableDiv">
        <h3>{translations.holidayEdit}</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              Start Date:{" "}
              <input
                type="date"
                name="start_data"
                value={formData.start_data}
                onChange={handleInputChange}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              End Date:{" "}
              <input
                type="date"
                name="end_data"
                value={formData.end_data}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Holiday Note:{" "}
            <input
              type="text"
              name="holiday_note"
              value={formData.holiday_note}
              onChange={handleInputChange}
              style={{ width: "77%" }}
            />
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
                <th>Holiday Note</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((item) => (
                  <tr>
                    <td>{item.start_data}</td>
                    <td>{item.end_data}</td>
                    <td>{item.holiday_note}</td>
                    <td>
                      <button onClick={() => handleDelete(item.start_data)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{translations.holidayload}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="buttons" style={{ marginBottom: "30px" }}>
          <Link to="/dashboard">
            <button>{translations.gotodash}</button>
          </Link>
          <button onClick={handleLogout}> {translations.logoutButton}</button>
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
