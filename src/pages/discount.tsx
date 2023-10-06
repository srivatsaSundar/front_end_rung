// imports
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SocialLogin } from "../components/socialmedia";
import React from 'react';
import "../static/menu.css";

export function Discount() {
    return (
      // basic contact information
      <div >
        <div className="yes">
         <Header />
        </div>
        <div className="title-Discount">
          <h1>Discount Voucher</h1>
          <hr></hr>
        </div>
      <div className="home-container yes">
        <SocialLogin />
      </div>
        <div>
          <Footer />
        </div>
      </div>      
    );
  }
  