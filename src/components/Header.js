import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import services from '../data/servicesData';

const categories = [
  { icon: 'utensils', label: 'Restaurants', path: '/restaurants' },
  { icon: 'truck', label: 'Delivery', path: '/delivery' },
  { icon: 'shopping-bag', label: 'Takeout', path: '/takeout' },
  { icon: 'calculator', label: 'Accountants', path: '/accountants' },
  { icon: 'wrench', label: 'Plumbers', path: '/plumbers' },
  { icon: 'car', label: 'Auto Repair', path: '/auto-repair' },
];

const searchOptions = [
  ...categories.map((c) => ({ icon: c.icon, label: c.label })),
  ...services.map((s) => ({ icon: null, label: s.title })),
];

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('Manassas, VA 20110');
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(searchLocation)}`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setSearchLocation('Current Location');
        },
        () => setSearchLocation('Current Location')
      );
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : isHome ? 'bg-transparent' : 'bg-white shadow-sm'
      }`}>
        {/* Desktop Header */}
        <div className="hidden md:block">
          {/* Top Header Bar */}
          <div style={{
            background: isHome ? 'transparent' : 'linear-gradient(135deg, #1e3a8a 0%, #1f2937 100%)',
            height: '70px'
          }}>
            <div className="w-full px-4 flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <div className="text-white text-2xl font-bold">
                  <i className="fab fa-yelp mr-2"></i>
                  AAA
                </div>
              </Link>

              {/* Search Bar - Center */}
              <div className="flex-1 flex justify-center">
                <form onSubmit={handleSearch} className="w-full max-w-7xl px-4">
                  <div className="flex bg-white rounded-md shadow-lg overflow-hidden">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="e.g. tacos, Mel's"
                      className="w-full px-4 py-3 text-gray-900 focus:outline-none"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    />
                    {showSuggestions && searchTerm && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-10 max-h-48 overflow-y-auto">
                        {searchOptions
                          .filter(o => o.label.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((o) => (
                            <div
                              key={o.label}
                              className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                              onMouseDown={() => {
                                setSearchTerm(o.label);
                                setShowSuggestions(false);
                              }}
                            >
                              {o.icon && <i className={`fas fa-${o.icon} w-5 mr-3 text-gray-600`}></i>}
                              <span className="text-gray-900">{o.label}</span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="w-px bg-gray-300"></div>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Manassas, VA 20110"
                      className="w-full px-4 py-3 text-gray-900 focus:outline-none"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onFocus={() => {
                        setShowLocationSuggestions(true);
                        if (!searchLocation) detectLocation();
                      }}
                      onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                    />
                    {showLocationSuggestions && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-md shadow-lg z-10">
                        <div
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                          onMouseDown={() => {
                            detectLocation();
                            setShowLocationSuggestions(false);
                          }}
                        >
                          Select Current Location
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-6 py-3 hover:bg-red-700 transition-colors"
                  >
                    <i className="fas fa-search text-lg"></i>
                  </button>
                </div>
              </form>
              </div>

              {/* Right Navigation */}
              <div className="flex items-center space-x-6 text-white ml-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/business\" className="hover:text-gray-300 transition-colors">
                      AAA for Business
                    </Link>
                    <Link to="/write-review" className="hover:text-gray-300 transition-colors">
                      Write a Review
                    </Link>
                    <Link to="/complaint" className="hover:text-gray-300 transition-colors">
                      Send Complaint
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
                    <Link to="/complaint" className="hover:text-gray-300 transition-colors">
                      Send Complaint
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
            <div className="flex justify-center">
              <div className="w-full max-w-7xl px-4">
                <nav className="flex space-x-8 py-3 justify-center">
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
          <div
            className={`flex items-center justify-between px-4 py-3 ${
              scrolled ? 'bg-white text-gray-900 shadow' : 'bg-red-600 text-white'
            }`}
          >
            <Link to="#open-app" className="text-sm font-medium">
              Open in App
            </Link>
            <Link to="/" className="text-xl font-bold">
              AAA
            </Link>
            <button aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
          <div className="px-4 py-2 bg-white">
            <input
              type="text"
              placeholder="e.g. tacos, Mel's"
              className="w-full rounded-md border px-3 py-2 text-gray-900"
              onFocus={() => setMobileSearchOpen(true)}
            />
          </div>
        </div>
        {/* close containers */}
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
      {mobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between bg-red-600 text-white px-4 py-3">
            <button onClick={() => setMobileSearchOpen(false)}>Cancel</button>
            <span className="font-semibold">Search</span>
            <button onClick={handleSearch}>Search</button>
          </div>
          <form onSubmit={handleSearch} className="p-4 space-y-4 overflow-y-auto flex-1">
            <input
              type="text"
              placeholder="e.g. tacos, Mel's"
              className="w-full border rounded-md px-3 py-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="text"
              placeholder="Manassas, VA 20110"
              className="w-full border rounded-md px-3 py-2"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <ul className="space-y-2 pt-4 border-t">
              {categories.map((c) => (
                <li key={c.label} className="flex items-center text-gray-700">
                  <i className={`fas fa-${c.icon} w-5 mr-3`}></i>
                  {c.label}
                </li>
              ))}
            </ul>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex items-center justify-between bg-red-600 text-white px-4 py-3">
            <div className="text-xl font-bold mx-auto">AAA</div>
            <button aria-label="Close" onClick={() => setMenuOpen(false)} className="text-2xl">✕</button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-4">
            <button
              onClick={() => { setMenuOpen(false); setShowSignup(true); }}
              className="block text-left text-gray-900 font-semibold"
            >
              Sign Up
            </button>
            <button
              onClick={() => { setMenuOpen(false); setShowLogin(true); }}
              className="block text-left text-gray-900"
            >
              Log In
            </button>
            <Link to="#nearby" className="text-gray-900">Nearby</Link>
            <Link to="#bookmarks" className="text-gray-900">Bookmarks</Link>
            <Link to="#project" className="text-gray-900">Start a Project</Link>
            <Link to="#add-business" className="text-gray-900">Add a Business on Yelp</Link>
          </nav>
          <div className="p-4 border-t text-center space-y-3">
            <Link to="#ad-choices" className="text-gray-900 block">Ad Choices</Link>
            <Link to="#support" className="text-gray-900 block">Support</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
