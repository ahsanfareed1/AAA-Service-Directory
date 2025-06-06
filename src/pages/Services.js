import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Services.css';
import services from "../data/servicesData";

const Services = () => {

  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    navigate(`/service-providers/${serviceId}`);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Discover our comprehensive range of professional services designed to meet all your needs</p>
      </div>

      <div className="services-content">
        <div className="services-filters">
          <div className="search-container">
            <input 
              type="text" 
              className="search-input"
              placeholder="Search services, categories, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="category-filter">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="services-grid">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="service-card"
              onClick={() => handleServiceClick(service.id)}
            >
              <img
                src={service.image}
                alt={service.title}
                className="service-image"
              />
              <div className="service-content">
                <div className="service-header">
                  <span className="service-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                </div>
                
                <div className="service-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${
                        i < Math.round(service.rating) ? '' : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                  <span>{service.rating.toFixed(1)} rating</span>
                </div>
                
                <p>{service.description}</p>
                
                <div className="service-meta">
                  <span className="service-category">{service.category}</span>
                  <div className="service-tags">
                    {service.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="service-tag">
                        {tag}
                      </span>
                    ))}
                    {service.tags.length > 3 && (
                      <span className="service-tag">+{service.tags.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <h3>No services found</h3>
            <p>Try adjusting your search terms or browse all categories</p>
          </div>
        )}

        <div className="cta-section">
          <h2>Need Help Finding the Right Service?</h2>
          <p>Our team is here to help you connect with the perfect service provider for your needs</p>
          <Link to="/contact" className="cta-button">Contact Us Today</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
