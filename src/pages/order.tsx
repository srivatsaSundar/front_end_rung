import { Footer } from "../components/footer";
import { SocialLogin } from "../components/socialmedia";
import React, { useState } from "react";
import "../static/menu.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppNavbar from "../components/navbar";
import { useLanguage } from "../components/LanguageProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Cart from "./cart";
import ScrollToTop from "react-scroll-to-top";
interface IOrder {
  ref;
  removeFromCart;
  cart;
  increaseQuantity;
  calculateItemPrice;
  calculateTotalPrice;
  deleteFromCart;
  translations;
  setCart;
}

export function Order(props: IOrder) {
  const {
    ref,
    removeFromCart,
    cart,
    increaseQuantity,
    calculateItemPrice,
    calculateTotalPrice,
    deleteFromCart,
    translations,
  } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderType, setOrderType] = useState("deliver");
  const { selectedLanguage } = useLanguage();
  const [Data, setData] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  // Define translations based on the selected language
  // const translations =selectedLanguage === "en" ? translations_en : translations_de;
  let data = {};
  const handleOrderAndPay = () => {
    const currentDate = new Date();
    const selectedDateTime = selectedDate ? new Date(selectedDate) : null;
    const selectedTimeElement = document.getElementById("selectedTime");

    if (selectedDateTime && selectedTimeElement) {
      const selectedTime = (
        selectedTimeElement as HTMLSelectElement
      ).value.split(":");
      selectedDateTime.setHours(parseInt(selectedTime[0], 10));
      selectedDateTime.setMinutes(parseInt(selectedTime[1], 10));
    }

    if (selectedDateTime && selectedDateTime > currentDate) {
      const importantFields = [
        { name: "name", label: translations.name },
        { name: "email", label: translations.email },
        { name: "address", label: translations.address },
        { name: "postcode", label: translations.postcode },
        { name: "city", label: translations.city },
      ];

      const missingFields = importantFields.filter((field) => {
        const inputElement = document.querySelector(
          `[name=${field.name}]`,
        ) as HTMLInputElement;
        const value = inputElement ? inputElement.value : "";
        return value.trim() === "";
      });

      if (missingFields.length === 0 && cart.length > 0) {
        const formattedDate = `${selectedDateTime.getFullYear()}-${(
          selectedDateTime.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${selectedDateTime
            .getDate()
            .toString()
            .padStart(2, "0")}`;

        // Map cart items to the format you want
        const cartItems = cart.map((cartItem) => ({
          item_name: `${cartItem.name}${cartItem.drink ? ` + ${cartItem.drink}` : ""
            }${cartItem.food ? ` + ${cartItem.food}` : ""}`,
          quantity: cartItem.quantity,
          cost: cartItem.price, // You need to update this based on your cart structure
        }));

        data = {
          person_name: (document.getElementById("name") as HTMLInputElement)
            ?.value,
          email: (document.getElementById("email") as HTMLInputElement)?.value,
          address: (document.getElementById("address") as HTMLInputElement)
            ?.value,
          postal_code: (document.getElementById("postcode") as HTMLInputElement)
            ?.value,
          city: (document.getElementById("city") as HTMLInputElement)?.value,
          phone_number: (
            document.getElementById("phoneNumber") as HTMLInputElement
          )?.value,
          company_name: (
            document.getElementById("companyName") as HTMLInputElement
          )?.value,
          delivery_option: orderType,
          delivery_date: formattedDate,
          delivery_time: (
            document.getElementById("selectedTime") as HTMLInputElement
          )?.value,
          remarks: (document.getElementById("remarks") as HTMLInputElement)
            ?.value,
          coupon_code: (
            document.getElementById("couponCode") as HTMLInputElement
          )?.value,
          cart: JSON.stringify(cartItems), // Include cart items in the order
          total_price: calculateTotalPrice(cart),
        };
        console.log("data", data);
        console.log("scart", cart);
        setData(data);
        setConfirmation(true);
      } else {
        const missingFieldLabels = missingFields
          .map((field) => field.label)
          .join(", ");
        const cartValidationMessage =
          cart.length === 0 ? "Your cart is empty." : "";
        const errorMessage = `${missingFieldLabels} ${cartValidationMessage}`;
        alert(`Please fill out the following fields: ${errorMessage}`);
      }
    } else {
      alert("Please select a date and time in the future.");
    }
  };

  console.log(Data, "Data");
  const sendOrderToBackend = (data) => {
    console.log("Data -asxjh", Data);
    console.log(Data);
    axios
      .post("https://backend-rung.onrender.com/order/", Data)
      .then((response) => {
        window.location.href = "/placed";
        console.log("Success:", response);
      });
  };

  console.log(cart.length, "order");

  return (
    <div>
      <div className="yes">
        <AppNavbar />
      </div>
      <div>
        <div className="order-columns">
          <div className="yes-order">
            <h1>{translations.readyToEat}</h1>
            <h4>{translations.contactInformation}</h4>
            <hr />
            <form id="order-form">
              <div className="address">
                <div className="name">
                  <label>{translations.name}</label>
                  <br />
                  <input name="name" id="name" type="text" required />
                </div>
                <div className="name">
                  <label>{translations.email}</label>
                  <br />
                  <input name="email" id="email" type="text" required />
                </div>
              </div>
              <div className="address">
                <div className="name">
                  <label htmlFor="phoneNumber">
                    {translations.phoneNumber}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                  />
                </div>
                <div className="name">
                  <label htmlFor="companyName">
                    {translations.companyName}
                  </label>
                  <br />
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                  />
                </div>
              </div>
              <h4>{translations.deliveryLocation}</h4>
              <hr />
              <div className="address">
                <div className="add">
                  <label>{translations.address}</label>
                  <br />
                  <input name="address" id="address" type="text" required />
                </div>
                <div>
                  <label>{translations.postcode}</label>
                  <br />
                  <input name="postcode" id="postcode" type="text" required />
                </div>
                <div>
                  <label>{translations.city}</label>
                  <br />
                  <input name="city" id="city" type="text" required />
                </div>
              </div>

              <h4>{translations.foodDeliveryTime}</h4>
              <hr />
              <div className="address-1">
                <div>
                  <input
                    type="radio"
                    id="deliver"
                    name="orderType"
                    value="deliver"
                    onChange={() => setOrderType("deliver")}
                    checked={orderType === "deliver"}
                  />
                  <label htmlFor="deliver">{translations.delivery}</label>
                </div>
                <div className="take-away">
                  <input
                    type="radio"
                    id="take-away"
                    name="orderType"
                    value="take-away"
                    onChange={() => setOrderType("take-away")}
                    checked={orderType === "take-away"}
                  />
                  <label htmlFor="take-away">{translations.takeAway}</label>
                </div>
              </div>
              <div className="address-2">
                <div>
                  <label htmlFor="selectedDate">
                    {translations.selectDate}
                  </label>
                  <br />
                  <DatePicker
                    id="selectedDate"
                    name="selectedDate"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText={translations.dateFormat}
                    className="input-date"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="selectedTime">
                    {translations.selectTime}
                  </label>
                  <br />
                  {orderType === "deliver" ? (
                    <select
                      className="search-time-yes"
                      defaultValue="11:00"
                      id="selectedTime"
                      name="selectedTime"
                      required
                    >
                      {Array.from({ length: 13 }, (_, i) => {
                        const hour = 18 + Math.floor(i / 4);
                        const minute = (i % 4) * 15;
                        const time = `${hour
                          .toString()
                          .padStart(2, "0")}:${minute
                            .toString()
                            .padStart(2, "0")}`;

                        return (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <select
                      className="search-time"
                      defaultValue="18:00"
                      id="selectedTime"
                      name="selectedTime"
                      required
                    >
                      {Array.from({ length: 13 }, (_, i) => {
                        const hour = 18 + Math.floor(i / 4);
                        const minute = (i % 4) * 15;
                        const time = `${hour
                          .toString()
                          .padStart(2, "0")}:${minute
                            .toString()
                            .padStart(2, "0")}`;

                        return (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>
              <div className="rem">
                <label htmlFor="remarks">{translations.remarks}</label>
                <div className="contact-mess-1">
                  <input type="textarea" id="remarks" name="remarks" />
                </div>
              </div>
              <h5 className="h5-header">{translations.couponCode}</h5>
              <hr />
              <label htmlFor="couponCode">{translations.enterCouponCode}</label>
              <br />
              <div className="code">
                <input type="text" id="couponCode" name="couponCode" />
                <button className="search-button">
                  {translations.applyCode}
                </button>
              </div>
              <p>{translations.orderConfirmation}</p>
              <button
                className="search-button-pay"
                type="button"
                onClick={handleOrderAndPay}
              >
                {translations.orderAndPay}
              </button>
            </form>
            {confirmation && (
              <div className="confirmation-dialog">
                <p>{translations.placed}</p>
                <Link to="/placed">
                  <button
                    className="search-button"
                    onClick={() => sendOrderToBackend(data)}
                  >
                    OK
                  </button>
                </Link>
                <button
                  className="search-button"
                  type="submit"
                  onClick={() => setConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
          {/* //// */}
          <div className="order-cart">
            <Cart
              ref={ref}
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              deleteFromCart={deleteFromCart}
              calculateItemPrice={calculateItemPrice}
              calculateTotalPrice={calculateTotalPrice}
              translations={translations}
              isMenu={true}
              style={{ margin: "20px" }}
            />
          </div>
        </div>
        <ScrollToTop smooth color="black" height="10px" className="scroll" />
        <div className="home-container yes">
          <SocialLogin />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
