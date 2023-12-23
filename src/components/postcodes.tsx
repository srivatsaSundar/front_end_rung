import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Link } from "react-router-dom";
import AppNavbar from "./navbar";
import { Footer } from "./footer";
import "../static/postcodes.css";
import { Modal } from "react-bootstrap";
import axios from "axios";

//display footer
export function Postcodes() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const [datapin, setDatapin] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [value, setvalue] = useState("");

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const api = "https://backend-rung.onrender.com/all_values/";
  useEffect(() => {
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setDatapin(data))
      .catch((err) => console.log("error in fetching the pin", err));
  }, [api]);
  console.log(api);
  console.log(datapin);
  const handlepin = datapin.postal_codes;
  console.log(handlepin);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setvalue(e.target.value);
  };

  const handleSubmit = () => {
    // Assuming value contains the data you want to send
    console.log("Input Data:", value);

    const data = { postal_code: value, available: true };

    axios
      .post("https://backend-rung.onrender.com/add_postal_code/", data)
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Server Response:", response.data);

        // Close the modal
        handleCloseModal();
      })
      .catch((error) => {
        // Handle any errors that occurred during the Axios request
        console.log("Full Error Object:", error);
      });
  };

  const handleAvailabilityChange = (postalCode, currentAvailability) => {
    const newData = {
      postal_code: postalCode,
      available: !currentAvailability, // Toggle availability
    };

    axios
      .post(
        `https://backend-rung.onrender.com/postal_change_availability/${postalCode}/`,
        newData,
      )
      .then((response) => {
        // Handle the response from the server if needed
        console.log("Server Response:", response.data);
      })
      .catch((error) => {
        // Handle any errors that occurred during the Axios request
        console.error("Error:", error);
      });
  };

  const handleDelete = (postalCode) => {
    axios
      .delete(
        `https://backend-rung.onrender.com/delete_postal_code/${postalCode}/`,
      )
      .then((response) => {
        console.log("Delete Response:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting postal code:", error);
      });
  };

  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <div className="postcodes">
        <h1>{translations.postcodesEdit}</h1>
      </div>
      <div>
        <button onClick={handleOpenModal}>+</button>
      </div>
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>Postcode:</label>
            <input type="text" value={value} onChange={handleInputChange} />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleCloseModal}>Close</button>
            <button onClick={handleSubmit}>Submit</button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="table-container center-table">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Postcode</th>
              <th>Availability</th>
              <th>Change Availability</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {handlepin ? (
              handlepin.map((item, index) => (
                <tr>
                  <td>{item.postal_code}</td>
                  <td>{String(item.available)}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleAvailabilityChange(
                          item.postal_code,
                          item.available,
                        )
                      }
                    >
                      Change Availability
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.postal_code)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>{translations.Loading}</tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="buttons">
        <Link to="/dashboard">
          <button>{translations.gotodash}</button>
        </Link>
        <button onClick={handleLogout}> {translations.logoutButton}</button>
      </div>
      <Footer />
    </div>
  );
}
