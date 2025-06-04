import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './CustomerProfile.css';

const CustomerProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const serviceHistory = [
    {
      id: 1,
      service: "Plumbing Repair",
      provider: "John's Professional Plumbing",
      date: "2024-02-15",
      status: "completed"
    },
    {
      id: 2,
      service: "House Cleaning",
      provider: "Sparkle & Shine Cleaners",
      date: "2024-02-10",
      status: "pending"
    }
  ];

  const savedProviders = [
    {
      id: 1,
      name: "Elite Plumbing Solutions",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Quick Fix Solutions",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&auto=format&fit=crop&q=60"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Service Completed",
      message: "Your plumbing service has been completed",
      time: "2 hours ago",
      icon: "fas fa-check-circle"
    },
    {
      id: 2,
      title: "New Provider Available",
      message: "A new cleaning service provider is available in your area",
      time: "1 day ago",
      icon: "fas fa-bell"
    }
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img 
          src={user.photoURL || "https://via.placeholder.com/120"} 
          alt="Profile" 
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1 className="profile-name">{user.displayName || "User"}</h1>
          <p className="profile-email">{user.email}</p>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Services Used</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.8</div>
              <div className="stat-label">Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">5</div>
              <div className="stat-label">Saved Providers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-section">
          <h2 className="section-title">Service History</h2>
          <div className="service-history">
            {serviceHistory.map(service => (
              <div key={service.id} className="service-item">
                <div className="service-details">
                  <h4>{service.service}</h4>
                  <p>{service.provider} - {service.date}</p>
                </div>
                <span className={`service-status status-${service.status}`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Saved Providers</h2>
          <div className="saved-providers">
            {savedProviders.map(provider => (
              <div key={provider.id} className="provider-card">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="provider-avatar"
                />
                <h4 className="provider-name">{provider.name}</h4>
                <div className="provider-rating">
                  <i className="fas fa-star"></i> {provider.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Notifications</h2>
          <div className="notifications">
            {notifications.map(notification => (
              <div key={notification.id} className="notification-item">
                <div className="notification-icon">
                  <i className={notification.icon}></i>
                </div>
                <div className="notification-content">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;