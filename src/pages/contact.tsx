// imports
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SocialLogin } from "../components/socialmedia";
import React from 'react';
import "../static/menu.css";

export function Contact() {
    return (
      // basic contact information
      <div >
        <div className="yes">
         <Header />
        </div>
        <div className="reservation">
          <h1>Contact Us</h1>
          <div className="contact-form">
            <form>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              <input type="number" placeholder="Mobile Number" />
              <br></br>
              <input type="textarea" placeholder="Write your message here" />
              <br></br>
              <input type="text" placeholder="enter Captcha" />
              <br></br>
              <input type="submit" value="Send a Message" />
            </form>
          </div>
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
  