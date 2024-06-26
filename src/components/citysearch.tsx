import React, { useEffect, useState } from "react";
import Icofont from "react-icofont";
import "../static/citysearch.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import Logo from "../images/rung_logo.png";
import { useLanguage } from "./LanguageProvider"; // Import the useLanguage hook
import translations_en from "../translations/translation_en.json"; // Import English translations
import translations_de from "../translations/translation_de.json"; // Import German translations
import lines from "../images/lines.png";
import { DateTime } from "luxon";
import axios from "axios";
import { toast } from "react-toastify";

function CitySearch() {
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState("first");
  const [selectedDate, setSelectedDate] = useState(null);
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState(null);
  const { selectedLanguage } = useLanguage(); // Access the selected language
  const [currentTime, setCurrentTime] = useState(DateTime.local());
  const [pin, setPin] = useState("");
  const [holiday, setHoliday] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Update the current time every minute
    const interval = setInterval(() => {
      setCurrentTime(DateTime.local());
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [currentTime]);

  const apis = "https://api.mrrung.com/holiday/";
  useEffect(() => {
    fetch(apis)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHoliday(data);
      })
      .catch((err) => console.log("error in fetching the pin", err));
  }, [apis]);
  // console.log(holiday);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://api.mrrung.com/shop_time_list/")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error in fetching data");
      });
  };

  const isClosed = () => {
    const currentDate = currentTime.toJSDate();
    const currentShopTimings = data[0];

    const startTime = DateTime.fromISO(
      currentShopTimings?.shop_opening_time,
    ).toJSDate();
    const endTime = DateTime.fromISO(
      currentShopTimings?.shop_closing_time,
    ).toJSDate();

    const isNoService = currentDate < startTime || currentDate >= endTime;

    const holidayCheck = holiday.some((holidayItem) => {
      const holidayStartTime = DateTime.fromISO(
        holidayItem.start_data,
      ).toJSDate();
      const holidayEndTime = DateTime.fromISO(holidayItem.end_data).toJSDate();
      return currentDate >= holidayStartTime && currentDate <= holidayEndTime;
    });

    return isNoService || holidayCheck;
  };

  const ClosedMessage = ({ holidayNote }) => (
    <div
      className="closed"
      style={{
        textAlign: "center",
        fontSize: "30px",
        marginBottom: "20px",
        fontWeight: "600",
      }}
    >
      Closed {holidayNote && `for ${holidayNote}`}
    </div>
  );
  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;

  const handlePincodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPin(e.target.value);
    setError(null);
  };

  const api = "https://api.mrrung.com/code/";
  useEffect(() => {
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPincode(data))
      .catch((err) => console.log("error in fetching the pin", err));
  }, [api]);
  // console.log(api);
  // console.log(pincode);
  const handlepin = pincode;
  // console.log(handlepin);
  const handleSearch = (e) => {
    if (pin) {
      e.preventDefault();
      navigate(`/menu`);
    } else {
      alert("Please select the pincode");
    }
  };

  const getHolidayNoteForCurrentTime = () => {
    const currentDateTime = DateTime.local();

    const matchingHoliday = holiday.find((holidayData) => {
      const holidayStartDateTime = DateTime.fromISO(holidayData.start_data);
      const holidayEndDateTime = DateTime.fromISO(holidayData.end_data);

      if (
        currentDateTime >= holidayStartDateTime &&
        currentDateTime <= holidayEndDateTime
      ) {
        // Log and return the holiday note if there's a match
        return true;
      }

      return false;
    });

    return matchingHoliday?.holiday_note ?? "now";
  };

  const generateTimeOptions = () => {
    const currentShopTimings = data[0];

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

  return (
    <div className="citysearch">
      <div className="logo-main">
        <img
          src={Logo}
          style={{
            height: "120px",
            width: "230px",
          }}
          alt="logo"
        />
      </div>
      <div className="box">
        <nav>
          <div className="button">
            <button className="button-1" onClick={() => setShowDiv("first")}>
              {translations.homeDelivery}
            </button>
            <button className="button-2" onClick={() => setShowDiv("second")}>
              {translations.takeAway}
            </button>
          </div>
        </nav>
        <div className="line">
          {showDiv === "first" ? (
            <div className="home-delivery" id="homeDeliverySection">
              <form>
                <div className="label-food">
                  <label>{translations.timeToOrderFood}</label>
                </div>
                <div className="search-pin">
                  <select value={pin} onChange={handlePincodeChange}>
                    <option value="">{translations.selectPincode}</option>

                    {handlepin ? (
                      // Iterate over options only if handlepin is available
                      handlepin
                        .filter((item) => item.available)
                        .map((item, index) => (
                          <option key={index} value={item.postal_code}>
                            {item.postal_code}
                          </option>
                        ))
                    ) : (
                      // Optionally, you can include a loading or placeholder option
                      <option value="" disabled>
                        {translations.Loading}
                      </option>
                    )}
                  </select>
                  <button onClick={handleSearch}>
                    <Icofont className="icon-pin" icon="icofont-search" />
                    {translations.search}
                  </button>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </form>
            </div>
          ) : null}
          {showDiv === "second" ? (
            <div className="take-away" id="takeAwaySection">
              <form>
                <div className="label-food">
                  <label>{translations.selectDateTime}</label>
                </div>
                <div className="search-td">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="MM/DD/YYYY"
                  />
                  <select className="search-time" defaultValue="18:00">
                    <option value="">{translations.selecttime}</option>
                    {generateTimeOptions().map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <button className="search-button">
                    <Icofont className="icon-pin" icon="icofont-search" />{" "}
                    {translations.search}
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div>
          {isClosed() ? (
            <ClosedMessage holidayNote={getHolidayNoteForCurrentTime()} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <ul className="icons-catch">
          <div className="list-item">
            <li>
              <Icofont className="icons" icon="icofont-fast-food" size="3" />
              <p>{translations.selectFood}</p>
            </li>
          </div>
          <div className="list-item">
            <li>
              <Icofont className="icons" icon="icofont-food-basket" size="3" />
              <p>{translations.orderFood}</p>
            </li>
          </div>
          <div className="list-item">
            <li>
              <Icofont
                className="icons"
                icon="icofont-fast-delivery"
                size="3"
              />
              <p>{translations.deliveryAtYourDoorStep}</p>
            </li>
          </div>
        </ul>
        <img src={lines} alt="line" title="line" className="lines" />
      </div>
    </div>
  );
}

export default CitySearch;
