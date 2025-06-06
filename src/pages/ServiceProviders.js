import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ServiceProviders.css';

const ServiceProviders = () => {
  const { serviceId } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceTitle, setServiceTitle] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const navigate = useNavigate();

  useEffect(() => {
    const serviceTitles = {
      1: "Plumbing Services",
      2: "Electrical Work", 
      3: "Food Catering",
      4: "Home Painting",
      5: "Transport Services",
      6: "Home Cleaning",
      7: "Gardening & Lawn",
      8: "Home Repair",
      9: "Locksmith Services",
      10: "Online Courses",
      11: "Food Delivery",
      12: "Spa & Wellness",
      13: "Pet Grooming",
      14: "Car Repair",
      15: "Travel Agency",
      16: "Home Security"
    };

    setServiceTitle(serviceTitles[serviceId] || 'Service Providers');
    
    const fetchProviders = () => {
      const mockProviders = {
        1: [ // Plumbing
          {
            id: 1,
            name: "John's Professional Plumbing",
            rating: 4.8,
            reviewCount: 245,
            experience: "15 years",
            phone: "+1234567890",
            location: "Downtown, 0.5 mi",
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop",
            description: "Expert in residential and commercial plumbing services with 24/7 emergency support",
            price: "$$",
            badge: "Top Rated",
            isVerified: true
          },
          {
            id: 2,
            name: "City Plumbers Co.",
            rating: 4.7,
            reviewCount: 189,
            experience: "12 years",
            phone: "+1234567891",
            location: "West District, 1.2 mi",
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop",
            description: "Specialized in emergency plumbing repairs and installations",
            price: "$$$",
            badge: "Fast Response",
            isVerified: true
          },
          {
            id: 3,
            name: "Elite Plumbing Solutions",
            rating: 4.9,
            reviewCount: 312,
            experience: "20 years",
            phone: "+1234567892",
            location: "Northside, 2.1 mi",
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop",
            description: "Full-service plumbing with premium quality materials and workmanship",
            price: "$$$$",
            badge: "Premium",
            isVerified: true
          },
          {
            id: 4,
            name: "QuickFlow Plumbing",
            rating: 4.6,
            reviewCount: 156,
            experience: "10 years",
            phone: "+1234567893",
            location: "East End, 1.8 mi",
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop",
            description: "Fast and reliable plumbing services for all your needs",
            price: "$$",
            badge: null,
            isVerified: false
          }
        ],
        2: [ // Electrical
          {
            id: 5,
            name: "PowerFix Electricians",
            rating: 4.9,
            reviewCount: 278,
            experience: "18 years",
            phone: "+1234567894",
            location: "Central, 0.8 mi",
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop",
            description: "Commercial and residential electrical solutions with certified electricians",
            price: "$$$",
            badge: "Top Rated",
            isVerified: true
          },
          {
            id: 6,
            name: "Smart Electric Pro",
            rating: 4.7,
            reviewCount: 203,
            experience: "12 years",
            phone: "+1234567895",
            location: "South Quarter, 1.5 mi",
            image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=200&fit=crop",
            description: "Smart home installations and electrical repairs",
            price: "$$$$",
            badge: "Smart Home Expert",
            isVerified: true
          }
        ],
        3: [ // Food Catering
          {
            id: 9,
            name: "Gourmet Delights",
            rating: 4.8,
            reviewCount: 189,
            experience: "8 years",
            phone: "+1234567898",
            location: "Central District, 0.3 mi",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=200&fit=crop",
            description: "Gourmet catering for all occasions with fresh, local ingredients",
            price: "$$$",
            badge: "Chef's Choice",
            isVerified: true
          },
          {
            id: 10,
            name: "Savory Bites Catering",
            rating: 4.7,
            reviewCount: 156,
            experience: "10 years",
            phone: "+1234567899",
            location: "East End, 1.1 mi",
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=200&fit=crop",
            description: "Delicious meals for every event, specializing in corporate catering",
            price: "$$",
            badge: "Corporate Specialist",
            isVerified: true
          }
        ]
        // Add more categories as needed
      };

      const categoryProviders = mockProviders[serviceId] || [];
      setProviders(categoryProviders);
      setLoading(false);
    };

    fetchProviders();
  }, [serviceId]);

  const handleProviderClick = (provider) => {
    navigate(`/provider/${serviceId}/${provider.id}`);
  };

  const sortedProviders = [...providers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'distance':
        return parseFloat(a.location.split(' ')[1]) - parseFloat(b.location.split(' ')[1]);
      default:
        return b.rating * b.reviewCount - a.rating * a.reviewCount; // recommended
    }
  });

  if (loading) {
    return (
      <div className="service-providers-page">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-providers-page">
      <div className="providers-header">
        <div className="providers-header-content">
          <Link to="/services" className="back-button">
            <i className="fas fa-arrow-left"></i>
            Back to Services
          </Link>
          <h1>{serviceTitle} Near You</h1>
        </div>
      </div>

      <div className="providers-content">
        <div className="providers-stats">
          <div className="providers-count">
            <strong>{providers.length}</strong> {serviceTitle.toLowerCase()} providers found
          </div>
          
          <div className="sort-filter">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </div>

        {sortedProviders.length > 0 ? (
          <div className="providers-grid">
            {sortedProviders.map((provider) => (
              <div 
                key={provider.id} 
                className="provider-card" 
                onClick={() => handleProviderClick(provider)}
              >
                <div className="provider-image-container">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="provider-image"
                  />
                  {provider.badge && (
                    <div className="provider-badge">{provider.badge}</div>
                  )}
                </div>
                
                <div className="provider-info">
                  <div className="provider-header">
                    <h3>{provider.name}</h3>
                    <div className="provider-price">{provider.price}</div>
                  </div>
                  
                  <div className="provider-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < Math.floor(provider.rating) ? '' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="rating-number">
                      {provider.rating} ({provider.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <div className="provider-details">
                    <div className="provider-detail">
                      <i className="fas fa-briefcase"></i>
                      <span>{provider.experience} experience</span>
                    </div>
                    <div className="provider-detail location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{provider.location}</span>
                    </div>
                    <div className="provider-detail">
                      <i className="fas fa-phone"></i>
                      <span>{provider.phone}</span>
                    </div>
                    {provider.isVerified && (
                      <div className="provider-detail">
                        <i className="fas fa-check-circle" style={{color: '#10b981'}}></i>
                        <span style={{color: '#10b981'}}>Verified Business</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="description">{provider.description}</p>
                  
                  <div className="provider-actions">
                    <button 
                      className="contact-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle contact action
                      }}
                    >
                      <i className="fas fa-phone"></i>
                      Contact Now
                    </button>
                    <button 
                      className="save-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle save action
                      }}
                    >
                      <i className="fas fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-providers">
            <i className="fas fa-search"></i>
            <h3>No providers found</h3>
            <p>Try searching in a different area or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviders;