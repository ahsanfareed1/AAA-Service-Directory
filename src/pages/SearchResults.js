import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchResults.css';

const sampleResults = [
  {
    id: 1,
    name: 'John\'s Plumbing',
    rating: 4.8,
    tags: ['Certified', 'Locally Owned'],
    responseTime: 'Responds in about 30 mins',
    image: 'https://images.unsplash.com/photo-1581579186386-5930e2eaf7ad?auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 2,
    name: 'Bright Electric',
    rating: 4.6,
    tags: ['Verified License'],
    responseTime: 'Responds in about 1 hour',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=60',
  },
  {
    id: 3,
    name: 'Clean & Shine',
    rating: 4.7,
    tags: ['Locally Owned'],
    responseTime: 'Responds in about 45 mins',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=60',
  },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service') || 'Services';
  const city = searchParams.get('city') || 'Your City';
  const state = searchParams.get('state') || '';

  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Open Now', 'Price', 'Offers Delivery', 'Accepts Credit Cards', 'Request a Quote', 'Verified'];

  return (
    <div className="search-results">
      <h1 className="results-title">Top {service} Near {city}{state && `, ${state}`}</h1>
      <div className="filter-bar">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="results-layout">
        <div className="results-list">
          {sampleResults.map((res) => (
            <div key={res.id} className="result-card">
              <img src={res.image} alt={res.name} className="result-image" />
              <div className="result-info">
                <h3>{res.name}</h3>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star${i < Math.floor(res.rating) ? '' : ' empty'}`}></i>
                  ))}
                  <span className="rating-number">{res.rating.toFixed(1)}</span>
                </div>
                <div className="tags">
                  {res.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <p className="response-time">{res.responseTime}</p>
                <button className="cta-button">Request an Appointment</button>
              </div>
            </div>
          ))}
        </div>
        <div className="results-map">
          <img src="https://maps.gstatic.com/tactile/pane/default_geocode-2x.png" alt="map" />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
