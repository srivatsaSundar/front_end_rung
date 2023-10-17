import { Link } from "react-router-dom";
import "../static/header.css";
import React from 'react';
import logo from '../images/rung_logo.png';

export function Header() {
  return (
    <div className="header-container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar">
        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/home">
          Home
        </Link>

        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/menu">
          Our Menu
        </Link>

        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/discount">
          Discount Voucher
        </Link>

        <Link style={{ textDecoration: 'none' }} className="nav-link" to="/contact">
          Contact Us
        </Link>
       
      </div>
      
      </div>
     
  );
}
