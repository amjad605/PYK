import React from "react";
import { MapPin, Bed, Bath, Square } from "lucide-react";

const PropertyCardSkeletonOld: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl mx-4 md:mx-0 shadow-md border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative overflow-hidden">
        <div className="w-full h-58  bg-gray-200"></div>
        <div className="absolute top-4 left-4">
          <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
        </div>
      </div>

      {/* Card Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>

        {/* Location skeleton */}
        <div className="flex items-center mb-4">
          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        {/* Price skeleton */}
        <div className="h-8 bg-gray-300 rounded mb-5 w-1/2"></div>

        {/* Details skeleton */}
        <div className="flex items-center space-x-3 justify-between text-sm border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-gray-400" />
            <div className="h-4 bg-gray-300 rounded w-10"></div>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-400" />
            <div className="h-4 bg-gray-300 rounded w-10"></div>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-gray-400" />
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="h-6 bg-gray-300 rounded-xl w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeletonOld;
