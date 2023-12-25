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
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { debounce } from 'lodash';

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

  const fetchData = async () => {
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setDatapin(response.data);
    } catch (error) {
      console.error("Error:", error);
      // Handle errors if needed
    }
  };
  const updateUI = async () => {
    await fetchData();
    console.log("UI updated");
  };



  console.log(api);
  console.log(datapin);
  const handlepin = datapin.postal_codes;
  console.log(handlepin, "handle");

  const debouncedUpdateUI = debounce(updateUI, 300);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    updateUI();
  };

  const handleInputChange = (e) => {
    setvalue(e.target.value);
  };


  const handleSubmit = async () => {
    // Assuming value contains the data you want to send
    console.log("Input Data:", value);

    const data = { postal_code: value, available: true };

    try {
      await axios.post("https://backend-rung.onrender.com/add_postal_code/", data);
      console.log("Server Response: Postcode added successfully!");
      toast.success("Postcode added successfully!");
      handleCloseModal();
      debouncedUpdateUI(); // Update UI manually after submitting
    } catch (error) {
      console.error("Full Error Object:", error);
      toast.error("Error adding postcode!");
    }
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
        const availability = () => {
          toast.success("Availability changed successfully!");
          debouncedUpdateUI();
        };
        availability();
        fetchData()
      })
      .catch((error) => {
        // Handle any errors that occurred during the Axios request
        console.error("Error:", error);
        toast.error("Error changing availability!");
      });
  };

  const handleDelete = async (postalCode) => {
    try {
      await axios.delete(`https://backend-rung.onrender.com/delete_postal_code/${postalCode}/`);
      console.log("Delete Response: Postcode deleted successfully!");
      toast.success("Postcode deleted successfully!");
      debouncedUpdateUI(); // Update UI manually after deletion
    } catch (error) {
      console.error("Error deleting postal code:", error);
      toast.error("Error deleting postcode!");
    }
  };

  const scrollToDiv = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
  }, [datapin]);

  return (
    <div>
      <div className="yes">
        <AppNavbar />
        <ToastContainer />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <div className="postcodes" id="scrollableDiv">
          <h3>{translations.postcodesEdit}</h3>
        </div>
        <div className="but" style={{ marginLeft: "40px" }}>
          <button onClick={handleOpenModal}>+</button>
        </div>
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
          <Modal.Footer className="buttons">
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
      <ScrollToTop
        smooth
        color="black"
        height="10px"
        className="scroll"
        onClick={scrollToDiv}
        top={2}
      />
      <div
        style={{
          position: "fixed",
          bottom: "0px",
          width: "100%",
          marginTop: "20px",
        }}> <Footer /></div>

    </div>
  );
}
