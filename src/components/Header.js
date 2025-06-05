import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&location=${location}`);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src="/AAA.jpeg" alt="Logo" className="h-8 w-auto" />
          </Link>

          {/* Mobile Menu Button */}
          <div className="hamburger-menu md:hidden">
            <button
              type="button"
              className={`hamburger-btn ${menuOpen ? 'active' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-8">
            <div className="flex shadow-sm">
              <input
                type="text"
                placeholder="Search for services..."
                className="flex-1 px-4 py-2 border-2 border-r-0 border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-l-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                className="flex-1 px-4 py-2 border-2 border-gray-300 focus:ring-red-500 focus:border-red-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/messages" className="text-gray-600 hover:text-red-600">
                  <i className="fas fa-envelope text-xl"></i>
                </Link>
                <Link to="/notifications" className="text-gray-600 hover:text-red-600">
                  <i className="fas fa-bell text-xl"></i>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/32"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 bg-white rounded-md shadow-lg hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-gray-600 hover:text-red-600 font-medium"
                >
                  Log In
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8 py-3">
          <Link to="/restaurants" className="text-gray-600 hover:text-red-600">Restaurants</Link>
          <Link to="/home-services" className="text-gray-600 hover:text-red-600">Home Services</Link>
          <Link to="/auto-services" className="text-gray-600 hover:text-red-600">Auto Services</Link>
          <Link to="/health" className="text-gray-600 hover:text-red-600">Health & Beauty</Link>
          <Link to="/travel" className="text-gray-600 hover:text-red-600">Travel & Activities</Link>
          <div className="relative group">
            <button className="text-gray-600 hover:text-red-600 flex items-center">
              More <i className="fas fa-chevron-down ml-1"></i>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block">
              <Link to="/shopping" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Shopping</Link>
              <Link to="/nightlife" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Nightlife</Link>
              <Link to="/events" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Events</Link>
            </div>
          </div>
        </nav>
      </div>
        {showLogin && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Login
              onClose={() => setShowLogin(false)}
              onSwitchToSignup={() => {
                setShowLogin(false);
                setShowSignup(true);
              }}
            />
          </div>
        )}
      {showSignup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <Signup
              onClose={() => setShowSignup(false)}
              onSwitchToLogin={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
            />
          </div>
      )}

      {/* Mobile Navigation */}
      {menuOpen && (
        <>
          <div className="mobile-nav-overlay active" onClick={() => setMenuOpen(false)}></div>
          <div className={`mobile-nav ${menuOpen ? 'active' : ''}`}>
            <div className="mobile-nav-header">
              <button className="close-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
            </div>
            <div className="mobile-nav-links">
              <Link to="/restaurants" className="nav-link" onClick={() => setMenuOpen(false)}>Restaurants</Link>
              <Link to="/home-services" className="nav-link" onClick={() => setMenuOpen(false)}>Home Services</Link>
              <Link to="/auto-services" className="nav-link" onClick={() => setMenuOpen(false)}>Auto Services</Link>
              <Link to="/health" className="nav-link" onClick={() => setMenuOpen(false)}>Health &amp; Beauty</Link>
              <Link to="/travel" className="nav-link" onClick={() => setMenuOpen(false)}>Travel &amp; Activities</Link>
              <Link to="/shopping" className="nav-link" onClick={() => setMenuOpen(false)}>Shopping</Link>
              <Link to="/nightlife" className="nav-link" onClick={() => setMenuOpen(false)}>Nightlife</Link>
              <Link to="/events" className="nav-link" onClick={() => setMenuOpen(false)}>Events</Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;