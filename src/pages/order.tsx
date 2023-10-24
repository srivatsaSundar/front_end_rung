import { Footer } from "../components/footer";
import { SocialLogin } from "../components/socialmedia";
import React, { useState } from 'react';
import "../static/menu.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AppNavbar from "../components/navbar";

export function Order() {
  // Define state variables using the useState hook
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderType, setOrderType] = useState('deliver'); // Default to 'deliver'

  return (
    <div>
      <div className="yes">
        <AppNavbar/>
      </div>
      <div>
        <div className="order-columns">
      <div className="yes-order">
        <h1>Ready to eat?</h1>
        <h4>Where do you want your order to be delivered?</h4>
        <hr></hr>
        <form>
          <div className="address">
          <div className="add">
          <label>Address</label><br></br>
          <input type="text" />
          </div>
          <div>
          <label>Postcode</label><br></br>
          <input type="text" />
          </div>
          <div>
          <label>City</label><br></br>
          <input type="text" />
          </div>
          </div>
          <h4>How can we reach you?</h4>
          <hr></hr>
          <div className="address">
            <div className="name">
          <label>Name</label><br></br>
          <input type="text" />
          </div>
          <div className="name">
          <label>Email</label><br></br>
          <input type="text" />
          </div>
          </div>
          <div className="address">
            <div className="name">
          <label>Phone Number</label><br></br>
          <input type="text" />
          </div>
          <div className="name">
          <label>Company name</label><br></br>
          <input type="text" />
          </div>
          </div>
          <h4>When would you like your food?</h4>
          <hr></hr>
          <div className="address-1">
            <div>
          <input
            type="radio"
            id="deliver"
            name="orderType"
            value="deliver"
            onChange={() => setOrderType('deliver')}
            checked={orderType === 'deliver'}
          />
          <label htmlFor="deliver">Delivery</label>
          </div>
          <div className="take-away">
          <input
            type="radio"
            id="take-away"
            name="orderType"
            value="take-away"
            onChange={() => setOrderType('take-away')}
            checked={orderType === 'take-away'}
          />
          <label htmlFor="take-away">Take Away</label>
</div>

          </div>
          <div className="address-2">
            <div>
          <label>Select Date</label><br></br>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            className="input-date"
          />
          </div>
          <div>
          <label>Select Time</label><br></br>
          {orderType === 'deliver' ? (
          
            <select className="search-time-yes" defaultValue="11:00">
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
          </div>
          </div>
          <div className="rem">
          <label>Remarks</label>
          <div className="contact-mess-1">
          <input type="textarea" />
          </div>
</div>

          <h5 className="h5-header">Coupon code</h5>
          <hr></hr>
          <form>

          <label>Enter coupon code here</label><br></br>
          <div className="code">
          <input type="text" />
          <button className="search-button">Apply Code</button>
          </div>
          </form>
          <p>When placing an order, you will receive a confirmation, Food Tracker status messages and a request to review the restaurant via email or otherwise (such as push messages).</p>
          <button className="search-button-pay">Order and Pay</button>
        </form>
      </div>
   
      <div  className="order-cart">
       
      </div>
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

