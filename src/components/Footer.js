import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [showCities, setShowCities] = useState(false);

  const toggleCities = (e) => {
    e.preventDefault();
    setShowCities((prev) => !prev);
  };
  return (
    <footer className="yelp-footer">
      <div className="footer-top">
        <div className="footer-columns">
          <div className="footer-col">
            <h3>About</h3>
            <ul>
              <li><a href="/about">About AAA</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/press">Press</a></li>
              <li><a href="/investor-relations">Investor Relations</a></li>
              <li><a href="/trust-safety">Trust &amp; Safety</a></li>
              <li><a href="/content-guidelines">Content Guidelines</a></li>
              <li><a href="/accessibility">Accessibility Statement</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/ad-choices">Ad Choices</a></li>
              <li><a href="/privacy-choices">Your Privacy Choices</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Discover</h3>
            <ul>
              <li><a href="/project-cost-guides">AAA Project Cost Guides</a></li>
              <li><a href="/collections">Collections</a></li>
              <li><a href="/talk">Talk</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/blog">AAA Blog</a></li>
              <li><a href="/support">Support</a></li>
              <li><a href="/mobile">AAA Mobile</a></li>
              <li><a href="/developers">Developers</a></li>
              <li><a href="/rss">RSS</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>AAA for Business</h3>
            <ul>
              <li><a href="/business">AAA for Business</a></li>
              <li><a href="/business/login">Business Owner Login</a></li>
              <li><a href="/claim-business">Claim your Business Page</a></li>
              <li><a href="/advertise">Advertise on AAA</a></li>
              <li><a href="/restaurant-owners">AAA for Restaurant Owners</a></li>
              <li><a href="/table-management">Table Management</a></li>
              <li><a href="/success-stories">Business Success Stories</a></li>
              <li><a href="/business-support">Business Support</a></li>
              <li><a href="/biz-blog">AAA Blog for Business</a></li>
              <li><a href="/data-b2b">AAA Data for B2B</a></li>
              <li><a href="/data-b2c">AAA Data for B2C</a></li>
            </ul>
          </div>
          <div className="footer-col footer-right">
            <div className="footer-lang">
              <h3>Languages</h3>
              <a href="/change-language">English <span className="caret">▼</span></a>
            </div>
            <div className="footer-cities">
              <h3>Cities</h3>
              <button type="button" className="dropdown-toggle" onClick={toggleCities}>
                Explore a City <span className="caret">▼</span>
              </button>
              {showCities && (
                <ul className="cities-dropdown">
                  <li><a href="/cities/karachi">Karachi</a></li>
                  <li><a href="/cities/lahore">Lahore</a></li>
                  <li><a href="/cities/islamabad">Islamabad</a></li>
                  <li><a href="/cities/rawalpindi">Rawalpindi</a></li>
                  <li><a href="/cities/faisalabad">Faisalabad</a></li>
                  <li><a href="/cities/multan">Multan</a></li>
                  <li><a href="/cities/peshawar">Peshawar</a></li>
                  <li><a href="/cities/quetta">Quetta</a></li>
                </ul>
              )}
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
