"use client";

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Eye,
  ArrowLeft,
  Home,
} from "lucide-react";
import image from "../assets/cozy-family-duplex.png";

// Mock property data
const properties = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: 2500000,
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    image: image,
    featured: true,
    status: "For Sale",
  },
  {
    id: 2,
    title: "Downtown Luxury Apartment",
    location: "Manhattan, NY",
    price: 1800000,
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    image: image,
    featured: false,
    status: "For Sale",
  },
  {
    id: 3,
    title: "Cozy Family Duplex",
    location: "Austin, TX",
    price: 650000,
    type: "Duplex",
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    image: image,
    featured: true,
    status: "For Sale",
  },
  {
    id: 4,
    title: "Beachfront Condo",
    location: "Miami, FL",
    price: 950000,
    type: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    image: image,
    featured: false,
    status: "For Rent",
  },
  {
    id: 5,
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 1200000,
    type: "Cabin",
    bedrooms: 3,
    bathrooms: 2,
    area: 2500,
    image: image,
    featured: true,
    status: "For Sale",
  },
  {
    id: 6,
    title: "Urban Loft Space",
    location: "Seattle, WA",
    price: 750000,
    type: "Loft",
    bedrooms: 2,
    bathrooms: 1,
    area: 1600,
    image: image,
    featured: false,
    status: "For Sale",
  },
  {
    id: 7,
    title: "Suburban Family Home",
    location: "Phoenix, AZ",
    price: 480000,
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    image: image,
    featured: false,
    status: "For Sale",
  },
  {
    id: 8,
    title: "Penthouse Suite",
    location: "Chicago, IL",
    price: 3200000,
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: 3800,
    image: image,
    featured: true,
    status: "For Sale",
  },
];

export default function PropertiesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [propertyType, setPropertyType] = useState("all");
  const [bedrooms, setBedrooms] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = properties.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "0-500k" && property.price <= 500000) ||
        (priceRange === "500k-1m" &&
          property.price > 500000 &&
          property.price <= 1000000) ||
        (priceRange === "1m-2m" &&
          property.price > 1000000 &&
          property.price <= 2000000) ||
        (priceRange === "2m+" && property.price > 2000000);

      const matchesType =
        propertyType === "all" ||
        property.type.toLowerCase() === propertyType.toLowerCase();
      const matchesBedrooms =
        bedrooms === "all" || property.bedrooms.toString() === bedrooms;
      const matchesStatus = status === "all" || property.status === status;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesType &&
        matchesBedrooms &&
        matchesStatus
      );
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "area-large":
          return b.area - a.area;
        case "area-small":
          return a.area - b.area;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, priceRange, propertyType, bedrooms, status, sortBy]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Properties
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Find your perfect home
                  </p>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <MapPin className="w-4 h-4" />
              Map View
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                placeholder="Search properties or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-48"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="area-large">Area: Largest First</option>
                <option value="area-small">Area: Smallest First</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Prices</option>
                  <option value="0-500k">Under $500K</option>
                  <option value="500k-1m">$500K - $1M</option>
                  <option value="1m-2m">$1M - $2M</option>
                  <option value="2m+">$2M+</option>
                </select>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="duplex">Duplex</option>
                  <option value="loft">Loft</option>
                  <option value="cabin">Cabin</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">Any Bedrooms</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4 Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Available Properties
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Showing {filteredProperties.length} of {properties.length}{" "}
              properties
            </p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      property.status === "For Sale"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {property.status}
                  </span>
                  {property.featured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-600 text-white">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button className="w-8 h-8 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors shadow-sm">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </div>

                <div className="text-xl font-bold text-blue-600 mb-3">
                  {formatPrice(property.price)}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span>{property.bedrooms} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-4 h-4" />
                    <span>{property.bathrooms} baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="w-4 h-4" />
                    <span>{property.area.toLocaleString()} sq ft</span>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-300 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filters to see more results.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
