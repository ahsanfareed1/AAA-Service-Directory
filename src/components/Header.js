import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const overlayRef = useRef(null);
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Plumbing', icon: 'fas fa-sink' },
    { id: 2, name: 'Electrical', icon: 'fas fa-bolt' },
    { id: 3, name: 'Food', icon: 'fas fa-utensils' },
    { id: 4, name: 'Painting', icon: 'fas fa-paint-roller' },
    { id: 5, name: 'Transport', icon: 'fas fa-truck' },
    { id: 6, name: 'Cleaning', icon: 'fas fa-broom' },
    { id: 7, name: 'Gardening', icon: 'fas fa-leaf' },
    { id: 8, name: 'Repair', icon: 'fas fa-tools' },
    { id: 9, name: 'Security', icon: 'fas fa-shield-alt' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('user');
      navigate('/auth');
      closeMobileMenu();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/service-providers/${categoryId}`);
    setIsDropdownOpen(false);
    closeMobileMenu();
  };

  return (
    <header className="header">
      <nav className="main-nav">
        <div className="top-nav">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <picture className="logo-picture">
                <source srcSet={`${process.env.PUBLIC_URL}/AAA.jpeg`} type="image/jpeg" />
                <img src={`${process.env.PUBLIC_URL}/AAA.jpeg`} alt="AAA Logo" className="logo-img" loading="eager" />
              </picture>
            </Link>
          </div>

          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            
            <div className="dropdown-container">
              <button 
                className="nav-link dropdown-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Services <i className="fas fa-chevron-down"></i>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <i className={category.icon}></i>
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/profile" className="nav-link user-link">
                  <i className="fas fa-user-circle"></i>
                  <span className="user-name">{user?.displayName || 'Profile'}</span>
                </Link>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/auth" className="nav-link auth-btn login">Login</Link>
                <Link to="/auth" className="nav-link auth-btn signup">Sign Up</Link>
              </div>
            )}
          </div>

          <div className="hamburger-menu">
            <button
              className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile navigation"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} ref={mobileNavRef}>
          <div className="mobile-nav-header">
            <button className="close-btn" onClick={closeMobileMenu}>×</button>
          </div>
          
          <nav className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>Home</Link>
            
            <div className="mobile-dropdown">
              <div className="mobile-dropdown-header">Services</div>
              {categories.map(category => (
                <button
                  key={category.id}
                  className="mobile-dropdown-item"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <i className={category.icon}></i>
                  {category.name}
                </button>
              ))}
            </div>

            <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>About Us</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="mobile-nav-link" onClick={closeMobileMenu}>
                  <i className="fas fa-user-circle"></i> Profile
                </Link>
                <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/auth" className="mobile-nav-link auth-btn" onClick={closeMobileMenu}>
                  Login / Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </nav>

      <div
        ref={overlayRef}
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />
    </header>
  );
};

export default Header;