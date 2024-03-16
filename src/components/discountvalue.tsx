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

export function Discountvalue() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const [data, setData] = useState([]);
  const [germanData, setGermanData] =useState([]);
  const api = "https://api.mrrung.com/discount_coupon_list/";
  const api_german = "https://api.mrrung.com/discount_coupon_germen/";
  const fetchData = () => {
    axios
      .get(api)
      .then((response) => {
        // console.log(response.data);
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
  const fetchDataGerman = () => {
    axios
      .get(api_german)
      .then((response) => {
        console.log(response.data);
        setGermanData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching data");
      });
  };

  useEffect(() => {
    fetchDataGerman();
  }, []);
  const [formData, setFormData] = useState({
    coupon_code: "",
    discount_percentage: "",
    coupon_name: "",
    coupon_expiry_date: "",
    coupon_description: "",
  });

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
    // console.log(formData);

    axios
      .post("https://api.mrrung.com/add_discount_coupon/", formData)
      .then((response) => {
        // console.log("Server Response:", response.data);
        const add = () => toast.success("Coupon added successfully!");
        add();
        updateData();
        setFormData({
          coupon_code: "",
          discount_percentage: "",
          coupon_name: "",
          coupon_expiry_date: "",
          coupon_description: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error adding coupon!");
      });
  };
  const handleSubmitGerman = (e) => {
    e.preventDefault();
    // console.log(formData);

    axios
      .post("https://api.mrrung.com/add_discount_coupon_germen/", formData)
      .then((response) => {
        // console.log("Server Response:", response.data);
        const add = () => toast.success("Coupon added successfully!");
        add();
        updateData();
        setFormData({
          coupon_code: "",
          discount_percentage: "",
          coupon_name: "",
          coupon_expiry_date: "",
          coupon_description: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error adding coupon!");
      });
  };

  const handleDelete = (couponCode) => {
    axios
      .delete(
        `https://api.mrrung.com/delete_discount_coupon/${couponCode}/`,
      )
      .then((response) => {
        // console.log("Delete Response:", response.data);
        const deleted = () => toast.success("Coupon deleted successfully!");
        deleted();
        updateData();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error("Error deleting coupon!");
      });
  };
  const handleDeleteGerman = (couponCode) => {
    axios
      .delete(
        `https://api.mrrung.com/delete_discount_coupon_germen/${couponCode}/`,
      )
      .then((response) => {
        // console.log("Delete Response:", response.data);
        const deleted = () => toast.success("Coupon deleted successfully!");
        deleted();
        updateData();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error("Error deleting coupon!");
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
        <h3>{translations.discountEdit}</h3>
        <form onSubmit={handleSubmit}>
          <h3>Discount English</h3>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              Coupon Code:{" "}
              <input
                type="text"
                name="coupon_code"
                value={formData.coupon_code}
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
              Discount Percentage:{" "}
              <input
                type="text"
                name="discount_percentage"
                value={formData.discount_percentage}
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
            Coupon Name:{" "}
            <input
              type="text"
              name="coupon_name"
              value={formData.coupon_name}
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
            Coupon Expiry Date:{" "}
            <input
              type="date"
              name="coupon_expiry_date"
              value={formData.coupon_expiry_date}
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
            Coupon Description:{" "}
            <input
              type="text"
              name="coupon_description"
              value={formData.coupon_description}
              onChange={handleInputChange}
              style={{ width: "77%" }}
            />
          </div>
          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
        <form onSubmit={handleSubmitGerman}>
          <h3>Discount German</h3>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              Coupon Code:{" "}
              <input
                type="text"
                name="coupon_code"
                value={formData.coupon_code}
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
              Discount Percentage:{" "}
              <input
                type="text"
                name="discount_percentage"
                value={formData.discount_percentage}
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
            Coupon Name:{" "}
            <input
              type="text"
              name="coupon_name"
              value={formData.coupon_name}
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
            Coupon Expiry Date:{" "}
            <input
              type="date"
              name="coupon_expiry_date"
              value={formData.coupon_expiry_date}
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
            Coupon Description:{" "}
            <input
              type="text"
              name="coupon_description"
              value={formData.coupon_description}
              onChange={handleInputChange}
              style={{ width: "77%" }}
            />
          </div>
          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
        
        <h3>Discount English</h3>
        <div className="table-container center-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Percentage</th>
                <th>Coupon Name</th>
                <th>Coupon Expiry Date</th>
                <th>Coupon Description</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((item) => (
                  <tr key={item.coupon_code}>
                    <td>{item.coupon_code}</td>
                    <td>{item.discount_percentage}</td>
                    <td>{item.coupon_name}</td>
                    <td>{item.coupon_expiry_date}</td>
                    <td>{item.coupon_description}</td>
                    <td>
                      <button onClick={() => handleDelete(item.coupon_code)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{translations.discountLoad}</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
          <h3>Discount German</h3>
          <div className="table-container center-table">
          
          <br></br>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Percentage</th>
                <th>Coupon Name</th>
                <th>Coupon Expiry Date</th>
                <th>Coupon Description</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {germanData ? (
                germanData.map((item) => (
                  <tr key={item.coupon_code}>
                    <td>{item.coupon_code}</td>
                    <td>{item.discount_percentage}</td>
                    <td>{item.coupon_name}</td>
                    <td>{item.coupon_expiry_date}</td>
                    <td>{item.coupon_description}</td>
                    <td>
                      <button onClick={() => handleDeleteGerman(item.coupon_code)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>{translations.discountLoad}</td>
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
