import React, { useCallback, useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Link } from "react-router-dom";
import "../static/postcodes.css";
import { Modal } from "react-bootstrap";
import axios from "axios";

//display footer
export function EditMenu() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]); //data is an array of objects [{}]
  let [formData, setFormData] = useState({
    name: "",
    title_name: "",
    price: "",
    description_1: "",
    description_2: "",
    available: true,
    language: "",
  });

  const api = "https://backend-rung.onrender.com/all_values/";
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
  const add_on = data.add_on;
  console.log(add_on);
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
    if (formData.language === "english") {
      delete formData.language;
      // Assuming your backend endpoint is 'https://backend-rung.onrender.com/submit_data/'
      axios
        .post("https://backend-rung.onrender.com/add_menu/", formData)
        .then((response) => {
          console.log("Server Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if needed
        });
    } else {
      delete formData.language;
      axios
        .post("https://backend-rung.onrender.com/add_menu_germen/", formData)
        .then((response) => {
          console.log("Server Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
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
  };

  const handleMenuGerman = () => {
    const targetSection = document.getElementById("target-selection-german");
    console.log(targetSection);
    // Scroll to the target section
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleAddOn = () => {
    const targetSection = document.getElementById("target-selection-add-on");
    console.log(targetSection);
    // Scroll to the target section
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleAvailabilityChange = useCallback((name, available, language) => {
    const newData = {
      name: name,
      available: !available, // Toggle availability
    };

    const apiUrl =
      language === "english"
        ? `https://backend-rung.onrender.com/menu_availability/${name}/`
        : `https://backend-rung.onrender.com/menu_availability_germen/${name}/`;

    axios
      .post(apiUrl, newData)
      .then((response) => {
        console.log("Server Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDelete = (name, language) => {
    if (language === "english") {
      axios
        .delete(`https://backend-rung.onrender.com/delete_menu/${name}/`)
        .then((response) => {
          console.log("Delete Response:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting postal code:", error);
        });
    } else {
      axios
        .delete(`https://backend-rung.onrender.com/delete_menu_germen/${name}/`)
        .then((response) => {
          console.log("Delete Response:", response.data);
        })
        .catch((error) => {
          console.error("Error deleting postal code:", error);
        });
    }
  };
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const [editModalLanguage, setEditModalLanguage] = useState(""); // Added state for language

  const handleOpenEditModal = (item, language) => {
    setSelectedEditItem(item);
    setEditModalOpen(true);
    setEditModalLanguage(language); // Set the language of the edit modal
  };

  const handleCloseEditModal = () => {
    setSelectedEditItem(null);
    setEditModalLanguage(""); // Clear the language when closing the edit modal
    setEditModalOpen(false);
  };

  const handleEditFormChange = (field, value) => {
    setSelectedEditItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    console.log(selectedEditItem);
    if (editModalLanguage === "english") {
      delete selectedEditItem.id;
      delete selectedEditItem.title_image;
      // Assuming your backend endpoint is 'https://backend-rung.onrender.com/submit_data/'
      axios
        .post("https://backend-rung.onrender.com/add_menu/", selectedEditItem)
        .then((response) => {
          console.log("Server Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if needed
        });
    } else {
      delete selectedEditItem.id;
      delete selectedEditItem.title_image;
      axios
        .post(
          "https://backend-rung.onrender.com/add_menu_germen/",
          selectedEditItem,
        )
        .then((response) => {
          console.log("Server Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle errors if needed
        });
    }
  };

  const handleDeleteAddOn = (name) => {
    axios
      .delete(`https://backend-rung.onrender.com/delete_add_on/${name}/`)
      .then((response) => {
        console.log("Delete Response:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting postal code:", error);
      });
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const [addData, setAddData] = useState([
    {
      name: "",
      price: "",
    },
  ]); //data is an array of objects [{}]
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  const handleAddInputChange = (field, value) => {
    setAddData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log(addData);
    axios
      .post("https://backend-rung.onrender.com/add_on/", addData)
      .then((response) => {
        console.log("Server Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors if needed
      });
  };

  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <div className="but">
        <h3 style={{ paddingRight: "10px" }}>Add Item</h3>
        <button
          onClick={handleOpenModal}
          style={{ width: "40px", padding: "3px" }}
        >
          +
        </button>
      </div>
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                value={formData.title_name}
                onChange={(e) =>
                  handleInputChange("title_name", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label>Price:</label>
              <input
                type="text"
                className="form-control"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Description 1:</label>
              <textarea
                className="form-control"
                value={formData.description_1}
                onChange={(e) =>
                  handleInputChange("description_1", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label>Description 2:</label>
              <textarea
                className="form-control"
                value={formData.description_2}
                onChange={(e) =>
                  handleInputChange("description_2", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label>Language</label>
              <select
                className="form-select"
                aria-label="Default select example"
                value={formData.language}
                onChange={(e) => handleInputChange("language", e.target.value)}
              >
                <option value="german">German</option>
                <option value="english">English</option>
              </select>
            </div>
          </Modal.Body>

          <Modal.Footer className="buttons">
            <button onClick={handleCloseModal}>Close</button>
            <button onClick={handleSubmit}>Submit</button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="buttons">
        <button onClick={handleMenu}>Menu English</button>
        <button onClick={handleMenuGerman}>Menu German</button>
        <button onClick={handleAddOn}>Add on</button>
      </div>
      <div className="menu-edit">
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>
          {translations.menuEdit}
        </h2>
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
                {menu ? (
                  menu.map((item, id) => (
                    <tr key={id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{String(item.available)}</td>
                      <td>{item.description_1}</td>
                      <td>{item.description_2}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleAvailabilityChange(
                              item.name,
                              item.available,
                              "english",
                            )
                          }
                        >
                          Change Availability
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleOpenEditModal(item, "english")}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item.name, "english")}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{translations.menuLoad}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {selectedEditItem && (
            <Modal show={editModalOpen} onHide={handleCloseEditModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Edit form goes here */}
                <div className="mb-3">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedEditItem.name}
                    onChange={(e) =>
                      handleEditFormChange("name", e.target.value)
                    }
                  />
                  <label>Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedEditItem.title_name}
                    onChange={(e) =>
                      handleEditFormChange("title_name", e.target.value)
                    }
                  />
                  <label>Price:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedEditItem.price}
                    onChange={(e) =>
                      handleEditFormChange("price", e.target.value)
                    }
                  />
                  <label>Description 1:</label>
                  <textarea
                    className="form-control"
                    value={selectedEditItem.description_1}
                    onChange={(e) =>
                      handleEditFormChange("description_1", e.target.value)
                    }
                  />
                  <label>Description 2:</label>
                  <textarea
                    className="form-control"
                    value={selectedEditItem.description_2}
                    onChange={(e) =>
                      handleEditFormChange("description_2", e.target.value)
                    }
                  />
                </div>
                {/* Add other fields as needed */}
              </Modal.Body>
              <Modal.Footer>
                <button onClick={handleCloseEditModal}>Close</button>
                <button onClick={handleEditFormSubmit}>Submit</button>
              </Modal.Footer>
            </Modal>
          )}
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
                {menu_german ? (
                  menu_german.map((item, id) => (
                    <tr key={id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{String(item.available)}</td>
                      <td>{item.description_1}</td>
                      <td>{item.description_2}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleAvailabilityChange(
                              item.name,
                              item.available,
                              "german",
                            )
                          }
                        >
                          Change Availability
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleOpenEditModal(item, "german")}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item.name, "german")}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{translations.menuLoad}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div id="target-selection-add-on">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h3>Add on</h3>
            <div className="but">
              <button
                onClick={handleOpenAddModal}
                style={{
                  width: "40px",
                  marginTop: "-6px",
                  marginBottom: "0px",
                  padding: "3px",
                }}
              >
                +
              </button>
            </div>
          </div>
          <Modal show={showAddModal} onHide={handleCloseAddModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={addData.name}
                  onChange={(e) => handleAddInputChange("name", e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Price:</label>
                <input
                  type="text"
                  className="form-control"
                  value={addData.price}
                  onChange={(e) =>
                    handleAddInputChange("price", e.target.value)
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="buttons">
              <button onClick={handleCloseAddModal}>Close</button>
              <button onClick={handleAddSubmit}>Submit</button>
            </Modal.Footer>
          </Modal>
          <div className="table-container center-table">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {add_on ? (
                  add_on.map((item, id) => (
                    <tr key={id}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <button onClick={() => handleDeleteAddOn(item.name)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>{translations.menuLoad}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttons" style={{ marginBottom: "70px" }}>
          <Link to="/dashboard">
            <button>{translations.gotodash}</button>
          </Link>
          <button onClick={handleLogout}>{translations.logoutButton} </button>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "0px",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}
