import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SocialLogin } from "../components/socialmedia";
import React, { useState } from 'react';
import "../static/menu.css";
import DatePicker from 'react-datepicker';

export function Order() {
  // Define state variables using the useState hook
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderType, setOrderType] = useState('deliver'); // Default to 'deliver'

  return (
    <div>
      <div className="yes">
        <Header />
      </div>
      <div>
      <div className="yes-order">
        <h1>Ready to eat?</h1>
        <h4>Where do you want your order to be delivered?</h4>
        <hr></hr>
        <form>
          <label>Address</label>
          <input type="text" />
          <label>Postcode</label>
          <input type="text" />
          <label>City</label>
          <input type="text" />
          <h4>How can we reach you?</h4>
          <hr></hr>
          <label>Name</label>
          <input type="text" />
          <label>Email</label>
          <input type="text" />
          <label>Phone Number</label>
          <input type="text" />
          <label>Company name</label>
          <input type="text" />
          <h4>When would you like your food?</h4>
          <hr></hr>
          <input
            type="radio"
            id="deliver"
            name="orderType"
            value="deliver"
            onChange={() => setOrderType('deliver')}
            checked={orderType === 'deliver'}
          />
          <label htmlFor="deliver">Delivery</label>

          <input
            type="radio"
            id="take-away"
            name="orderType"
            value="take-away"
            onChange={() => setOrderType('take-away')}
            checked={orderType === 'take-away'}
          />
          <label htmlFor="take-away">Take Away</label>

          <label>Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
          />
          {orderType === 'deliver' ? (
            <select className="search-time" defaultValue="11:00">
              {Array.from({ length: 33 }, (_, i) => {
                const hour = 11 + Math.floor(i / 4);
                const minute = (i % 4) * 15;
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const period = hour < 12 ? 'AM' : 'PM';
                return (
                  <option key={time} value={time}>
                    {time} {period}
                  </option>
                );
              })}
            </select>
          ) : (
            <select className="search-time" defaultValue="18:00">
              {Array.from({ length: 12 }, (_, i) => {
                const hour = 18 + i;
                const time = `${hour.toString().padStart(2, '0')}:00`;
                const period = 'PM';
                return (
                  <option key={time} value={time}>
                    {time} {period}
                  </option>
                );
              })}
            </select>
          )}

          <label>Remarks</label>
          <input type="textarea" />

          <h5>Coupon code</h5>
          <form>
          <label>Enter coupon code here</label>
          <input type="text" />
          <button className="search-button">Apply Code</button>
          </form>
          <p>When placing an order, you will receive a confirmation, Food Tracker status messages and a request to review the restaurant via email or otherwise (such as push messages).</p>
          <button className="search-button-pay">Order and Pay</button>
        </form>
      </div>
      <div>
        Column2
      </div>
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

