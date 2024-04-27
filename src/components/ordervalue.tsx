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
import { HStack } from "@chakra-ui/react";

export function OrderValue() {
  const { selectedLanguage } = useLanguage(); // Access the selected language

  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const api = "https://api.mrrung.com/orders_lists/";

  const fetchData = () => {
    axios
      .get(api)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);
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

  const handleDelete = (id) => {
    axios
      .delete(`https://api.mrrung.com/delete_order_list/${id}/`)
      .then((response) => {
        // console.log("Delete Response:", response.data);
        const deleted = () => toast.success("Order deleted successfully!");
        deleted();
        updateData();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
        toast.error("Error deleting order!");
      });
  };

  const scrollToDiv = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    // Filter data based on selected date
    const filtered = data.filter((item) => {
      return item.delivery_date === selectedDate;
    });

    setFilteredData(filtered);
  };

  console.log(selectedDate);

  return (
    <div>
      <div className="yes">
        <AppNavbar />
        <ToastContainer />
      </div>
      <div
        className="holiday"
        id="scrollableDiv"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h3>{translations.order}</h3>
        <HStack spacing={2} justifyContent={"center"} alignSelf={"center"}>
          <h3>Filter order with date</h3>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="Select date to filter"
          />
        </HStack>
        <div className="table-container center-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>id </th>
                <th>person name</th>
                <th>email</th>
                <th>company_name</th>
                <th>phone_number</th>
                <th>cart</th>
                <th>mail_sent</th>
                <th>address</th>
                <th>postal_code</th>
                <th>city</th>
                <th>coupon_code</th>
                <th>total_price</th>
                <th>delivery_option</th>
                <th>delivery_date</th>
                <th>delivery_time</th>
                <th>remarks</th>
                <th>order_date</th>
                <th>delivery_charges</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {selectedDate && filteredData.length > 0
                ? filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.person_name}</td>
                      <td>{item.email}</td>
                      <td>{item.company_name}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.cart}</td>
                      <td>{String(item.mail_sent)}</td>
                      <td>{item.address}</td>
                      <td>{item.postal_code}</td>
                      <td>{item.city}</td>
                      <td>{item.coupon_code}</td>
                      <td>{item.total_price}</td>
                      <td>{item.delivery_option}</td>
                      <td>{item.delivery_date}</td>
                      <td>{item.delivery_time}</td>
                      <td>{item.remarks}</td>
                      <td>{item.order_date}</td>
                      <td>{item.delivery_charges}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.person_name}</td>
                      <td>{item.email}</td>
                      <td>{item.company_name}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.cart}</td>
                      <td>{String(item.mail_sent)}</td>
                      <td>{item.address}</td>
                      <td>{item.postal_code}</td>
                      <td>{item.city}</td>
                      <td>{item.coupon_code}</td>
                      <td>{item.total_price}</td>
                      <td>{item.delivery_option}</td>
                      <td>{item.delivery_date}</td>
                      <td>{item.delivery_time}</td>
                      <td>{item.remarks}</td>
                      <td>{item.order_date}</td>
                      <td>{item.delivery_charges}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
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
