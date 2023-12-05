import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Link } from "react-router-dom";
import AppNavbar from "./navbar";
import { Footer } from "./footer";
import "../static/postcodes.css"
import { Modal } from "react-bootstrap";


//display footer
export function Postcodes() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputData, setInputData] = useState('');

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const api = "https://backend-rung.onrender.com/all_values/"
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
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = () => {
    // Do something with the input data, e.g., send it to the server
    console.log('Input Data:', inputData);

    // Close the modal
    handleCloseModal();
  };

  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <div className="postcodes">
        <h1>{translations.postcodesEdit}</h1>
        
      </div>
        <div >
          <button onClick={handleOpenModal}>+</button>
          </div>
          <div>
          <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Input Data:</label>
          <input type="text" value={inputData} onChange={handleInputChange} />
        </Modal.Body>
        <Modal.Footer>
          <button  onClick={handleCloseModal}>
            Close
          </button>
          <button onClick={handleSubmit}>
            Submit
          </button>
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
      
      <div className="buttons">
        <Link to="/dashboard"><button>{translations.gotodash}</button></Link>
        <button onClick={handleLogout}> {translations.logoutButton}</button>
      </div>
      <Footer />
    </div>
  );
}
