// imports
import { Link } from "react-router-dom";
import "../static/header.css";
import React from 'react';
import logo from '../images/rung_logo.png';
export function Header() {
  return (
    // created a fixed header which routes to multiple pages
    <div className="header-container">
     
    <img src={logo} alt="logo"/>
      <nav className="navbar">
      {/* <Link className="nav-link" to="/home">
              <strong>Foodie</strong>
            </Link> */}
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
            {/* <Link className="nav-link" to="/login">
              Login
            </Link> */}
      </nav>
    </div>
  );
}
