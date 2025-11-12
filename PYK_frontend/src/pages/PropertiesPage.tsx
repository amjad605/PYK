"use client";

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, ArrowLeft, Home } from "lucide-react";
import image from "../assets/cozy-family-duplex.png";
import FiltersCard from "@/components/property/FiltersCard";
import PropertyCard from "@/components/notUsed/PropertyCard";
import type { Property } from "@/components/property/PropertyCard.type";

// Mock property data
const properties: Property[] = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 2,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 3,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 4,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 5,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 6,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 7,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 8,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
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
    {
      /*
       */
    }
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
        <FiltersCard />

        {/* Results Header */}
        <div className="flex items-center justify-between my-10">
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
            <PropertyCard key={property.id} property={property} />
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
