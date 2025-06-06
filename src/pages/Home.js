import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import ServiceCard from '../components/ServiceCard';

const heroSlides = [
  {
    image:
      'https://mistyclean.com/wp-content/uploads/2024/07/Banner-img-Professional-cleaning-Services-in-Maryland-scaled.webp',
    title: 'Get next level clean',
    cta: 'Pressure Washing',
    credit: 'Photo by Misty Clean'
  },
  {
    image:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/4d/33/72/ground-floor-dining-area.jpg',
    title: 'Discover great food',
    cta: 'Restaurants'
  },
  {
    image:
      'https://www.unitec.ac.nz/sites/default/files/public/Unitec201002Engineering_8259.jpg.jpg',
    title: 'Expert electricians ready',
    cta: 'Find Electricians'
  }
];

const heroSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true
};

const categories = [
  { icon: 'utensils', label: 'Restaurants' },
  { icon: 'tools', label: 'Plumbers' },
  { icon: 'bolt', label: 'Electricians' },
  { icon: 'spa', label: 'Beauty Salons' },
  { icon: 'paw', label: 'Dog Groomers' },
  { icon: 'car', label: 'Auto Mechanics' },
  { icon: 'gavel', label: 'Lawyers' },
  { icon: 'leaf', label: 'Landscapers' },
  { icon: 'tooth', label: 'Dentists' },
  { icon: 'dumbbell', label: 'Gyms' },
  { icon: 'soap', label: 'Car Wash' },
  { icon: 'baby', label: 'Daycare' },
];

const recentActivity = [
  {
    user: 'Sarah K.',
    business: 'Lahore Plumbing Co.',
    text: 'Great service and quick response!',
    avatar: 'https://source.unsplash.com/50x50/?woman',
  },
  {
    user: 'Omar T.',
    business: 'Best Electricians',
    text: 'Solved my wiring issue in no time.',
    avatar: 'https://source.unsplash.com/50x50/?man',
  },
];

const featuredListings = [
  {
    id: 1,
    name: 'Bright Star Plumbing',
    description: 'Expert plumbing services with 24/7 support.',
    image: 'https://source.unsplash.com/300x200/?plumbing',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Elite Electricians',
    description: 'Certified electricians for home and office.',
    image: 'https://source.unsplash.com/300x200/?electrician',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Taste of Lahore',
    description: 'Authentic cuisine with great ambiance.',
    image: 'https://source.unsplash.com/300x200/?restaurant',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Sparkle Car Wash',
    description: 'Quick and affordable car wash service.',
    image: 'https://source.unsplash.com/300x200/?carwash',
    rating: 4.5,
  },
];

const faqs = [
  {
    q: 'How do I book a service?',
    a: 'Browse listings, choose a provider and click Book Now to schedule.',
  },
  {
    q: 'Can I review a business?',
    a: 'Yes, after completing a service you can leave a review on their page.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'We are working on it! For now you can use the mobile website.',
  },
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-carousel">
        <Slider {...heroSettings}>
          {heroSlides.map((slide) => (
            <div
              key={slide.title}
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay"></div>
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <button className="cta-button">{slide.cta}</button>
                {slide.credit && (
                  <span className="credit-text">{slide.credit}</span>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="browse-categories">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <div key={c.label} className="category-item">
              <i className={`fas fa-${c.icon}`}></i>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link to="/services" className="view-all-link">
            View All Categories →
          </Link>
        </div>
      </section>

      <section className="featured-listings">
        <h2>Featured Listings</h2>
        <div className="services-grid">
          {featuredListings.map((item) => (
            <ServiceCard key={item.id} service={{
              id: item.id,
              name: item.name,
              description: item.description,
              image: item.image,
              icon: 'fas fa-star',
              rating: item.rating,
              reviews: Math.floor(item.rating * 50),
              price: '',
              features: [],
            }} />
          ))}
        </div>
      </section>

      <section className="recent-activity">
        <h2>Recent Reviews</h2>
        <div className="activity-list">
          {recentActivity.map((a, idx) => (
            <div key={idx} className="activity-item">
              <img src={a.avatar} alt={a.user} />
              <p>
                <strong>{a.user}</strong> reviewed{' '}
                <span className="font-medium">{a.business}</span>: "{a.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((f, idx) => (
            <details key={idx} className="faq-item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;