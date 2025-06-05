import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&location=${location}`);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="flex">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  className="block w-full rounded-l-lg border-gray-300 pl-4 pr-12 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Search for services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  className="block w-full border-l-0 border-gray-300 pl-4 pr-12 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-r-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <i className="fas fa-search mr-2"></i>
                Search
              </button>
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/messages" className="text-gray-700 hover:text-red-600">
                  <i className="fas fa-envelope"></i>
                </Link>
                <Link to="/notifications" className="text-gray-700 hover:text-red-600">
                  <i className="fas fa-bell"></i>
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-red-600">
                    <img
                      src={user?.photoURL || "https://via.placeholder.com/32"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <i className="fas fa-chevron-down ml-2"></i>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* Categories */}
        <div className="py-3 border-t">
          <nav className="flex space-x-8">
            <Link to="/restaurants" className="text-gray-700 hover:text-red-600">
              Restaurants
            </Link>
            <Link to="/home-services" className="text-gray-700 hover:text-red-600">
              Home Services
            </Link>
            <Link to="/auto-services" className="text-gray-700 hover:text-red-600">
              Auto Services
            </Link>
            <Link to="/more" className="text-gray-700 hover:text-red-600">
              More
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;