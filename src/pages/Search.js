import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    price: '',
    rating: '',
    distance: ''
  });
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    // Simulate search results
    const mockResults = [
      {
        id: 1,
        name: "Elite Plumbing Solutions",
        category: "Plumbing",
        rating: 4.8,
        reviewCount: 245,
        price: "$$",
        distance: "0.5 mi",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
        description: "Professional plumbing services with 24/7 emergency support",
        address: "123 Main St, Downtown",
        phone: "(555) 123-4567",
        isOpen: true,
        tags: ["Emergency Service", "Licensed", "Insured"]
      },
      {
        id: 2,
        name: "Quick Fix Electricians",
        category: "Electrical",
        rating: 4.6,
        reviewCount: 189,
        price: "$$$",
        distance: "1.2 mi",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
        description: "Expert electrical repairs and installations",
        address: "456 Oak Ave, Midtown",
        phone: "(555) 987-6543",
        isOpen: false,
        tags: ["Same Day Service", "Free Estimates"]
      },
      {
        id: 3,
        name: "Gourmet Catering Co.",
        category: "Catering",
        rating: 4.9,
        reviewCount: 312,
        price: "$$$$",
        distance: "2.1 mi",
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=300&h=200&fit=crop",
        description: "Premium catering for all occasions",
        address: "789 Pine St, Uptown",
        phone: "(555) 456-7890",
        isOpen: true,
        tags: ["Wedding Specialist", "Organic Options"]
      }
    ];

    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  }, [query, location]);

  const handleBusinessClick = (business) => {
    navigate(`/business/${business.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex space-x-4">
                    <div className="w-24 h-24 bg-gray-300 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {query ? `"${query}"` : 'All Businesses'} 
            {location && ` near ${location}`}
          </h1>
          <p className="text-gray-600">{results.length} results</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <select 
                    value={filters.price}
                    onChange={(e) => setFilters({...filters, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Any Price</option>
                    <option value="$">$ - Inexpensive</option>
                    <option value="$$">$$ - Moderate</option>
                    <option value="$$$">$$$ - Expensive</option>
                    <option value="$$$$">$$$$ - Very Expensive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select 
                    value={filters.rating}
                    onChange={(e) => setFilters({...filters, rating: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Any Rating</option>
                    <option value="4">4+ stars</option>
                    <option value="3">3+ stars</option>
                    <option value="2">2+ stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance
                  </label>
                  <select 
                    value={filters.distance}
                    onChange={(e) => setFilters({...filters, distance: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Any Distance</option>
                    <option value="1">Within 1 mile</option>
                    <option value="5">Within 5 miles</option>
                    <option value="10">Within 10 miles</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Distance</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {results.map((business) => (
                <div 
                  key={business.id}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleBusinessClick(business)}
                >
                  <div className="p-6">
                    <div className="flex space-x-4">
                      <img 
                        src={business.image}
                        alt={business.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-red-600">
                            {business.name}
                          </h3>
                          <span className="text-gray-600 font-medium">{business.price}</span>
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i}
                                className={`fas fa-star text-sm ${
                                  i < Math.floor(business.rating) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              ></i>
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600">
                            {business.rating} ({business.reviewCount} reviews)
                          </span>
                          <span className="ml-4 text-sm text-gray-600">
                            {business.distance}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{business.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {business.tags.map((tag, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <span className={`font-medium ${business.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                              {business.isOpen ? 'Open now' : 'Closed'}
                            </span>
                            <span className="text-gray-600">{business.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {results.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;