import React from 'react';
import { platformIcons } from '../assets/assets';
import { BadgeCheck, LineChart, MapPin, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/listing/${listing.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition duration-300">
      
      {/* Featured Banner */}
      {listing.featured && (
        <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center text-xs font-semibold py-1 tracking-wide uppercase z-10">
          Featured
        </div>
      )}

      <div className="p-5 pt-10">
        {/* Header: Platform Icon, Title, and Username */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 flex-shrink-0">
            {platformIcons[listing.platform]}
          </div>

          <div className="flex flex-col flex-1 min-w-0">
            <h2 className="font-bold text-gray-800 truncate">{listing.title}</h2>
            <p className="text-sm text-gray-500 truncate">
              @{listing.username} • <span className="capitalize">{listing.platform}</span>
            </p>
          </div>

          {listing.verified && (
            <BadgeCheck className="text-blue-500 flex-shrink-0 w-5 h-5" />
          )}
        </div>

        {/* Stats Section: Followers and Engagement */}
        <div className="flex flex-wrap items-center gap-4 my-5">
          <div className="flex items-center">
            <User className="size-5 mr-1.5 text-gray-400" />
            <span className="text-lg font-medium text-slate-800 mr-1">
              {listing.followers_count?.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">Followers</span>
          </div>

          {listing.engagement_rate && (
            <div className="flex items-center">
              <LineChart className="size-5 mr-1.5 text-gray-400" />
              <span className="text-lg font-medium text-slate-800 mr-1">
                {listing.engagement_rate}%
              </span>
              <span className="text-sm text-gray-500">Engagement</span>
            </div>
          )}
        </div>

        {/* Tags & Location */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-xs font-medium bg-pink-50 text-pink-600 px-3 py-1 rounded-full capitalize">
            {listing.niche}
          </span>

          {listing.country && (
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="size-4 mr-1 text-gray-400" />
              {listing.country}
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {listing.description}
        </p>

        <hr className="my-5 border-gray-100" />

        {/* Footer: Price and Action Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-slate-900">
              {currency}{listing.price?.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleDetailsClick}
            className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 active:scale-95 transition-all"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;