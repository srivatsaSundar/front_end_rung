import { Footer } from "../components/footer";
import { SocialLogin } from "../components/socialmedia";
import React, { useState } from 'react';
import "../static/menu.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AppNavbar from "../components/navbar";
import { useLanguage } from '../components/LanguageProvider'; // Import the useLanguage hook
import translations_en from '../translations/translation_en.json'; // Import English translations
import translations_de from '../translations/translation_de.json'; // Import German translations
import { Link } from "react-router-dom";

export function Order() {
  // Define state variables using the useState hook
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderType, setOrderType] = useState('deliver'); // Default to 'deliver'
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations = selectedLanguage === 'en' ? translations_en : translations_de;

  return (
    <div>
      <div className="yes">
        <AppNavbar/>
      </div>
      <div>
        <div className="order-columns">
          <div className="yes-order">
            <h1>{translations.readyToEat}</h1>
            <h4>{translations.deliveryLocation}</h4>
            <hr />
            <form>
              <div className="address">
                <div className="add">
                  <label>{translations.address}</label><br />
                  <input type="text" required/>
                </div>
                <div>
                  <label>{translations.postcode}</label><br />
                  <input type="text" required/>
                </div>
                <div>
                  <label>{translations.city}</label><br />
                  <input type="text" required/>
                </div>
              </div>
              <h4>{translations.contactInformation}</h4>
              <hr />
              <div className="address">
                <div className="name">
                  <label>{translations.name}</label><br />
                  <input type="text" required/>
                </div>
                <div className="name">
                  <label>{translations.email}</label><br />
                  <input type="text" required/>
                </div>
              </div>
              <div className="address">
                <div className="name">
                  <label>{translations.phoneNumber}</label><br />
                  <input type="text" required/>
                </div>
                <div className="name">
                  <label>{translations.companyName}</label><br />
                  <input type="text" required/>
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
                    onChange={() => setOrderType('deliver')}
                    checked={orderType === 'deliver'}
                  />
                  <label htmlFor="deliver">{translations.delivery}</label>
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
                  <label htmlFor="take-away">{translations.takeAway}</label>
                </div>
              </div>
              <div className="address-2">
                <div>
                  <label>{translations.selectDate}</label><br />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat={translations.dateFormat}
                    placeholderText={translations.dateFormat}
                    className="input-date"
                    required
                  />
                </div>
                <div>
                  <label>{translations.selectTime}</label><br />
                  {orderType === 'deliver' ? (
                    <select className="search-time-yes" defaultValue="11:00" required>
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
                    <select className="search-time" defaultValue="18:00" required>
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
                <label>{translations.remarks}</label>
                <div className="contact-mess-1">
                  <input type="textarea" />
                </div>
              </div>

              <h5 className="h5-header">{translations.couponCode}</h5>
              <hr />
              <form>
                <label>{translations.enterCouponCode}</label><br />
                <div className="code">
                  <input type="text" />
                  <button className="search-button">{translations.applyCode}</button>
                </div>
              </form>
              <p>{translations.orderConfirmation}</p>
              <Link to="/placed">
              <button className="search-button-pay" type="submit">{translations.orderAndPay}</button>
              </Link>
            </form>
          </div>

          <div  className="order-cart">
            {/* Your order cart contents can go here */}
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
