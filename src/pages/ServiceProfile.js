import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceProfile.css';

import services from "../data/servicesData";

const ServiceProfile = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === Number(serviceId));

  if (!service) {
    return (
      <div className="service-profile">
        <div className="service-details container">
          <h2>Service not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="service-profile">
      <div
        className="service-hero"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>{service.title}</h1>
          <button
            className="providers-btn"
            onClick={() => navigate(`/service-providers/${service.id}`)}
          >
            View Providers
          </button>
        </div>
      </div>
      <div className="service-details container">
        <p className="description">{service.description}</p>
        <p className="price">Starting from PKR {service.priceStart}</p>
        <p className="phone">Call: <a href={`tel:${service.phone}`}>{service.phone}</a></p>
        <div className="tags">
          {service.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProfile;
