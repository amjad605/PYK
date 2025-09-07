import Nav from "../components/common/Nav";

import modernvilla from "../assets/modern-villa-with-pool.png";

import PropertyCard from "../components/property/PropertyCard";

import bg2 from "../assets/IMG_4024.jpg";
import { useState } from "react";

import FiltersCard from "@/components/property/FiltersCard";
interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  imageUrl: string;
  category: "rent" | "resale" | "primary";
}

interface FilterState {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
  bathrooms: string;
  category: string;
}

export default function SellPage() {
  const properties: Property[] = [
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200",
      imageUrl: modernvilla,
      category: "resale",
    },
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200",
      imageUrl: modernvilla,
      category: "resale",
    },
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200",
      imageUrl: modernvilla,
      category: "resale",
    },
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200",
      imageUrl: modernvilla,
      category: "resale",
    },
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200",
      imageUrl: modernvilla,
      category: "resale",
    },
    {
      id: 1,
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
      price: "$2,850,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200",
      imageUrl: modernvilla,
      category: "resale",
    },
  ];
  const [filters, setFilters] = useState<Record<string, unknown>>({});
  const [filteredProperties, setFilteredProperties] = useState<
    Property[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = async (filters: FilterState) => {
    setIsLoading(true);
    console.log("[v0] Filter changed:", filters);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: Replace with actual backend API call
    // const response = await fetch('/api/properties', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(filters)
    // })
    // const data = await response.json()
    // setFilteredProperties(data.properties)

    // For now, filter locally (remove this when backend is ready)
    let filtered = properties;

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.location) {
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(
        (p) => p.bedrooms >= Number.parseInt(filters.bedrooms)
      );
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(
        (p) => p.bathrooms >= Number.parseInt(filters.bathrooms)
      );
    }

    setFilteredProperties(filtered);
    setIsLoading(false);
  };
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div
        className="relative  bg-cover bg-center"
        style={{
          backgroundImage: `url("${bg2}")`,
        }}
      >
        <Nav />

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 top-30 ">
          <FiltersCard listingType="rent" />
        </div>
      </div>

      <section className="mt-40 flex flex-col items-center justify-center mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Available Properties
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Showing 1-10 of 50 properties
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
