import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import services from '../data/servicesData';

const heroSlides = [
  {
    image: 'https://s3-media0.fl.yelpcdn.com/educatorphoto/a5TFEcmNBpVEyrmjux1TKA/o.jpg',
    title: 'Get next level clean',
    cta: 'Pressure washing',
    credit: 'ClearVue House Services - Photo from the business owner'
  },
  {
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&h=600&fit=crop',
    title: 'Discover great food',
    cta: 'Restaurants',
    credit: 'Photo by Unsplash'
  },
  {
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&h=600&fit=crop',
    title: 'Expert electricians ready',
    cta: 'Find Electricians',
    credit: 'Photo by Unsplash'
  },
  {
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop',
    title: 'Professional cleaning',
    cta: 'House Cleaning',
    credit: 'Photo by Unsplash'
  },
  {
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1200&h=600&fit=crop',
    title: 'Home repairs done right',
    cta: 'Handyman Services',
    credit: 'Photo by Unsplash'
  },
  {
    image: 'https://images.unsplash.com/photo-1616352218533-bf580e5959e0?w=1200&h=600&fit=crop',
    title: 'Relax at the spa',
    cta: 'Spa & Wellness',
    credit: 'Photo by Unsplash'
  },
  {
    image: 'https://images.unsplash.com/photo-1550639524-aef92f2b33fa?w=1200&h=600&fit=crop',
    title: 'Pamper your pets',
    cta: 'Pet Grooming',
    credit: 'Photo by Unsplash'
  },
  {
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=600&fit=crop',
    title: 'Travel the world',
    cta: 'Book Travel',
    credit: 'Photo by Unsplash'
  }
];

const categories = [
  { icon: 'utensils', label: 'Restaurants', link: '/restaurants' },
  { icon: 'shopping-bag', label: 'Shopping', link: '/shopping' },
  { icon: 'cocktail', label: 'Nightlife', link: '/nightlife' },
  { icon: 'dumbbell', label: 'Active Life', link: '/active-life' },
  { icon: 'spa', label: 'Beauty & Spas', link: '/beauty-spas' },
  { icon: 'car', label: 'Automotive', link: '/automotive' },
  { icon: 'home', label: 'Home Services', link: '/home-services' },
  { icon: 'briefcase', label: 'Professional Services', link: '/professional-services' },
  { icon: 'paw', label: 'Pets', link: '/pets' },
  { icon: 'heart', label: 'Health & Medical', link: '/health-medical' },
  { icon: 'calendar', label: 'Event Planning', link: '/event-planning' },
  { icon: 'graduation-cap', label: 'Education', link: '/education' }
];

const sponsoredServices = [
  {
    id: 1,
    name: "Elite Plumbing Solutions",
    category: "Plumbing",
    rating: 4.9,
    reviewCount: 245,
    price: "$$$",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
    description: "Professional plumbing services with 24/7 emergency support",
    badge: "Sponsored",
    isVerified: true
  },
  {
    id: 2,
    name: "Gourmet Catering Co.",
    category: "Catering",
    rating: 4.8,
    reviewCount: 189,
    price: "$$$$",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&h=200&fit=crop",
    description: "Premium catering for weddings and corporate events",
    badge: "Sponsored",
    isVerified: true
  },
  {
    id: 3,
    name: "Quick Fix Electricians",
    category: "Electrical",
    rating: 4.7,
    reviewCount: 312,
    price: "$$",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
    description: "Licensed electricians for all your electrical needs",
    badge: "Sponsored",
    isVerified: true
  },
  {
    id: 4,
    name: "Sparkle Clean Services",
    category: "Cleaning",
    rating: 4.6,
    reviewCount: 156,
    price: "$$",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
    description: "Professional home and office cleaning services",
    badge: "Sponsored",
    isVerified: true
  },
  {
    id: 5,
    name: "Master Painters Pro",
    category: "Painting",
    rating: 4.8,
    reviewCount: 203,
    price: "$$$",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop",
    description: "Interior and exterior painting with premium materials",
    badge: "Sponsored",
    isVerified: true
  }
];

const featuredServices = services.slice(0, 4);

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

const Home = () => {
  const navigate = useNavigate();

  const heroSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: true
  };

  return (
    <div className="home-page">
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <Slider {...heroSettings}>
          {heroSlides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <div 
                className="hero-background"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-overlay"></div>
                <div className="hero-content">
                  <h1>{slide.title}</h1>
                  <Link to="/services" className="hero-cta-button">
                    <i className="fas fa-search"></i>
                    {slide.cta}
                  </Link>
                </div>
                <div className="hero-credit">
                  {slide.credit}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Featured Services Section */}
      <section className="featured-services-section">
        <div className="container">
          <h2>Featured Services</h2>
          <div className="services-grid">
            {featuredServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-image-container">
                  <img src={service.image} alt={service.title} className="service-image" />
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p className="service-price">Starting from PKR {service.priceStart}</p>
                  <p className="service-category">{service.category}</p>
                  <div className="flex gap-2 mt-2">
                    <Link to={`/service-providers/${service.id}`} className="contact-button flex-1 text-center">Request Inquiry</Link>
                    <a href={`tel:${service.phone}`} className="contact-button flex-1 text-center">Call Now</a>
                    <Link to={`/service/${service.id}`} className="contact-button flex-1 text-center">View Profile</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* Sponsored Services Section */}
      <section className="sponsored-services-section">
        <div className="container">
          <h2>Sponsored Services</h2>
          <div className="services-grid">
            {sponsoredServices.map((service) => (
              <div key={service.id} className="service-card sponsored">
                <div className="service-image-container">
                  <img src={service.image} alt={service.name} className="service-image" />
                  <div className="service-badge">{service.badge}</div>
                  {service.isVerified && (
                    <div className="verified-badge">
                      <i className="fas fa-check-circle"></i>
                    </div>
                  )}
                </div>
                <div className="service-content">
                  <div className="service-header">
                    <h3>{service.name}</h3>
                    <span className="service-price">{service.price}</span>
                  </div>
                  <div className="service-category">{service.category}</div>
                  <div className="service-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < Math.floor(service.rating) ? '' : 'text-gray-300'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="rating-text">
                      {service.rating} ({service.reviewCount} reviews)
                    </span>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <button 
                    className="contact-button"
                    onClick={() => navigate(`/service-providers/${service.category.toLowerCase()}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
