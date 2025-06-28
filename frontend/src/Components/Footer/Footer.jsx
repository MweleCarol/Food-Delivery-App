import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p> Whether you're craving a comforting classic or something new and exciting, 
                our chefs prepare every dish with care and deliver it hot and ready to enjoy. 
                From lunch breaks to late-night cravings, we’re here to make every meal 
                effortless and satisfying all from the comfort of your home</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+254-712-345-678</li>
                <li>tomatorestorant@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright © 2025 Tomato.com. All rights reserved.
      </p>

    </div>
  );
}

export default Footer;
