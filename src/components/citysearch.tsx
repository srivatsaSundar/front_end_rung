import React, { useState } from 'react';
import Icofont from 'react-icofont';
import '../static/citysearch.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/rung_logo.png';
import { useLanguage } from './LanguageProvider'; // Import the useLanguage hook
import translations_en from '../translations/translation_en.json'; // Import English translations
import translations_de from '../translations/translation_de.json'; // Import German translations
import lines from "../images/lines.png"

function CitySearch() {
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState('first');
  const [selectedDate, setSelectedDate] = useState(null);
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState(null);
  const { selectedLanguage } = useLanguage(); // Access the selected language

  // Define translations based on the selected language
  const translations = selectedLanguage === 'en' ? translations_en : translations_de;

  const handlePincodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPincode(e.target.value);
    setError(null);
  };

  const handleSearch = () => {
    const validPincodes = [
      '6003',
      '6004',
      '6005',
      '6014',
      '6020',
      '6032',
      '6010',
      '6012',
      '6013',
      '6047',
      '6048',
      '6052',
    ];

    if (validPincodes.includes(pincode)) {
      setError(null);
      navigate('/menu');
    } else {
      setError('Sorry, this Pin Code is not eligible for delivery.');
    }
  }

  return (
    <div className="citysearch">
      <div className='logo-main'>
        <img src={Logo} style={{
          height: '120px',
          width: '230px',
        }} alt="logo" />
      </div>
      <div className="box">
        <nav>
          <div className="button">
            <button className="button-1" onClick={() => setShowDiv('first')}>
              {translations.homeDelivery}

            </button>
            <button className="button-2" onClick={() => setShowDiv('second')}>
              {translations.takeAway}
            </button>
          </div>
        </nav>
        <div className="line">
          {showDiv === 'first' ? (
            <div className="home-delivery" id="homeDeliverySection">
              <form>
                <div className="label-food">
                  <label>{translations.timeToOrderFood}</label>
                </div>
                <div className="search-pin">
                  <select
                    value={pincode}
                    onChange={handlePincodeChange}
                  >
                    <option value="">{translations.selectPincode}</option>
                    <option value="6003">6003</option>
                    <option value="6004">6004</option>
                    <option value="6005">6005</option>
                    <option value="6014">6014</option>
                    <option value="6020">6020</option>
                    <option value="6032">6032</option>
                    <option value="6010">6010</option>
                    <option value="6012">6012</option>
                    <option value="6013">6013</option>
                    <option value="6047">6047</option>
                    <option value="6048">6048</option>
                    <option value="6052">6052</option>
                  </select>
                  <button onClick={handleSearch}>
                    <Icofont className="icon-pin" icon="icofont-search" />{translations.search}
                  </button>
                  {error && <p className="error-message">{error}</p>}
                </div>
              </form>
            </div>
          ) : null}
          {showDiv === 'second' ? (
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
                    {Array.from({ length: 13 }, (_, i) => {
                      const hour = 18 + Math.floor(i / 4);
                      const minute = (i % 4) * 15;
                      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                      const pm = 'PM';
                      return (
                        <option key={time} value={time}>
                          {time} {pm}
                        </option>
                      );
                    })}
                  </select>
                  <button className="search-button">
                    <Icofont className="icon-pin" icon="icofont-search" /> {translations.search}
                  </button>
                </div>
              </form>
            </div>
          ) : null}
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
              <Icofont className="icons" icon="icofont-fast-delivery" size="3" />
              <p>{translations.deliveryAtYourDoorStep}</p>
            </li>
          </div>
        </ul>
        <img src={lines} alt="line" title="line" className='lines' />
      </div>
    </div>
  );
}

export default CitySearch;
