import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Plumbing Services',
      description: 'Professional plumbing repairs and installations for your home and business',
      icon: '🔧',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop',
      rating: 4.5,
      category: 'Home Services',
      tags: ['Emergency Repairs', 'Installation', 'Maintenance', '24/7 Service']
    },
    {
      id: 2,
      title: 'Electrical Work',
      description: 'Expert electrical services for your home and office with certified electricians',
      icon: '⚡',
      image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop',
      rating: 4.7,
      category: 'Home Services',
      tags: ['Wiring', 'Installation', 'Repairs', 'Safety Inspection']
    },
    {
      id: 3,
      title: 'Food Catering',
      description: 'Delicious catering services for all occasions, from corporate events to weddings',
      icon: '🍽️',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=200&fit=crop',
      rating: 4.8,
      category: 'Food & Dining',
      tags: ['Corporate Events', 'Weddings', 'Private Parties', 'Custom Menus']
    },
    {
      id: 4,
      title: 'Home Painting',
      description: 'Professional painting services for interior and exterior with premium materials',
      icon: '🎨',
      image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=200&fit=crop',
      rating: 4.6,
      category: 'Home Services',
      tags: ['Interior Painting', 'Exterior Painting', 'Commercial', 'Residential']
    },
    {
      id: 5,
      title: 'Transport Services',
      description: 'Reliable transportation and logistics solutions for personal and business needs',
      icon: '🚛',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=200&fit=crop',
      rating: 4.3,
      category: 'Transportation',
      tags: ['Moving Services', 'Delivery', 'Logistics', 'Same Day Service']
    },
    {
      id: 6,
      title: 'Home Cleaning',
      description: 'Thorough home and office cleaning services with eco-friendly products',
      icon: '🧽',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=200&fit=crop',
      rating: 4.4,
      category: 'Home Services',
      tags: ['Deep Cleaning', 'Regular Service', 'Eco-Friendly', 'Commercial']
    },
    {
      id: 7,
      title: 'Gardening & Lawn',
      description: 'Professional garden maintenance and landscaping services for beautiful outdoor spaces',
      icon: '🌿',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=200&fit=crop',
      rating: 4.5,
      category: 'Home Services',
      tags: ['Lawn Care', 'Landscaping', 'Garden Design', 'Maintenance']
    },
    {
      id: 8,
      title: 'Home Repair',
      description: 'General home repairs and maintenance services by skilled handymen',
      icon: '🔨',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=200&fit=crop',
      rating: 4.2,
      category: 'Home Services',
      tags: ['Handyman Services', 'Repairs', 'Installation', 'Maintenance']
    },
    {
      id: 9,
      title: 'Locksmith Services',
      description: 'Professional locksmith services for all your security needs, available 24/7',
      icon: '🔐',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      rating: 4.6,
      category: 'Security',
      tags: ['Emergency Lockout', 'Key Duplication', 'Security Systems', '24/7 Service']
    },
    {
      id: 10,
      title: 'Online Courses',
      description: 'Comprehensive online learning for various skills and professional development',
      icon: '📚',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=200&fit=crop',
      rating: 4.7,
      category: 'Education',
      tags: ['Professional Development', 'Certification', 'Self-Paced', 'Expert Instructors']
    },
    {
      id: 11,
      title: 'Food Delivery',
      description: 'Fast and reliable food delivery from your favorite local restaurants',
      icon: '🍔',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=400&h=200&fit=crop',
      rating: 4.1,
      category: 'Food & Dining',
      tags: ['Fast Delivery', 'Local Restaurants', 'Real-time Tracking', 'Multiple Cuisines']
    },
    {
      id: 12,
      title: 'Spa & Wellness',
      description: 'Relaxing spa treatments and wellness programs for rejuvenation',
      icon: '💆',
      image: 'https://images.unsplash.com/photo-1527770625600-d6926f9d9fda?w=400&h=200&fit=crop',
      rating: 4.6,
      category: 'Health & Wellness',
      tags: ['Massage', 'Therapy', 'Relaxation', 'Beauty']
    },
    {
      id: 13,
      title: 'Pet Grooming',
      description: 'Professional grooming services to keep your pets happy and healthy',
      icon: '🐾',
      image: 'https://images.unsplash.com/photo-1550639524-aef92f2b33fa?w=400&h=200&fit=crop',
      rating: 4.5,
      category: 'Pets',
      tags: ['Bathing', 'Trimming', 'Nail Care', 'Pet Spa']
    },
    {
      id: 14,
      title: 'Car Repair',
      description: 'Comprehensive automotive repair and maintenance services',
      icon: '🚗',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=200&fit=crop',
      rating: 4.4,
      category: 'Automotive',
      tags: ['Diagnostics', 'Engine Repair', 'Oil Change', 'Brakes']
    },
    {
      id: 15,
      title: 'Travel Agency',
      description: 'Expert travel planning and booking services for your next vacation',
      icon: '✈️',
      image: 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=400&h=200&fit=crop',
      rating: 4.7,
      category: 'Travel',
      tags: ['Flights', 'Hotels', 'Tours', 'Vacation Packages']
    },
    {
      id: 16,
      title: 'Home Security',
      description: 'Advanced security systems and installation for your home and business',
      icon: '🛡️',
      image: 'https://images.unsplash.com/photo-1580894908361-3d9971d2ab7a?w=400&h=200&fit=crop',
      rating: 4.8,
      category: 'Security',
      tags: ['Alarm Systems', 'CCTV', 'Monitoring', 'Installation']
    }
  ];

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