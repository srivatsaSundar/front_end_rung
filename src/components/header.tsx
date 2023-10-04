// imports
import { Link } from "react-router-dom";
import "../static/header.css";
import React from 'react';
export function Header() {
  return (
    // created a fixed header which routes to multiple pages
    <div className="header-container">
      <nav className="navbar">
      {/* <Link className="nav-link" to="/home">
              <strong>Foodie</strong>
            </Link> */}
            <Link className="nav-link" to="/home">
              Home
            </Link>
        
            <Link className="nav-link" to="/about">
              Our Menu
            </Link>
         
            <Link className="nav-link" to="/contact">
              Discount Voucher
            </Link>

            <Link className="nav-link" to="/contact">
              Contact Us
            </Link>
            {/* <Link className="nav-link" to="/login">
              Login
            </Link> */}
      </nav>
    </div>
  );
}
