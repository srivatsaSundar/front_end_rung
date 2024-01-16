// imports
import "../static/socialmedia.css";
import React, { useEffect, useState } from "react";
import Icofont from "react-icofont";
import { useLanguage } from "./LanguageProvider";
import translations_en from "../translations/translation_en.json";
import translations_de from "../translations/translation_de.json";
import axios from "axios";

export function SocialLogin() {
  const { selectedLanguage } = useLanguage(); // Access the selected language
  useEffect(() => {
    fetchData();
  }, []);
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("https://backend-rung.onrender.com/shop_time_list/")
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // Define translations based on the selected language
  const translations =
    selectedLanguage === "de" ? translations_de : translations_en;

  return (
    <div className="social-media">
      <div className="contact">
        <h5>{translations.contactUs}</h5>
        <ul className="contact-us">
          <li>
            <Icofont
              className="icons-loc"
              icon=" icofont-location-pin"
              size="1"
            />
            <p>
              Gibraltarstrasse 5 <br></br>
              6005 Luzern
            </p>
          </li>
          <li>
            <Icofont className="icons-loc" icon=" icofont-ui-call" size="1" />
            <p>+41791539999</p>
          </li>
        </ul>
      </div>
      <div className="opening">
        <h5>{translations.openingHours}</h5>
        <ul className="contact-us">
          {data
            ? data.map((item) => (
              <React.Fragment key={item.id}>
                <li>
                  <p className="margin-hour">
                    {translations.regularHours} (
                    {item.shop_opening_time.substring(0, 5)} {translations.hr}{" "}
                    {translations.to} {item.shop_closing_time.substring(0, 5)}{" "}
                    {translations.hr})
                  </p>
                </li>
                <li>
                  <p className="margin-hour">
                    {translations.deliveryHours} (
                    {item.shop_delivery_opening_time.substring(0, 5)}{" "}
                    {translations.hr} {translations.to}{" "}
                    {item.shop_delivery_closing_time.substring(0, 5)}{" "}
                    {translations.hr})
                  </p>
                </li>
              </React.Fragment>
            ))
            : null}
        </ul>
      </div>
      <div className="media">
        <h5>{translations.followUsOn}</h5>
        <Icofont className="icons-loc" icon="icofont-facebook" size="1" />
        <Icofont className="icons-loc" icon="icofont-twitter" size="1" />
        <Icofont className="icons-loc" icon="icofont-pinterest" size="1" />
        <Icofont className="icons-loc" icon="icofont-instagram" size="1" />
        <Icofont className="icons-loc" icon="icofont-youtube-play" size="1" />
      </div>
    </div>
  );
}
