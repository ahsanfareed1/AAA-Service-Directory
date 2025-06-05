import React from 'react';
import './Home.css';
import ServicesSection from '../components/ServicesSection';

const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for search logic
  };

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Find the best local services</h1>
        <p>Restaurants, home services, auto repair and more</p>
        <div className="search-section">
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-bar">
              <input type="text" className="search-input" placeholder="tacos, plumbers, delivery" />
              <input type="text" className="search-input" placeholder="Location" />
              <button type="submit" className="search-button">Search</button>
            </div>
          </form>
        </div>
      </section>

      <ServicesSection />
    </div>
  );
};

export default Home;