// imports
import '../static/socialmedia.css';
import React from 'react';
import Icofont from 'react-icofont';
// social media login component
export function SocialLogin(){
    return(
        <div className="social-media">
            <div className="contact">
            <h5>Contact Us</h5>
            <ul className='contact-us'>
            <li>
            <Icofont className="icons-loc" icon=" icofont-location-pin" size="1" />
            <p>Gibraltarstrasse 5 <br></br>
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
            <h5>Restaurant Opening Hours</h5>
            <ul className='contact-us'>
            <li>
           
            <p className='margin-hour'>Monday to Sunday (5:30 p.m. to 9:00 p.m.) </p>
            </li>
            <li>
          
            <p className='margin-hour'>Delivery time (6.00 p.m. to 9.00 p.m.)</p>
            </li>
            </ul>
            </div>
            <div className="media">
            <h5 >Follow Us On</h5>
            <Icofont className="icons-loc" icon="icofont-facebook" size="1" />
            <Icofont className="icons-loc" icon="icofont-twitter" size="1" />
            <Icofont className="icons-loc" icon="icofont-pinterest" size="1" />
            <Icofont className="icons-loc" icon="icofont-instagram" size="1" />
            <Icofont className="icons-loc" icon="icofont-youtube-play" size="1" />
            </div>
        </div>
         
    );
}