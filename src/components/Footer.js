import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="yelp-footer">
      <div className="footer-top">
        <div className="footer-columns">
          <div className="footer-col">
            <h3>About</h3>
            <ul>
              <li><a href="#">About AAA</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Investor Relations</a></li>
              <li><a href="#">Trust &amp; Safety</a></li>
              <li><a href="#">Content Guidelines</a></li>
              <li><a href="#">Accessibility Statement</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Ad Choices</a></li>
              <li><a href="#">Your Privacy Choices</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Discover</h3>
            <ul>
              <li><a href="#">AAA Project Cost Guides</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Talk</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">AAA Blog</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">AAA Mobile</a></li>
              <li><a href="#">Developers</a></li>
              <li><a href="#">RSS</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>AAA for Business</h3>
            <ul>
              <li><a href="#">AAA for Business</a></li>
              <li><a href="#">Business Owner Login</a></li>
              <li><a href="#">Claim your Business Page</a></li>
              <li><a href="#">Advertise on AAA</a></li>
              <li><a href="#">AAA for Restaurant Owners</a></li>
              <li><a href="#">Table Management</a></li>
              <li><a href="#">Business Success Stories</a></li>
              <li><a href="#">Business Support</a></li>
              <li><a href="#">AAA Blog for Business</a></li>
              <li><a href="#">AAA Data for B2B</a></li>
              <li><a href="#">AAA Data for B2C</a></li>
            </ul>
          </div>
          <div className="footer-col footer-right">
            <div className="footer-lang">
              <h3>Languages</h3>
              <a href="#">English <span className="caret">▼</span></a>
            </div>
            <div className="footer-cities">
              <h3>Cities</h3>
              <a href="#">Explore a City <span className="caret">▼</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Copyright © 2004–2025 AAA Inc. AAA, Elite Squad, and related marks are
          registered trademarks of AAA.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
