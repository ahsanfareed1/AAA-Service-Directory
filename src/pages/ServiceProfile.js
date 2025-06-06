import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ServiceProfile.css';

const services = [
  {
    id: 1,
    title: 'Plumbing Services',
    description: 'Professional plumbing repairs and installations for your home and business',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop',
    tags: ['Emergency Repairs', 'Installation', 'Maintenance', '24/7 Service']
  },
  {
    id: 2,
    title: 'Electrical Work',
    description: 'Expert electrical services for your home and office with certified electricians',
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop',
    tags: ['Wiring', 'Installation', 'Repairs', 'Safety Inspection']
  },
  {
    id: 3,
    title: 'Food Catering',
    description: 'Delicious catering services for all occasions, from corporate events to weddings',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=400&fit=crop',
    tags: ['Corporate Events', 'Weddings', 'Private Parties', 'Custom Menus']
  },
  {
    id: 4,
    title: 'Home Painting',
    description: 'Professional painting services for interior and exterior with premium materials',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=400&fit=crop',
    tags: ['Interior Painting', 'Exterior Painting', 'Commercial', 'Residential']
  },
  {
    id: 5,
    title: 'Transport Services',
    description: 'Reliable transportation and logistics solutions for personal and business needs',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=400&fit=crop',
    tags: ['Moving Services', 'Delivery', 'Logistics', 'Same Day Service']
  },
  {
    id: 6,
    title: 'Home Cleaning',
    description: 'Thorough home and office cleaning services with eco-friendly products',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
    tags: ['Deep Cleaning', 'Regular Service', 'Eco-Friendly', 'Commercial']
  },
  {
    id: 7,
    title: 'Gardening & Lawn',
    description: 'Professional garden maintenance and landscaping services for beautiful outdoor spaces',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop',
    tags: ['Lawn Care', 'Landscaping', 'Garden Design', 'Maintenance']
  },
  {
    id: 8,
    title: 'Home Repair',
    description: 'General home repairs and maintenance services by skilled handymen',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=400&fit=crop',
    tags: ['Handyman Services', 'Repairs', 'Installation', 'Maintenance']
  },
  {
    id: 9,
    title: 'Locksmith Services',
    description: 'Professional locksmith services for all your security needs, available 24/7',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
    tags: ['Emergency Lockout', 'Key Duplication', 'Security Systems', '24/7 Service']
  },
  {
    id: 10,
    title: 'Online Courses',
    description: 'Comprehensive online learning for various skills and professional development',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop',
    tags: ['Professional Development', 'Certification', 'Self-Paced', 'Expert Instructors']
  },
  {
    id: 11,
    title: 'Food Delivery',
    description: 'Fast and reliable food delivery from your favorite local restaurants',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop',
    tags: ['Fast Delivery', 'Local Restaurants', 'Real-time Tracking', 'Multiple Cuisines']
  },
  {
    id: 12,
    title: 'Spa & Wellness',
    description: 'Relaxing spa treatments and wellness programs for rejuvenation',
    image: 'https://images.unsplash.com/photo-1527770625600-d6926f9d9fda?w=800&h=400&fit=crop',
    tags: ['Massage', 'Therapy', 'Relaxation', 'Beauty']
  },
  {
    id: 13,
    title: 'Pet Grooming',
    description: 'Professional grooming services to keep your pets happy and healthy',
    image: 'https://images.unsplash.com/photo-1550639524-aef92f2b33fa?w=800&h=400&fit=crop',
    tags: ['Bathing', 'Trimming', 'Nail Care', 'Pet Spa']
  },
  {
    id: 14,
    title: 'Car Repair',
    description: 'Comprehensive automotive repair and maintenance services',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=400&fit=crop',
    tags: ['Diagnostics', 'Engine Repair', 'Oil Change', 'Brakes']
  },
  {
    id: 15,
    title: 'Travel Agency',
    description: 'Expert travel planning and booking services for your next vacation',
    image: 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=800&h=400&fit=crop',
    tags: ['Flights', 'Hotels', 'Tours', 'Vacation Packages']
  },
  {
    id: 16,
    title: 'Home Security',
    description: 'Advanced security systems and installation for your home and business',
    image: 'https://images.unsplash.com/photo-1580894908361-3d9971d2ab7a?w=800&h=400&fit=crop',
    tags: ['Alarm Systems', 'CCTV', 'Monitoring', 'Installation']
  }
];

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
