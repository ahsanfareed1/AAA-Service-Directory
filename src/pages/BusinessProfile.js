import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BusinessProfile = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock business data
    const mockBusiness = {
      id: businessId,
      name: "Elite Plumbing Solutions",
      category: "Plumbing",
      rating: 4.8,
      reviewCount: 245,
      price: "$$$",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&h=400&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop"
      ],
      description: "Professional plumbing services with 24/7 emergency support. We specialize in residential and commercial plumbing repairs, installations, and maintenance.",
      address: "123 Main St, Downtown, CA 90210",
      phone: "(555) 123-4567",
      email: "info@eliteplumbing.com",
      website: "www.eliteplumbing.com",
      hours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 4:00 PM",
        sunday: "Closed"
      },
      isOpen: true,
      isVerified: true,
      tags: ["Emergency Service", "Licensed", "Insured", "24/7 Available"],
      services: [
        "Emergency Plumbing Repairs",
        "Pipe Installation & Repair",
        "Drain Cleaning",
        "Water Heater Services",
        "Bathroom Remodeling",
        "Kitchen Plumbing",
        "Commercial Plumbing"
      ],
      reviews: [
        {
          id: 1,
          user: "Sarah Johnson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
          rating: 5,
          date: "2024-01-15",
          text: "Excellent service! They fixed our emergency leak quickly and professionally. Highly recommend!",
          photos: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=200&h=150&fit=crop"]
        },
        {
          id: 2,
          user: "Mike Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
          rating: 4,
          date: "2024-01-10",
          text: "Good work overall. The technician was knowledgeable and completed the job efficiently.",
          photos: []
        },
        {
          id: 3,
          user: "Jennifer Davis",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
          rating: 5,
          date: "2024-01-05",
          text: "Outstanding service! They went above and beyond to solve our plumbing issues.",
          photos: []
        }
      ]
    };

    setTimeout(() => {
      setBusiness(mockBusiness);
      setLoading(false);
    }, 1000);
  }, [businessId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-300"></div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Business not found</h2>
          <button 
            onClick={() => navigate('/search')}
            className="text-red-600 hover:text-red-700"
          >
            Back to search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <img 
          src={business.image} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Business Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-16 relative z-10 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900 mr-3">{business.name}</h1>
                {business.isVerified && (
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium flex items-center">
                    <i className="fas fa-check-circle mr-1"></i>
                    Verified
                  </div>
                )}
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className={`fas fa-star ${
                        i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {business.rating} ({business.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-600 font-medium">{business.price}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{business.category}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {business.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-gray-600 mb-4">
                <p className="flex items-center mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-red-600"></i>
                  {business.address}
                </p>
                <p className="flex items-center mb-2">
                  <i className="fas fa-phone mr-2 text-red-600"></i>
                  {business.phone}
                </p>
                <p className="flex items-center">
                  <i className="fas fa-clock mr-2 text-red-600"></i>
                  <span className={business.isOpen ? 'text-green-600' : 'text-red-600'}>
                    {business.isOpen ? 'Open now' : 'Closed'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:ml-6">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                <i className="fas fa-phone mr-2"></i>
                Call Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                <i className="fas fa-heart mr-2"></i>
                Save
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                <i className="fas fa-share mr-2"></i>
                Share
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['overview', 'reviews', 'gallery', 'services'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                        activeTab === tab
                          ? 'border-red-600 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">About {business.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{business.description}</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Reviews</h3>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        Write a Review
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {business.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <img 
                              src={review.avatar} 
                              alt={review.user}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-900">{review.user}</h4>
                                <span className="text-sm text-gray-500">{review.date}</span>
                              </div>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i}
                                    className={`fas fa-star text-sm ${
                                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                  ></i>
                                ))}
                              </div>
                              <p className="text-gray-600 mb-3">{review.text}</p>
                              {review.photos.length > 0 && (
                                <div className="flex space-x-2">
                                  {review.photos.map((photo, index) => (
                                    <img 
                                      key={index}
                                      src={photo} 
                                      alt="Review"
                                      className="w-20 h-20 rounded-lg object-cover"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'gallery' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {business.gallery.map((photo, index) => (
                        <img 
                          key={index}
                          src={photo} 
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-48 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'services' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {business.services.map((service, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <i className="fas fa-check-circle text-green-500 mr-3"></i>
                          <span className="text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-red-600 w-5 mr-3"></i>
                  <span className="text-gray-700">{business.address}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-phone text-red-600 w-5 mr-3"></i>
                  <span className="text-gray-700">{business.phone}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-envelope text-red-600 w-5 mr-3"></i>
                  <span className="text-gray-700">{business.email}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-globe text-red-600 w-5 mr-3"></i>
                  <a href={`https://${business.website}`} className="text-red-600 hover:text-red-700">
                    {business.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <div className="space-y-2">
                {Object.entries(business.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize text-gray-700">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-map-marker-alt text-2xl mb-2"></i>
                  <p className="text-sm">Interactive Map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;