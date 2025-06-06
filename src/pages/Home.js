import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(searchLocation)}`);
  };

  const categories = [
    { icon: 'utensils', label: 'Restaurants', link: '/restaurants' },
    { icon: 'home', label: 'Home Services', link: '/home-services' },
    { icon: 'car', label: 'Auto Services', link: '/auto-services' },
    { icon: 'spa', label: 'Beauty & Spas', link: '/beauty-spas' },
    { icon: 'dumbbell', label: 'Active Life', link: '/active-life' },
    { icon: 'shopping-bag', label: 'Shopping', link: '/shopping' },
    { icon: 'briefcase', label: 'Professional Services', link: '/professional-services' },
    { icon: 'calendar', label: 'Event Planning', link: '/event-planning' },
    { icon: 'paw', label: 'Pets', link: '/pets' },
    { icon: 'plane', label: 'Travel', link: '/travel' },
    { icon: 'heart', label: 'Health & Medical', link: '/health-medical' },
    { icon: 'graduation-cap', label: 'Education', link: '/education' }
  ];

  const recentActivity = [
    {
      user: 'Sarah K.',
      business: 'Elite Cleaning Services',
      text: 'Amazing service! They left my house spotless.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face',
      rating: 5
    },
    {
      user: 'Mike R.',
      business: 'QuickFix Plumbing',
      text: 'Fast response and professional work.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      rating: 5
    },
    {
      user: 'Jennifer L.',
      business: 'Gourmet Catering Co.',
      text: 'Perfect for our wedding! Highly recommend.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      rating: 5
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Get next level clean</h1>
          <div className="hero-search">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-inputs">
                <input
                  type="text"
                  placeholder="e.g. plumbers, electricians, cleaners"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input what-input"
                />
                <input
                  type="text"
                  placeholder="e.g. Lahore, Pakistan"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="search-input where-input"
                />
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
          <div className="hero-cta">
            <Link to="/services" className="cta-button">
              <i className="fas fa-spray-can"></i>
              Pressure washing
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop" 
            alt="Professional cleaning service"
          />
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="recent-activity-section">
        <div className="container">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <img src={activity.avatar} alt={activity.user} className="activity-avatar" />
                <div className="activity-content">
                  <p>
                    <strong>{activity.user}</strong> reviewed{' '}
                    <Link to="#" className="business-link">{activity.business}</Link>
                  </p>
                  <div className="activity-rating">
                    {[...Array(activity.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="activity-text">"{activity.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Categories</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={category.link} 
                className="category-item"
              >
                <div className="category-icon">
                  <i className={`fas fa-${category.icon}`}></i>
                </div>
                <span className="category-label">{category.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="popular-services-section">
        <div className="container">
          <h2>Popular Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop" alt="Plumbing" />
              <div className="service-content">
                <h3>Plumbing</h3>
                <p>Professional plumbing services</p>
                <div className="service-rating">
                  <span className="rating">4.8</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="service-card">
              <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop" alt="Cleaning" />
              <div className="service-content">
                <h3>House Cleaning</h3>
                <p>Professional cleaning services</p>
                <div className="service-rating">
                  <span className="rating">4.9</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="service-card">
              <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop" alt="Electrical" />
              <div className="service-content">
                <h3>Electrical</h3>
                <p>Licensed electricians</p>
                <div className="service-rating">
                  <span className="rating">4.7</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="service-card">
              <img src="https://images.unsplash.com/photo-1555244162-803834f70033?w=300&h=200&fit=crop" alt="Catering" />
              <div className="service-content">
                <h3>Catering</h3>
                <p>Event catering services</p>
                <div className="service-rating">
                  <span className="rating">4.6</span>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;