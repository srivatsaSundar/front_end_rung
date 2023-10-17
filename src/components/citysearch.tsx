import React, { useState } from 'react';
import Icofont from 'react-icofont';
import '../static/citysearch.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Logo from "../images/rung_logo.png";

function CitySearch() {
  const navigate = useNavigate();
  const [showDiv, setShowDiv] = useState('first');
  const [selectedDate, setSelectedDate] = useState(null);
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState(null);

  const handlePincodeChange = (e) => {
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
      // Valid pincode, navigate to the next menu page
      setError(null);
      navigate('/menu');
    } else {
      // Invalid pincode, display an error message
      setError('Sorry, this Pin Code is not eligible for delivery.');
    }
  };

  return (
    <div className="citysearch">
      <div className='logo-main'>
        <img src={Logo}  style={{
          height: '150px', // Set the height
          width: '250px',  // Set the width
        }} alt="logo" />
      </div>
      <div className="box">
        <nav>
          <div className="button">
            <button className="button-1" onClick={() => setShowDiv('first')}>
              Home Delivery
            </button>
            <button className="button-2" onClick={() => setShowDiv('second')}>
              Take away
            </button>
          </div>
        </nav>
        <div className="line">
          {showDiv === 'first' ? (
            <div className="home-delivery" id="homeDeliverySection">
              <form>
                <div className="label-food">
                  <label>Time to order food</label>
                </div>
                <div className="search-pin">
                  <input
                    placeholder="Enter your pincode here"
                    type="text"
                    value={pincode}
                    onChange={handlePincodeChange}
                  />
                  <button onClick={handleSearch}>
                    <Icofont className="icon-pin" icon="icofont-search" /> Search
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
                  <label>Select date and time</label>
                </div>
                <div className="search-td">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="MM/DD/YYYY"
                  />
                  <select className="search-time" defaultValue="18:00">
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
                    <Icofont className="icon-pin" icon="icofont-search" /> Search
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
              <p>Select Food</p>
            </li>
          </div>
          <div className="list-item">
            <li>
              <Icofont className="icons" icon="icofont-food-basket" size="3" />
              <p>Order Food</p>
            </li>
          </div>
          <div className="list-item">
            <li>
              <Icofont className="icons" icon="icofont-fast-delivery" size="3" />
              <p>Delivery At Your Door Step</p>
            </li>
          </div>
        </ul>
</div>
    </div>
  );
}

export default CitySearch;