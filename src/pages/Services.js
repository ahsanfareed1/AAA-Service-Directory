import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Plumbing Services',
      description: 'Professional plumbing repairs and installations',
      icon: '🚰',
      image: 'https://source.unsplash.com/featured/?plumbing',
      rating: 4.5,
      category: 'Plumbing',
      tags: ['Repairs', 'Installation', 'Maintenance', 'Emergency']
    },
    {
      id: 2,
      title: 'Electrical Work',
      description: 'Expert electrical services for your home and office',
      icon: '⚡',
      image: 'https://source.unsplash.com/featured/?electrician',
      rating: 4.0,
      category: 'Electrical',
      tags: ['Wiring', 'Installation', 'Repairs', 'Safety']
    },
    {
      id: 3,
      title: 'Food Catering',
      description: 'Delicious catering services for all occasions',
      icon: '👨‍🍳',
      image: 'https://source.unsplash.com/featured/?catering',
      rating: 4.7,
      category: 'Food',
      tags: ['Catering', 'Events', 'Private Chef', 'Parties']
    },
    {
      id: 4,
      title: 'Home Painting',
      description: 'Professional painting services for interior and exterior',
      icon: '🎨',
      image: 'https://source.unsplash.com/featured/?painting',
      rating: 4.2,
      category: 'Painting',
      tags: ['Interior', 'Exterior', 'Commercial', 'Residential']
    },
    {
      id: 5,
      title: 'Transport Services',
      description: 'Reliable transportation and logistics solutions',
      icon: '🚗',
      image: 'https://source.unsplash.com/featured/?transport',
      rating: 4.1,
      category: 'Transport',
      tags: ['Delivery', 'Moving', 'Logistics', 'Transport']
    },
    {
      id: 6,
      title: 'Home Cleaning',
      description: 'Thorough home and office cleaning services',
      icon: '🧹',
      image: 'https://source.unsplash.com/featured/?cleaning',
      rating: 4.3,
      category: 'Cleaning',
      tags: ['Deep Clean', 'Regular', 'Commercial', 'Residential']
    },
    {
      id: 7,
      title: 'Gardening & Lawn',
      description: 'Professional garden maintenance and landscaping',
      icon: '🌿',
      image: 'https://source.unsplash.com/featured/?gardening',
      rating: 4.6,
      category: 'Gardening',
      tags: ['Maintenance', 'Landscaping', 'Design', 'Care']
    },
    {
      id: 8,
      title: 'Home Repair',
      description: 'General home repairs and maintenance services',
      icon: '🔧',
      image: 'https://source.unsplash.com/featured/?home%20repair',
      rating: 4.4,
      category: 'Repair',
      tags: ['Maintenance', 'Repairs', 'Installation', 'Renovation']
    },
    {
      id: 9,
      title: 'Locksmith Services',
      description: 'Professional locksmith services for all your security needs',
      icon: '🔐',
      image: 'https://source.unsplash.com/featured/?locksmith',
      rating: 4.1,
      category: 'Security',
      tags: ['Emergency', 'Lockout', 'Key Duplication', 'Security']
    },
    {
      id: 10,
      title: 'Online Courses',
      description: 'Comprehensive online learning for various skills and subjects',
      icon: '🎓',
      image: 'https://source.unsplash.com/featured/?online%20course',
      rating: 4.5,
      category: 'Education',
      tags: ['E-learning', 'Certification', 'Workshops', 'Tutorials']
    },
    {
      id: 11,
      title: 'Food Delivery',
      description: 'Fast and reliable food delivery from your favorite restaurants',
      icon: '🍔',
      image: 'https://source.unsplash.com/featured/?food%20delivery',
      rating: 4.2,
      category: 'Food',
      tags: ['Delivery', 'Takeout', 'Meal Kits', 'Groceries']
    }
  ];

  const navigate = useNavigate();

  const handleServiceClick = (serviceId) => {
    navigate(`/service-providers/${serviceId}`);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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
        <p>Discover our comprehensive range of professional services</p>
      </div>

      <div className="services-filters">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>

        <div className="category-filter">
          <select 
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Food">Food</option>
            <option value="Painting">Painting</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Gardening">Gardening</option>
            <option value="Repair">Repair</option>
            <option value="Transport">Transport</option>
            <option value="Security">Security</option>
            <option value="Education">Education</option>
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
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <div className="service-rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-star${
                      i < Math.round(service.rating)
                        ? ''
                        : ' text-gray-300'
                    }`}
                  ></i>
                ))}
                <span className="ml-1 text-sm text-gray-600">
                  {service.rating.toFixed(1)}
                </span>
              </div>
              <p>{service.description}</p>
              <div className="service-meta">
                <span className="service-category">{service.category}</span>
                <div className="service-tags">
                  {service.tags.map((tag, index) => (
                    <span key={index} className="service-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredServices.length === 0 && (
          <div className="no-results">
            <p>No services found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      <div className="cta-section">
        <h2>Need Help Finding the Right Service?</h2>
        <p>Contact us today to learn more about our services</p>
        <Link to="/contact" className="cta-button">Contact Us</Link>
      </div>
    </div>
  );
};

export default Services;