import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import { Footer } from "./footer";
import AppNavbar from "./navbar";
import { Link } from "react-router-dom";
import "../static/postcodes.css";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "react-scroll-to-top";

//display footer
export function Addon() {
  const { selectedLanguage } = useLanguage();
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);

  const api = "https://backend-rung.onrender.com/view_addon/";
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

  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/manage";
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState<any>(null);

  const handleOpenEditModal = (item: any) => {
    setSelectedEditItem(item);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setSelectedEditItem(null);
    setEditModalOpen(false);
  };

  const handleEditFormChange = (field: string, value: string) => {
    setSelectedEditItem((prevItem: any) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  const handleEditFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedEditItem);

    // Assuming your backend endpoint is 'https://backend-rung.onrender.com/submit_data/'
    axios
      .post("https://backend-rung.onrender.com/add_addon/", selectedEditItem)
      .then((response) => {
        console.log("Server Response:", response.data);
        toast.success("Addon added/edited successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors if needed
      });
      window.location.reload();
  };
  const handleDeleteAddOn = (name: string) => {
    axios
      .delete(`https://backend-rung.onrender.com/delete_add_on/${name}/`)
      .then((response) => {
        console.log("Delete Response:", response.data);
        const deleted = () => toast.success("Addon deleted successfully!");
        deleted();
        setTimeout(() => {
          window.location.reload();
        }, 6000);  
      })
      .catch((error) => {
        console.error("Error deleting postal code:", error);
      });
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [addData, setAddData] = useState({
    name: "",
    price: "",
  });

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleAddInputChange = (field: string, value: string) => {
    setAddData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(addData);
    axios
      .post("https://backend-rung.onrender.com/add_addon/", addData)
      .then((response) => {
        console.log("Server Response:", response.data);
        toast.success("Addon added/edited  successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors if needed
      });
  };

  const apis = "https://backend-rung.onrender.com/add_on_food/";
  useEffect(() => {
    fetch(apis)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setNewData(data))
      .catch((err) => console.log("error in fetching the pin", err));
  }, [apis]);

  console.log(newData);

  const [showAddOnFoodModal, setShowAddOnFoodModal] = useState(false);
  const [addOnFoodData, setAddOnFoodData] = useState({
    menu: "",
    menu_germen: "",
    addon: "",
  });

  const handleOpenAddOnFoodModal = () => {
    setShowAddOnFoodModal(true);
  };

  const handleCloseAddOnFoodModal = () => {
    setShowAddOnFoodModal(false);
  };

  const handleAddOnFoodInputChange = (field: string, value: string) => {
    setAddOnFoodData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAddOnFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(addOnFoodData);
    // Assuming your backend endpoint is 'https://backend-rung.onrender.com/add_on_food/'
    axios
      .post("https://backend-rung.onrender.com/add_addon_food/", addOnFoodData)
      .then((response) => {
        console.log("Server Response:", response.data);
        // Optionally, you can fetch the updated data after submitting
        // the new add-on food.
        // fetchNewData();
        handleCloseAddOnFoodModal();
        const add = () => toast.success("Addon Food added successfully!");
        add();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors if needed
      });
  };

  const handleDeleteAddOnFood = (id) => {
    axios
      .delete(`https://backend-rung.onrender.com/delete_addon_food/${id}/`)
      .then((response) => {
        console.log("Delete Response:", response.data);
        // Optionally, you can fetch the updated data after deleting
        // the add-on food.
        // fetchNewData();
        toast.success("AddOn Food deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting add-on food:", error);
      });
  };

  const scrollToDiv = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <div>
      <div className="yes">
        <AppNavbar count={0} />
        <ToastContainer />
      </div>
      <div id="target-selection-add-on">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "30px",
          }}
          id="scrollableDiv"
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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={addData.name}
                onChange={(e) => handleAddInputChange("name", e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                className="form-control"
                value={addData.price}
                onChange={(e) => handleAddInputChange("price", e.target.value)}
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item: any, id: number) => (
                  <tr key={id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => handleOpenEditModal(item)}>
                        Edit
                      </button>
                    </td>
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
        {selectedEditItem && (
          <Modal show={editModalOpen} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="edit-name">Name:</label>
                <input
                  type="text"
                  id="edit-name"
                  className="form-control"
                  value={selectedEditItem.name}
                  onChange={(e) => handleEditFormChange("name", e.target.value)}
                />

                <label htmlFor="edit-price">Price:</label>
                <input
                  type="text"
                  id="edit-price"
                  className="form-control"
                  value={selectedEditItem.price}
                  onChange={(e) =>
                    handleEditFormChange("price", e.target.value)
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="buttons">
              <button onClick={handleCloseEditModal}>Close</button>
              <button onClick={handleEditFormSubmit}>Submit</button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <div id="target-selection-add-on-food">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h3>Add on Food</h3>
          <div className="but">
            <button
              onClick={handleOpenAddOnFoodModal}
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
        <Modal show={showAddOnFoodModal} onHide={handleCloseAddOnFoodModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Add-on Food</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="menuName">English Menu Name:</label>
              <input
                type="text"
                id="menuName"
                className="form-control"
                value={addOnFoodData.menu}
                onChange={(e) =>
                  handleAddOnFoodInputChange("menu", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="menuGermanName">German Menu Name:</label>
              <input
                type="text"
                id="menuGermanName"
                className="form-control"
                value={addOnFoodData.menu_german}
                onChange={(e) =>
                  handleAddOnFoodInputChange("menu_germen", e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="foodName">Add-on Food Name:</label>
              <input
                type="text"
                id="foodName"
                className="form-control"
                value={addOnFoodData.addon}
                onChange={(e) =>
                  handleAddOnFoodInputChange("addon", e.target.value)
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="buttons">
            <button onClick={handleCloseAddOnFoodModal}>Close</button>
            <button onClick={handleAddOnFoodSubmit}>Submit</button>
          </Modal.Footer>
        </Modal>
        <div className="table-container center-table">
          <table className="styled-table">
            <thead>
              <tr>
                <th>English Menu</th>
                <th>German Menu</th>
                <th>Add on</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {newData.length > 0 ? (
                newData.map((item: any, id: number) => (
                  <tr key={id}>
                    <td>{item.menu.name}</td>
                    <td>{item.menu_germen.name}</td>
                    <td>{item.food.name}</td>
                    <td>
                      <button onClick={() => handleDeleteAddOnFood(item.id)}>
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

        <div className="buttons" style={{ marginBottom: "70px" }}>
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
        <div
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}
