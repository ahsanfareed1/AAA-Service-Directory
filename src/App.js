import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { createContext, useState, useContext, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceProviders from './pages/ServiceProviders';
import ProviderProfile from './pages/ProviderProfile';
import Contact from './pages/Contact';
import About from './pages/About';
import CustomerProfile from './pages/CustomerProfile';
import Search from './pages/Search';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const AuthContext = createContext(null);

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const authContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/search" element={<Search />} />
              <Route path="/service-providers/:serviceId" element={
                <ProtectedRoute>
                  <ServiceProviders />
                </ProtectedRoute>
              } />
              <Route path="/provider/:serviceId/:providerId" element={
                <ProtectedRoute>
                  <ProviderProfile />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <CustomerProfile />
                </ProtectedRoute>
              } />
              {/* Category Routes */}
              <Route path="/restaurants" element={<Services />} />
              <Route path="/home-services" element={<Services />} />
              <Route path="/auto-services" element={<Services />} />
              <Route path="/health" element={<Services />} />
              <Route path="/travel" element={<Services />} />
              <Route path="/shopping" element={<Services />} />
              <Route path="/nightlife" element={<Services />} />
              <Route path="/active-life" element={<Services />} />
              <Route path="/beauty-spas" element={<Services />} />
              <Route path="/automotive" element={<Services />} />
              <Route path="/professional-services" element={<Services />} />
              <Route path="/pets" element={<Services />} />
              <Route path="/health-medical" element={<Services />} />
              <Route path="/event-planning" element={<Services />} />
              <Route path="/education" element={<Services />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;