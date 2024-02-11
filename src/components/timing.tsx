import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "react-scroll-to-top";

export function Timing() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };
  const { selectedLanguage } = useLanguage();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    shop_opening_time: "",
    shop_closing_time: "",
    shop_delivery_opening_time: "",
    shop_delivery_closing_time: "",
    id: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://api.mrrung.com/shop_time_list/")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching data");
      });
  };

  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;

  const handleEdit = (item) => {
    setEditingData(item);
    setFormData({
      shop_opening_time: item.shop_opening_time,
      shop_closing_time: item.shop_closing_time,
      shop_delivery_opening_time: item.shop_delivery_opening_time,
      shop_delivery_closing_time: item.shop_delivery_closing_time,
      id: 1,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingData(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateData = () => {
    fetchData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://api.mrrung.com/add_shop_time/", formData)
      .then((response) => {
        console.log("Server Response:", response.data);
        const add = () => toast.success("Timings added successfully!");
        add();
        closeModal();
        updateData();
        console.log(formData);
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log(formData);
        toast.error("Error adding timings!");
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
        <h3>{translations.edittimings}</h3>
        <div className="table-container center-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delivery Start Time</th>
                <th>Delivery End Time</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.shop_opening_time}</td>
                    <td>{item.shop_closing_time}</td>
                    <td>{item.shop_delivery_opening_time}</td>
                    <td>{item.shop_delivery_closing_time}</td>
                    <td>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{translations.timingsLoad}</td>
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

        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Timings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Start Time:</label>
              <input
                type="text"
                className="form-control"
                name="shop_opening_time"
                value={formData.shop_opening_time}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label>End Time:</label>
              <input
                type="text"
                className="form-control"
                name="shop_closing_time"
                value={formData.shop_closing_time}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label>Delivery Start Time:</label>
              <input
                type="text"
                className="form-control"
                name="shop_delivery_opening_time"
                value={formData.shop_delivery_opening_time}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label>Delivery End Time:</label>
              <input
                type="text"
                className="form-control"
                name="shop_delivery_closing_time"
                value={formData.shop_delivery_closing_time}
                onChange={handleInputChange}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="buttons">
            <button onClick={closeModal}>Close</button>
            <button onClick={handleSubmit}>Submit</button>
          </Modal.Footer>
        </Modal>
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
