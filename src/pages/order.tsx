import { Footer } from "../components/footer";
import { SocialLogin } from "../components/socialmedia";
import React, { useEffect, useState } from "react";
import "../static/menu.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppNavbar from "../components/navbar";
import { useLanguage } from "../components/LanguageProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import Cart from "./cart";
import ScrollToTop from "react-scroll-to-top";
import { toast } from "react-toastify";
import { DateTime } from "luxon";

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
  const [selectedPostalCode, setSelectedPostalCode] = useState("");
  const [orderType, setOrderType] = useState("deliver");
  const [Data, setData] = useState({});
  const [confirmation, setConfirmation] = useState(false);
  const [Time, setTime] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [discounts, setDiscounts] = useState([]);
  const discountApi = "https://backend-rung.onrender.com/discount_coupon_list/";

  const fetchDiscountData = () => {
    axios
      .get(discountApi)
      .then((response) => {
        // console.log(response.data);
        setDiscounts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching data");
      });
  };

  useEffect(() => {
    fetchDiscountData();
  }, []);

  let data = {};
  const [pin, setPin] = useState([]);
  const api = "https://backend-rung.onrender.com/code/";

  useEffect(() => {
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => setPin(res))
      .catch((err) => console.log("error in fetching the pin", err));
  }, [api]);
  // console.log(pin);

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
        if (orderType === "deliver") {
          const deliveryCost =
            pin.find((code) => code.postal_code === selectedPostalCode)
              ?.price || 0;
          let totalWithDelivery = calculateTotalPrice(cart) + deliveryCost;

          const couponCodeElement = document.getElementById("couponCode") as HTMLInputElement;
          const couponCode = couponCodeElement?.value;

          const discountDetail = discounts.find((discount) => discount.coupon_code === couponCode);

          console.log(discountDetail)

          if (discountDetail) {
            // Apply the discount percentage if a matching coupon code is found
            const discountPercentage = discountDetail.discount_percentage;
            const discountAmount = totalWithDelivery * (discountPercentage / 100);
            totalWithDelivery -= discountAmount;

            // console.log(`Coupon "${couponCode}" applied. Discounted Amount: ${discountAmount.toFixed(2)}`);
          }

          // Display a confirmation dialogue with the added delivery cost
          const confirmation = window.confirm(
            `Total Price (including delivery cost): ${totalWithDelivery.toFixed(
              2,
            )}/- CHF. Do you want to proceed?`,
          );

          const foundCode = pin.find(
            (code) => code.postal_code === selectedPostalCode,
          );
          // console.log("Found Code:", foundCode);

          if (confirmation) {
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
              email: (document.getElementById("email") as HTMLInputElement)
                ?.value,
              address: (document.getElementById("address") as HTMLInputElement)
                ?.value,
              postal_code: (
                document.getElementById("postcode") as HTMLInputElement
              )?.value,
              city: (document.getElementById("city") as HTMLInputElement)
                ?.value,
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
              total_price: calculateTotalPrice(cart) + deliveryCost,
            };
            setData(data);
            console.log(data);
            setConfirmation(true);
          } else {
            alert("Order canceled.");
          }
        } else {
          const cartItems = cart.map((cartItem) => ({
            item_name: `${cartItem.name}${cartItem.drink ? ` + ${cartItem.drink}` : ""
              }${cartItem.food ? ` + ${cartItem.food}` : ""}`,
            quantity: cartItem.quantity,
            cost: cartItem.price, // You need to update this based on your cart structure
          }));

          data = {
            person_name: (document.getElementById("name") as HTMLInputElement)
              ?.value,
            email: (document.getElementById("email") as HTMLInputElement)
              ?.value,
            address: (document.getElementById("address") as HTMLInputElement)
              ?.value,
            postal_code: (
              document.getElementById("postcode") as HTMLInputElement
            )?.value,
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
          setData(data);
          console.log(data);
          setConfirmation(true);
        }
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

  const sendOrderToBackend = (data) => {
    axios
      .post("https://backend-rung.onrender.com/order/", Data)
      .then((response) => {
        window.location.href = "/placed";
      });
    // console.log("Form Values:", data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://backend-rung.onrender.com/shop_time_list/")
      .then((response) => {
        // console.log(response.data);
        setTime(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching data");
      });
  };

  const generateTimeOptions = () => {
    const currentShopTimings = Time[0];

    const startTime = DateTime.fromISO(currentShopTimings?.shop_delivery_opening_time);
    const endTime = DateTime.fromISO(currentShopTimings?.shop_delivery_closing_time);

    const timeOptions = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      timeOptions.push(currentTime.toFormat("HH:mm"));
      currentTime = currentTime.plus({ minutes: 15 });
    }

    return timeOptions;
  };
  const generateTakeTimeOptions = () => {
    const currentShopTimings = Time[0];

    const startTime = DateTime.fromISO(currentShopTimings?.shop_opening_time);
    const endTime = DateTime.fromISO(currentShopTimings?.shop_closing_time);

    const timeOptions = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
      timeOptions.push(currentTime.toFormat("HH:mm"));
      currentTime = currentTime.plus({ minutes: 15 });
    }

    return timeOptions;
  };

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
                  <select
                    name="postcode"
                    id="postcode"
                    value={selectedPostalCode}
                    onChange={(e) => setSelectedPostalCode(e.target.value)}
                    required
                  >
                    <option value="" disabled selected>
                      {translations.selectPostalCode}
                    </option>
                    {pin.map((code) => (
                      <option key={code.id} value={code.postal_code}>
                        {code.postal_code}
                      </option>
                    ))}
                  </select>
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
                      {generateTimeOptions().map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className="search-time"
                      defaultValue="18:00"
                      id="selectedTime"
                      name="selectedTime"
                      required
                    >
                      {generateTakeTimeOptions().map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
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
                <button className="search-button" onClick={handleOrderAndPay}>
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
