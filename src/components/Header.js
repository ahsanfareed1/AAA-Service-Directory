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
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(searchLocation)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
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
    <>
      {/* Desktop Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHome ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}>
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Bar */}
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex-shrink-0">
                <div className="flex items-center">
                  <div className={`text-2xl font-bold ${isHome ? 'text-white' : 'text-red-600'}`}>
                    AAA
                  </div>
                </div>
              </Link>
              
              {/* Search Bar - Only show on non-home pages */}
              {!isHome && (
                <form onSubmit={handleSearch} className="flex-1 max-w-3xl mx-8">
                  <div className="flex shadow-sm relative">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Search for services..."
                        className="w-full px-4 py-3 border-2 border-r-0 border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-l-md text-gray-900"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                      />
                      {showSuggestions && (
                        <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-b-md top-full z-10 max-h-48 overflow-y-auto shadow-lg">
                          {categories.map((c) => (
                            <li
                              key={c.label}
                              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center border-b border-gray-100 last:border-b-0"
                              onMouseDown={() => {
                                setSearchTerm(c.label);
                                setShowSuggestions(false);
                              }}
                            >
                              <i className={`fas fa-${c.icon} w-5 mr-3 text-gray-600`}></i>
                              <span className="text-gray-900">{c.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Location"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 focus:ring-red-500 focus:border-red-500 text-gray-900"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onFocus={() => {
                        if (!searchLocation) detectLocation();
                      }}
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-red-600 text-white font-medium rounded-r-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              )}
              
              {/* Right Side Navigation */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/messages\" className={`${isHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-red-600'} transition-colors`}>
                      <i className="fas fa-envelope text-xl"></i>
                    </Link>
                    <Link to="/notifications" className={`${isHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-red-600'} transition-colors`}>
                      <i className="fas fa-bell text-xl"></i>
                    </Link>
                    <div className="flex items-center space-x-3">
                      <span className={`${isHome ? 'text-white' : 'text-gray-700'} font-medium`}>
                        Hi, {user?.displayName || 'User'}
                      </span>
                      <button
                        onClick={handleLogout}
                        className={`${isHome ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-red-600'} font-medium transition-colors`}
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowLogin(true)} 
                      className={`${isHome ? 'text-white hover:text-gray-200' : 'text-gray-700 hover:text-red-600'} font-medium transition-colors`}
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => setShowSignup(true)}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className={`flex space-x-8 py-3 ${isHome ? 'text-white' : 'text-gray-700'}`}>
              <Link to="/restaurants" className="hover:text-red-600 transition-colors">Restaurants</Link>
              <Link to="/home-services" className="hover:text-red-600 transition-colors">Home Services</Link>
              <Link to="/auto-services" className="hover:text-red-600 transition-colors">Auto Services</Link>
              <Link to="/health" className="hover:text-red-600 transition-colors">Health & Beauty</Link>
              <Link to="/travel" className="hover:text-red-600 transition-colors">Travel & Activities</Link>
              <button className="hover:text-red-600 transition-colors">More</button>
            </nav>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className={`flex items-center justify-between px-4 py-3 ${isHome ? 'bg-transparent text-white' : 'bg-red-600 text-white'}`}>
            <button className="text-sm font-medium">Open in App</button>
            <Link to="/" className="text-xl font-bold">AAA</Link>
            <button aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
          {!isHome && (
            <div className="bg-white border-b px-4 py-3">
              <input
                type="text"
                placeholder="e.g. tacos, Mel's"
                className="w-full border rounded-md px-4 py-3 bg-white text-gray-900 placeholder-gray-500"
                onFocus={() => setSearchOpen(true)}
                readOnly
              />
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <Login
            onClose={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <Signup
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        </div>
      )}

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex items-center justify-between bg-red-600 text-white px-4 py-3 sticky top-0">
            <button onClick={() => setSearchOpen(false)} className="text-white">Cancel</button>
            <span className="font-semibold">Search</span>
            <div></div>
          </div>
          <form onSubmit={handleSearch} className="p-4 space-y-4">
            <input
              type="text"
              className="w-full border rounded-md px-4 py-3 text-gray-900"
              placeholder="e.g. plumber, electrician"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              className="w-full border rounded-md px-4 py-3 text-gray-900"
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
                  className="flex items-center py-3 space-x-3 cursor-pointer hover:bg-gray-50"
                  onMouseDown={() => setSearchTerm(c.label)}
                >
                  <i className={`fas fa-${c.icon} w-5 text-gray-600`}></i>
                  <span className="text-gray-900">{c.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-md font-medium">
                Search
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}></div>
          <div className="absolute inset-0 bg-white flex flex-col">
            <div className="flex items-center justify-between bg-red-600 text-white px-4 py-3">
              <div className="text-xl font-bold mx-auto">AAA</div>
              <button aria-label="Close" onClick={() => setMenuOpen(false)} className="text-2xl">✕</button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
              {!isAuthenticated ? (
                <>
                  <button onClick={() => { setMenuOpen(false); setShowSignup(true); }} className="text-left font-medium text-gray-900">Sign Up</button>
                  <button onClick={() => { setMenuOpen(false); setShowLogin(true); }} className="text-left font-medium text-gray-900">Log In</button>
                </>
              ) : (
                <>
                  <span className="text-gray-900 font-medium">Hi, {user?.displayName || 'User'}</span>
                  <button onClick={handleLogout} className="text-left font-medium text-gray-900">Log Out</button>
                </>
              )}
              <Link to="/nearby" onClick={() => setMenuOpen(false)} className="text-left text-gray-900">Nearby</Link>
              <Link to="/bookmarks" onClick={() => setMenuOpen(false)} className="text-left text-gray-900">Bookmarks</Link>
              <Link to="/start-project" onClick={() => setMenuOpen(false)} className="text-left text-gray-900">Start a Project</Link>
              <Link to="/add-business" onClick={() => setMenuOpen(false)} className="text-left text-gray-900">Add a Business on AAA</Link>
            </div>
            <div className="mt-auto p-4 text-sm text-center text-gray-500 border-t">
              <Link to="/ad-choices" className="mr-4 hover:text-red-600">Ad Choices</Link>
              <Link to="/support" className="hover:text-red-600">Support</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;