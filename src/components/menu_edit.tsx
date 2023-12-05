import React,{useState} from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../static/postcodes.css"
import { Modal } from "react-bootstrap";

//display footer
export function EditMenu() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const navigate = useNavigate;
  const [showModal, setShowModal] = useState(false);
  const [inputData, setInputData] = useState({
    name: '',
    title: '',
    price: '',
    description: '',
  });

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const data = [
    {
      name: 'Chicken',
      price: '$20',
      available: 'True'
    },
    {
      name: 'Beef',
      price: '$20',
      available: 'True'
    },
  ]
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  
  const handleInputChange = (field, value) => {
    setInputData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
      <div >
          <button onClick={handleOpenModal}>+</button>
          </div>
          <div>
          <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div className="mb-3">
    <label>Name:</label>
    <input type="text" className="form-control" value={inputData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Title:</label>
    <input type="text" className="form-control" value={inputData.title} onChange={(e) => handleInputChange('title', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Price:</label>
    <input type="text" className="form-control" value={inputData.price} onChange={(e) => handleInputChange('price', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Description:</label>
    <textarea className="form-control" value={inputData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
  </div>
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
      <div className="menu-edit">
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>{translations.menuEdit}</h2>
        <div className="table-container center-table">
          <table className="styled-table">
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
              {data.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.available}</td>
                  <td><button >Change Availability</button></td>
                  <td><button >Edit</button></td>
                  <td><button >Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="buttons">
          <Link to="/dashboard"><button>{translations.gotodash}</button></Link>
          <button onClick={handleLogout}>{translations.logoutButton} </button>
        </div>
        <div style={{ position: "fixed", bottom: "0px", width: "100%" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
