// imports
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { SocialLogin } from "../components/socialmedia";
import React from 'react';
import "../static/menu.css";
import Icofont from 'react-icofont';

export function Contact() {
    return (
      // basic contact information
      <div >
        <div className="yes">
         <Header />
         <div className="up">
         <h3>Contact Us</h3>
         <p>Home &rsaquo; Contact Us</p>
         </div>
        </div>
        <div className="reservation">
          <h1>Contact Us</h1>
          <div className="contact-form">
            <form>
              <div className="name-email">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Email" />
              </div>
              <div className="contact-mobile">
              <input type="text" placeholder="Mobile Number" />
              <br></br>
              <div className="contact-mess">
              <input type="textarea" placeholder="Write your message here" />
              </div>
              <input type="text" placeholder="enter Captcha" />
              <br></br>
              </div>
              <button className='search-b'> Send a Message</button>
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
  