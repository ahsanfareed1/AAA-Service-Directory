import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import services from '../data/servicesData';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  const [filters, setFilters] = useState({
    price: '',
    rating: '',
    distance: '',
    openNow: false
  });
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  useEffect(() => {
    const term = query.toLowerCase();
    const matched = services
      .filter(
        (s) =>
          s.title.toLowerCase().includes(term) ||
          s.category.toLowerCase().includes(term) ||
          s.tags.some((tag) => tag.toLowerCase().includes(term))
      )
      .map((s) => ({
        id: s.id,
        name: s.title,
        category: s.category,
        rating: s.rating,
        reviewCount: s.reviewCount,
        price: `PKR ${s.priceStart}`,
        distance: '',
        image: s.image,
        description: s.description,
        address: '',
        phone: s.phone,
        isOpen: true,
        tags: s.tags,
      }));
    setResults(matched);
    setLoading(false);
  }, [query, location]);

  const handleBusinessClick = (business) => {
    navigate(`/business/${business.id}`);
  };

  const filteredResults = results.filter(result => {
    if (filters.price && result.price !== filters.price) return false;
    if (filters.rating && result.rating < parseFloat(filters.rating)) return false;
    if (filters.openNow && !result.isOpen) return false;
    return true;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
    }
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
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
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {query ? `"${query}"` : 'All Businesses'} 
            {location && ` near ${location}`}
          </h1>
          <p className="text-gray-600">{sortedResults.length} results</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 sticky top-36">
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
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.openNow}
                      onChange={(e) => setFilters({...filters, openNow: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Open Now</span>
                  </label>
                </div>

                {/* Google Map Placeholder */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Map</h4>
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <i className="fas fa-map-marker-alt text-2xl mb-2"></i>
                      <p className="text-sm">Interactive Map</p>
                      <p className="text-xs">Showing {sortedResults.length} locations</p>
                    </div>
                  </div>
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
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {sortedResults.map((business) => (
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
                        <p className="text-sm text-gray-500 mb-2">{business.address}</p>
                        
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

            {sortedResults.length === 0 && (
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