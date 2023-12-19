import React,{useCallback, useEffect, useState} from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Navigate, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../static/postcodes.css"
import { Modal } from "react-bootstrap";
import { stringify } from "querystring";
import axios from "axios";
import e from "express";

//display footer
export function EditMenu() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const navigate = useNavigate;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]); //data is an array of objects [{}]
  let [formData, setFormData] = useState({
    name: '',
    title_name: '',
    price: '',
    description_1: '',
    description_2: '',
    available: true,
    language: ''
  });

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
  console.log(data);
  const menu = data.menu;
  console.log(menu);
  const menu_german = data.menu_germen;
  console.log(menu_german);
  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  
    const handleInputChange = (field, value) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(formData.language==="english"){
      delete formData.language;
    // Assuming your backend endpoint is 'https://backend-rung.onrender.com/submit_data/'
    axios.post('https://backend-rung.onrender.com/add_menu/', formData)
      .then(response => {
        console.log('Server Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors if needed
      });
    }
    else{
      delete formData.language;
      axios.post('https://backend-rung.onrender.com/add_menu_germen/', formData)
      .then(response => {
        console.log('Server Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors if needed
      });
    }
  };
  const handleMenu = () => {
    const targetSection = document.getElementById("target-selection-english");

    // Scroll to the target section
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handleMenuGerman = () => {
    const targetSection = document.getElementById("target-selection-german");
    console.log(targetSection);
    // Scroll to the target section
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  }
  const handleAvailabilityChange = useCallback((name, currentAvailability, language) => {
    const newData = {
      name: name,
      available: !currentAvailability, // Toggle availability
    };
    if (language === "english") {
      axios.post(`https://backend-rung.onrender.com/menu_availability/<str:menu_name>/`, newData)
        .then(response => {
          console.log('Server Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      axios.post(`https://backend-rung.onrender.com/menu_availability_german/<str:menu_name>/`, newData)
        .then(response => {
          console.log('Server Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []);

  const handleDelete = (item,language) => {
    if(language==="english"){
    axios.delete(`https://backend-rung.onrender.com/delete_postal_code/${postalCode}/`)
      .then(response => {
        console.log('Delete Response:', response.data);
      })
      .catch(error => {
        console.error('Error deleting postal code:', error);
      });
  }
    else{
      axios.delete(`https://backend-rung.onrender.com/delete_postal_code_german/${postalCode}/`)
      .then(response => {
        console.log('Delete Response:', response.data);
      })
      .catch(error => {
        console.error('Error deleting postal code:', error);
      });
    }
  }
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
    <input type="text" className="form-control" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Title:</label>
    <input type="text" className="form-control" value={formData.title_name} onChange={(e) => handleInputChange('title_name', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Price:</label>
    <input type="text" className="form-control" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Description 1:</label>
    <textarea className="form-control" value={formData.description_1} onChange={(e) => handleInputChange('description_1', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Description 2:</label>
    <textarea className="form-control" value={formData.description_2} onChange={(e) => handleInputChange('description_2', e.target.value)} />
  </div>
  <div className="mb-3">
    <label>Language</label>
    <select className="form-select" aria-label="Default select example" value={formData.language} onChange={(e) => handleInputChange('language', e.target.value)}>
      <option value="german">German</option>
      <option value="english">English</option>
    </select>
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
      <div>
        <button onClick={handleMenu}>Menu English</button>
        <button onClick={handleMenuGerman} >Menu German</button>
      </div>
      <div className="menu-edit">
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>{translations.menuEdit}</h2>
        <div className="table-container center-table">
          <div className="English" id="target-selection-english">
            <h3>Menu English</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Description 1</th>
                <th>Description 2</th>
                <th>Change Availability</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu?(
              menu.map((item,id) => (
                <tr key={id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{String(item.available)}</td>
                  <td>{item.description_1}</td>
                  <td>{item.description_2}</td>
                  <td><button onClick={(e) => handleAvailabilityChange(item.name, item.availability, 'english')}>Change Availability</button></td>
                  <td><button >Edit</button></td>
                  <td><button >Delete</button></td>
                </tr>
              ))
              ):(
                <tr>
                  <td>{translations.menuLoad}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
        <div className="table-container center-table">
          <div className="German" id="target-selection-german">
            <h3>Menu German</h3>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Description 1</th>
                <th>Description 2</th>
                <th>Change Availability</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu_german?(
              menu_german.map((item,id) => (
                <tr key={id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{String(item.available)}</td>
                  <td>{item.description_1}</td>
                  <td>{item.description_2}</td>
                  <td><button onClick={handleAvailabilityChange(item.name,item.availability,'german')}>Change Availability</button></td>
                  <td><button >Edit</button></td>
                  <td><button >Delete</button></td>
                </tr>
              ))
              ):(
                <tr>
                  <td>{translations.menuLoad}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
        <div className="buttons" style={{marginBottom:"70px"}}> 
          <Link to="/dashboard"><button>{translations.gotodash}</button></Link>
          <button onClick={handleLogout}>{translations.logoutButton} </button>
        </div>
        <div style={{ position: "fixed", bottom: "0px", width: "100%", marginTop:"20px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
