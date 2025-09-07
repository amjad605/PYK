"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { DollarSign } from "lucide-react";

interface FilterState {
  location: string;
  propertyType: "apartment" | "house" | "villa" | "condo" | "townhouse" | "";
  priceRange?: [number, number] | null;
  rooms: string;
  category: "rent" | "resale" | "primary" | "";
}

interface PropertyFilterCardProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export const PropertyFilterCard: React.FC<PropertyFilterCardProps> = ({
  onFilterChange,
  className = "",
}) => {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    propertyType: "",
    priceRange: [0, 100000000],
    rooms: "",
    category: "",
  });

  const handlePriceChange = (range: [number, number]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: range,
    }));
    // ✅ هنا تقدر تبعت API call بالـ range
    console.log("Selected price range:", range);
  };
  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      const newFilters = { ...filters, [key]: value } as FilterState;
      setFilters(newFilters);
      onFilterChange(newFilters);
    },
    [filters, onFilterChange]
  );

  const handleSearch = useCallback(() => {
    console.log("[v0] Searching with filters:", filters);
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleReset = useCallback(() => {
    const resetFilters: FilterState = {
      location: "",
      propertyType: "",
      priceRange: null,
      rooms: "",
      category: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  }, [onFilterChange]);

  return (
    <div
      className={`bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
              Find Your Dream Home
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Discover properties that match your lifestyle
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {/* Location */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Location
          </label>
          <input
            type="text"
            placeholder="City, neighborhood..."
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
          />
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFilterChange("propertyType", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="condo">Condo</option>
            <option value="townhouse">Townhouse</option>
          </select>
        </div>

        {/* Price Range  
        
         <div className="space-y-3">
         

          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Any Price</option>
            <option value="0-100000">$0 - $100,000</option>
            <option value="100000-300000">$100,000 - $300,000</option>
            <option value="300000-500000">$300,000 - $500,000</option>
            <option value="500000-1000000">$500,000 - $1,000,000</option>
            <option value="1000000+">$1,000,000+</option>
          </select>
        </div>
        */}
        <div className="space-y-3">
          <div className="flex  gap-2">
            <DollarSign className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-gray-800">Price Range</h3>
          </div>
          <PriceRangeDropdown
            min={0}
            max={50000000}
            value={filters.priceRange}
            onChange={handlePriceChange}
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
              />
            </svg>
            Rooms & Features
          </label>
          <select
            value={filters.rooms}
            onChange={(e) => handleFilterChange("rooms", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Any Configuration</option>
            <option value="1bed-1bath">1 Bed, 1 Bath</option>
            <option value="2bed-1bath">2 Bed, 1 Bath</option>
            <option value="2bed-2bath">2 Bed, 2 Bath</option>
            <option value="3bed-2bath">3 Bed, 2 Bath</option>
            <option value="3bed-3bath">3 Bed, 3 Bath</option>
            <option value="4bed-3bath">4 Bed, 3 Bath</option>
            <option value="4bed-4bath">4 Bed, 4 Bath</option>
            <option value="modern-kitchen">Modern Kitchen</option>
            <option value="updated-kitchen">Updated Kitchen</option>
            <option value="luxury-features">Luxury Features</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Categories</option>
            <option value="rent">For Rent</option>
            <option value="resale">For Resale</option>
            <option value="primary">Primary Properties</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search Properties
        </button>
      </div>
    </div>
  );
};
