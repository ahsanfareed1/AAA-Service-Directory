import React from 'react';
import './Home.css';
import ServicesSection from '../components/ServicesSection';

const categories = [
  { icon: 'utensils', label: 'Restaurants' },
  { icon: 'tools', label: 'Plumbers' },
  { icon: 'bolt', label: 'Electricians' },
  { icon: 'spa', label: 'Beauty Salons' },
  { icon: 'paw', label: 'Dog Groomers' },
  { icon: 'car', label: 'Auto Mechanics' },
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

const Home = () => {
  return (
    <div className="home-page">
      <section
        className="hero-banner text-white text-center"
        style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?city)' }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Find Trusted Local Services Near You</h1>
          <button className="cta-button">Explore Now</button>
        </div>
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
      </section>

      <ServicesSection />

      <section className="recent-activity">
        <h2>Recent Activity</h2>
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
    </div>
  );
};

export default Home;