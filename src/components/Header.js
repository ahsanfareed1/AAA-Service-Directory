import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const categories = [
  { icon: 'utensils', label: 'Restaurants' },
  { icon: 'truck', label: 'Delivery' },
  { icon: 'shopping-bag', label: 'Takeout' },
  { icon: 'calculator', label: 'Accountants' },
  { icon: 'wrench', label: 'Plumbers' },
  { icon: 'car', label: 'Auto Repair' },
];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate(`/search?q=${searchTerm}&location=${searchLocation}`);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setSearchLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        },
        () => {}
      );
    }
  };

  return (
    <header className={`${isHome ? 'absolute top-0 left-0 w-full bg-transparent' : 'sticky top-0'} z-50`}>
      {/* Mobile Header */}
      <div className="md:hidden">
        <div className={`flex items-center justify-between px-3 py-2 ${isHome ? 'bg-transparent text-white' : 'bg-yelp-red text-white'}`}>
          <button className="text-sm font-medium">Open in App</button>
          <img src="/AAA.jpeg" alt="AAA logo" className="h-6" />
          <button aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        <div className={`${isHome ? 'bg-transparent border-b border-white/50' : 'bg-white border-b'} px-3 py-2`}>
          <input
            type="text"
            placeholder="e.g. tacos, Mel's"
            className="w-full border rounded px-3 py-2 bg-white/80"
            onFocus={() => setSearchOpen(true)}
            readOnly
          />
        </div>
      </div>

      {/* Desktop Header */}
      <div className={`hidden md:block ${isHome ? 'bg-transparent' : 'bg-white border-b border-gray-200'}` }>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <img src="/AAA.jpeg" alt="Logo" className="h-8 w-auto" />
            </Link>
            <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-8">
              <div className="flex shadow-sm relative">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for services..."
                    className="w-full px-4 py-2 border-2 border-r-0 border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-l-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                  />
                  {showSuggestions && (
                    <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-b-md top-full z-10 max-h-48 overflow-y-auto">
                      {categories.map((c) => (
                        <li
                          key={c.label}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onMouseDown={() => {
                            setSearchTerm(c.label);
                            setShowSuggestions(false);
                          }}
                        >
                          <i className={`fas fa-${c.icon} w-4 mr-2`}></i>
                          {c.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 focus:ring-red-500 focus:border-red-500"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onFocus={() => {
                    if (!searchLocation) detectLocation();
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white font-medium rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/messages" className="text-gray-600 hover:text-red-600">
                    <i className="fas fa-envelope text-xl"></i>
                  </Link>
                  <Link to="/notifications" className="text-gray-600 hover:text-red-600">
                    <i className="fas fa-bell text-xl"></i>
                  </Link>
                </>
              ) : (
                <>
                  <button onClick={() => setShowLogin(true)} className={`${isHome ? 'text-white' : 'text-gray-600'} hover:text-red-600 font-medium`}>
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
          <nav className={`flex space-x-8 py-3 ${isHome ? 'text-white' : ''}` }>
            <Link to="/restaurants" className="hover:text-red-600">Restaurants</Link>
            <Link to="/home-services" className="hover:text-red-600">Home Services</Link>
            <Link to="/auto-services" className="hover:text-red-600">Auto Services</Link>
            <Link to="/health" className="hover:text-red-600">Health &amp; Beauty</Link>
            <Link to="/travel" className="hover:text-red-600">Travel &amp; Activities</Link>
          </nav>
        </div>
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

      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex items-center justify-between bg-yelp-red text-white px-4 py-3 sticky top-0">
            <button onClick={() => setSearchOpen(false)}>Cancel</button>
            <span className="font-semibold">Search</span>
          </div>
          <form onSubmit={handleSearch} className="p-4 space-y-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. plumber, electrician"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="Lahore, Pakistan 54700"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onFocus={() => {
                if (!searchLocation) detectLocation();
              }}
            />
            <ul className="divide-y mt-4">
              {categories.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center py-3 space-x-2 cursor-pointer"
                  onMouseDown={() => setSearchTerm(c.label)}
                >
                  <i className={`fas fa-${c.icon} w-5 text-gray-600`}></i>
                  <span>{c.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button type="submit" className="px-4 py-2 bg-yelp-red text-white rounded">
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}></div>
          <div className="absolute inset-0 bg-white flex flex-col">
            <div className="flex items-center justify-between bg-yelp-red text-white px-4 py-3">
              <img src="/AAA.jpeg" alt="AAA logo" className="h-6 mx-auto" />
              <button aria-label="Close" onClick={() => setMenuOpen(false)} className="text-2xl">✕</button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
              <button onClick={() => { setMenuOpen(false); setShowSignup(true); }} className="text-left font-medium">Sign Up</button>
              <button onClick={() => { setMenuOpen(false); setShowLogin(true); }} className="text-left font-medium">Log In</button>
              <Link to="/nearby" onClick={() => setMenuOpen(false)} className="text-left">Nearby</Link>
              <Link to="/bookmarks" onClick={() => setMenuOpen(false)} className="text-left">Bookmarks</Link>
              <Link to="/start-project" onClick={() => setMenuOpen(false)} className="text-left">Start a Project</Link>
              <Link to="/add-business" onClick={() => setMenuOpen(false)} className="text-left">Add a Business on AAA</Link>
            </div>
            <div className="mt-auto p-4 text-sm text-center text-gray-500 border-t">
              <Link to="/ad-choices" className="mr-2">Ad Choices</Link>
              <Link to="/support">Support</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
