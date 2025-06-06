import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const categories = [
  { icon: 'utensils', label: 'Restaurants', path: '/restaurants' },
  { icon: 'truck', label: 'Delivery', path: '/delivery' },
  { icon: 'shopping-bag', label: 'Takeout', path: '/takeout' },
  { icon: 'calculator', label: 'Accountants', path: '/accountants' },
  { icon: 'wrench', label: 'Plumbers', path: '/plumbers' },
  { icon: 'car', label: 'Auto Repair', path: '/auto-repair' },
];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('Afton, CA 92309');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSearch = (e) => {
    e.preventDefault();
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
      {/* Main Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isHome ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}>
        {/* Desktop Header */}
        <div className="hidden md:block">
          {/* Top Header Bar */}
          <div style={{
            background: isHome ? 'transparent' : 'linear-gradient(135deg, #1e3a8a 0%, #1f2937 100%)',
            height: '70px'
          }}>
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <div className="text-white text-2xl font-bold">
                  <i className="fab fa-yelp mr-2"></i>
                  AAA
                </div>
              </Link>

              {/* Search Bar - Center */}
              <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
                <div className="flex bg-white rounded-md shadow-lg overflow-hidden">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="things to do, nail salons, plumbers"
                      className="w-full px-4 py-3 text-gray-900 focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    {showSuggestions && searchTerm && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {categories
                          .filter(c => c.label.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((c) => (
                          <div
                            key={c.label}
                            className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                            onMouseDown={() => {
                              setSearchTerm(c.label);
                              setShowSuggestions(false);
                            }}
                          >
                            <i className={`fas fa-${c.icon} w-5 mr-3 text-gray-600`}></i>
                            <span className="text-gray-900">{c.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px bg-gray-300"></div>
                  <input
                    type="text"
                    placeholder="Afton, CA 92309"
                    className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onFocus={() => {
                      if (!searchLocation) detectLocation();
                    }}
                  />
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-3 hover:bg-red-700 transition-colors"
                  >
                    <i className="fas fa-search text-lg"></i>
                  </button>
                </div>
              </form>

              {/* Right Navigation */}
              <div className="flex items-center space-x-6 text-white">
                {isAuthenticated ? (
                  <>
                    <Link to="/business\" className="hover:text-gray-300 transition-colors">
                      AAA for Business
                    </Link>
                    <Link to="/write-review" className="hover:text-gray-300 transition-colors">
                      Write a Review
                    </Link>
                    <Link to="/start-project" className="hover:text-gray-300 transition-colors">
                      Start a Project
                    </Link>
                    <div className="flex items-center space-x-3">
                      <span>Hi, {user?.displayName || 'User'}</span>
                      <button
                        onClick={handleLogout}
                        className="hover:text-gray-300 transition-colors"
                      >
                        Log Out
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/business" className="hover:text-gray-300 transition-colors">
                      AAA for Business
                    </Link>
                    <Link to="/write-review" className="hover:text-gray-300 transition-colors">
                      Write a Review
                    </Link>
                    <Link to="/start-project" className="hover:text-gray-300 transition-colors">
                      Start a Project
                    </Link>
                    <button 
                      onClick={() => setShowLogin(true)} 
                      className="hover:text-gray-300 transition-colors"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => setShowSignup(true)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className={`${isHome ? 'bg-transparent text-white' : 'bg-white text-gray-700'} border-b border-gray-200`}>
            <div className="max-w-7xl mx-auto px-4">
              <nav className="flex space-x-8 py-3">
                <Link to="/restaurants" className="hover:text-red-600 transition-colors flex items-center">
                  Restaurants <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </Link>
                <Link to="/home-services" className="hover:text-red-600 transition-colors flex items-center">
                  Home & Garden <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </Link>
                <Link to="/auto-services" className="hover:text-red-600 transition-colors flex items-center">
                  Auto Services <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </Link>
                <Link to="/health" className="hover:text-red-600 transition-colors flex items-center">
                  Health & Beauty <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </Link>
                <Link to="/travel" className="hover:text-red-600 transition-colors flex items-center">
                  Travel & Activities <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </Link>
                <button className="hover:text-red-600 transition-colors flex items-center">
                  More <i className="fas fa-chevron-down ml-1 text-xs"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className={`flex items-center justify-between px-4 py-3 ${
            isHome ? 'bg-transparent text-white' : 'bg-red-600 text-white'
          }`}>
            <button className="text-sm font-medium">Open in App</button>
            <Link to="/" className="text-xl font-bold">AAA</Link>
            <button aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
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
              <Link to="/restaurants" onClick={() => setMenuOpen(false)} className="text-left text-gray-900">Restaurants</Link>
              <Link to="/home-services" onClick={() => setMenuOpen(false)} className="text-left text-gray-900">Home Services</Link>
              <Link to="/auto-services" onClick={() => setMenuOpen(false)} className="text-left text-gray-900">Auto Services</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;