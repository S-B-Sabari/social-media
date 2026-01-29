import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, FilterIcon } from 'lucide-react';

// Components
import ListingCard from '../components/ListingCard';
import FilterSidebar from '../components/FilterSidebar';

const Marketplace = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  // State
  const [showFilterPhone, setShowFilterPhone] = useState(false);
  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monetized: false,
  });

  // Data from Redux
  const { listings } = useSelector((state) => state.listing);

  // Filter Logic
  const filteredListings = listings.filter((listing) => {
    if (filters.platform && filters.platform.length > 0) {
      if (!filters.platform.includes(listing.platform)) return false;
    }
    if (filters.maxPrice) {
      if (listing.price > filters.maxPrice) return false;
    }
    if (filters.minFollowers) {
      if (listing.followers_count < filters.minFollowers) return false;
    }
    if (filters.niche && filters.niche.length > 0) {
      if (!filters.niche.includes(listing.niche)) return false;
    }
    if (filters.verified && listing.verified !== filters.verified) return false;
    if (filters.monetized && listing.monetized !== filters.monetized) return false;

    if (search) {
      const trimmed = search.trim().toLowerCase();
      const matchesSearch =
        listing.title.toLowerCase().includes(trimmed) ||
        listing.username.toLowerCase().includes(trimmed) ||
        listing.description.toLowerCase().includes(trimmed) ||
        listing.platform.toLowerCase().includes(trimmed) ||
        listing.niche.toLowerCase().includes(trimmed);

      if (!matchesSearch) return false;
    }
    return true;
  });

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 min-h-screen">
      
      {/* MOBILE & DESKTOP HEADER: Left Corner Back, Right Corner Filter */}
      <div className="flex items-center justify-between text-slate-500 sticky top-0 bg-white/80
       backdrop-blur-md z-40 sm:static sm:bg-transparent sm:backdrop-blur-none">
        
        {/* Left Side: Back to Home */}
        <button
          onClick={() => {
            navigate('/');
            window.scrollTo(0, 0);
          }}
          className="flex items-center gap-2 py-5 hover:text-indigo-600 transition-colors font-medium"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Back to Home</span>
        </button>

        {/* Right Side: Filter Button (visible on mobile only) */}
        <button
          onClick={() => setShowFilterPhone(true)}
          className="flex sm:hidden items-center gap-2 py-5 text-indigo-600 font-semibold"
        >
          <FilterIcon className="size-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile Backdrop */}
      {showFilterPhone && (
        <div
          onClick={() => setShowFilterPhone(false)}
          className="fixed inset-0 bg-black/40 z-[90] sm:hidden"
        />
      )}

      {/* Main Layout Content */}
      <div className="relative flex items-start justify-between gap-8 pb-12">
        
        {/* Sidebar Component */}
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          showFilterPhone={showFilterPhone}
          setShowFilterPhone={setShowFilterPhone}
        />

        {/* Listings Grid */}
        <div className="flex-1">
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredListings
                .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
                .map((listing, index) => (
                  <ListingCard key={listing.id || index} listing={listing} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
              <p className="text-gray-500 text-lg font-medium">No accounts found</p>
              <button 
                onClick={() => setFilters({ platform: null, maxPrice: 100000, minFollowers: 0, niche: null, verified: false, monetized: false })}
                className="mt-2 text-indigo-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;