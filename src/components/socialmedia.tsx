// imports
import '../static/socialmedia.css';
import React from 'react';
import Icofont from 'react-icofont';
import { useLanguage } from './LanguageProvider';
import translations_en from '../translations/translation_en.json';
import translations_de from '../translations/translation_de.json';

export function SocialLogin() {
    const { selectedLanguage } = useLanguage(); // Access the selected language

    // Define translations based on the selected language
    const translations = selectedLanguage === 'en' ? translations_en : translations_de;

    return (
        <div className="social-media">
            <div className="contact">
                <h5>{translations.contactUs}</h5>
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
                <h5>{translations.openingHours}</h5>
                <ul className='contact-us'>
                    <li>
                        <p className='margin-hour'>{translations.regularHours} </p>
                    </li>
                    <li>

                        <p className='margin-hour'>{translations.deliveryHours}</p>
                    </li>
                </ul>
            </div>
            <div className="media">
                <h5 >{translations.followUsOn}</h5>
                <Icofont className="icons-loc" icon="icofont-facebook" size="1" />
                <Icofont className="icons-loc" icon="icofont-twitter" size="1" />
                <Icofont className="icons-loc" icon="icofont-pinterest" size="1" />
                <Icofont className="icons-loc" icon="icofont-instagram" size="1" />
                <Icofont className="icons-loc" icon="icofont-youtube-play" size="1" />
            </div>
        </div>
    );
}