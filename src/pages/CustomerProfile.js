import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import './CustomerProfile.css';

const CustomerProfile = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const serviceHistory = [
    {
      id: 1,
      service: "Plumbing Repair",
      provider: "John's Professional Plumbing",
      date: "2024-02-15",
      status: "completed",
      rating: 5,
      review: "Excellent service! Fixed the leak quickly and professionally."
    },
    {
      id: 2,
      service: "House Cleaning",
      provider: "Sparkle & Shine Cleaners",
      date: "2024-02-10",
      status: "completed",
      rating: 4,
      review: "Good cleaning service, very thorough."
    },
    {
      id: 3,
      service: "Electrical Work",
      provider: "Quick Fix Electricians",
      date: "2024-02-05",
      status: "pending",
      rating: null,
      review: null
    }
  ];

  const savedProviders = [
    {
      id: 1,
      name: "Elite Plumbing Solutions",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=100&h=100&fit=crop",
      category: "Plumbing"
    },
    {
      id: 2,
      name: "Gourmet Catering Co.",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=100&h=100&fit=crop",
      category: "Catering"
    },
    {
      id: 3,
      name: "Master Painters Pro",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=100&h=100&fit=crop",
      category: "Painting"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Service Completed",
      message: "Your plumbing service has been completed. Please rate your experience.",
      time: "2 hours ago",
      icon: "fas fa-check-circle",
      type: "success"
    },
    {
      id: 2,
      title: "Booking Confirmed",
      message: "Your electrical service appointment is confirmed for tomorrow at 2 PM.",
      time: "1 day ago",
      icon: "fas fa-calendar-check",
      type: "info"
    },
    {
      id: 3,
      title: "New Provider Available",
      message: "A new highly-rated cleaning service is now available in your area.",
      time: "3 days ago",
      icon: "fas fa-bell",
      type: "info"
    }
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img 
            src={user.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"} 
            alt="Profile" 
            className="profile-avatar"
          />
          <button className="edit-photo-btn">
            <i className="fas fa-camera"></i>
          </button>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user.displayName || "User"}</h1>
          <p className="profile-email">{user.email}</p>
          <div className="profile-location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{user.address || "Location not set"}</span>
          </div>
          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-value">12</div>
              <div className="stat-label">Services Used</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4.8</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{savedProviders.length}</div>
              <div className="stat-label">Saved Providers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        {/* Service History */}
        <div className="profile-section">
          <h2 className="section-title">
            <i className="fas fa-history"></i>
            Service History
          </h2>
          <div className="service-history">
            {serviceHistory.map(service => (
              <div key={service.id} className="service-item">
                <div className="service-details">
                  <h4>{service.service}</h4>
                  <p className="provider-name">{service.provider}</p>
                  <p className="service-date">{new Date(service.date).toLocaleDateString()}</p>
                  {service.rating && (
                    <div className="service-rating">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas fa-star ${i < service.rating ? 'filled' : 'empty'}`}
                        ></i>
                      ))}
                    </div>
                  )}
                  {service.review && (
                    <p className="service-review">"{service.review}"</p>
                  )}
                </div>
                <div className="service-actions">
                  <span className={`service-status status-${service.status}`}>
                    {service.status}
                  </span>
                  {service.status === 'completed' && !service.rating && (
                    <button className="rate-btn">Rate Service</button>
                  )}
                  {service.status === 'completed' && (
                    <button className="book-again-btn">Book Again</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Providers */}
        <div className="profile-section">
          <h2 className="section-title">
            <i className="fas fa-heart"></i>
            Saved Providers
          </h2>
          <div className="saved-providers">
            {savedProviders.map(provider => (
              <div key={provider.id} className="provider-card">
                <img 
                  src={provider.image} 
                  alt={provider.name} 
                  className="provider-avatar"
                />
                <div className="provider-info">
                  <h4 className="provider-name">{provider.name}</h4>
                  <p className="provider-category">{provider.category}</p>
                  <div className="provider-rating">
                    <i className="fas fa-star"></i> 
                    <span>{provider.rating}</span>
                  </div>
                </div>
                <div className="provider-actions">
                  <button className="contact-provider-btn">Contact</button>
                  <button className="remove-saved-btn">
                    <i className="fas fa-heart-broken"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="profile-section">
          <h2 className="section-title">
            <i className="fas fa-bell"></i>
            Notifications
          </h2>
          <div className="notifications">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification-item ${notification.type}`}>
                <div className="notification-icon">
                  <i className={notification.icon}></i>
                </div>
                <div className="notification-content">
                  <h4 className="notification-title">{notification.title}</h4>
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <button className="notification-close">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account Settings */}
        <div className="profile-section">
          <h2 className="section-title">
            <i className="fas fa-cog"></i>
            Account Settings
          </h2>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Notifications</h4>
                <p>Receive updates about your bookings and new services</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>SMS Notifications</h4>
                <p>Get text messages for urgent updates</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Location Services</h4>
                <p>Allow us to show nearby service providers</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </div>
          </div>
          <div className="account-actions">
            <button className="edit-profile-btn">Edit Profile</button>
            <button className="change-password-btn">Change Password</button>
            <button className="delete-account-btn">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;