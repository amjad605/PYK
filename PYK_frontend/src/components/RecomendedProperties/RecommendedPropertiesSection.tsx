import React from "react";

import cozyVilla from "../../assets/cozy-family-duplex.png";
import modernvilla from "../../assets/modern-villa-with-pool.png";
import luxuryApartment from "../../assets/luxury-downtown-apartment.png";
import PropertyCard from "../property/PropertyCard";
import { type Property } from "../property/PropertyCard.type";
function RecommendedPropertiesSection() {
  const recommendedProperties: Property[] = [
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
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Recommended Properties
            </h2>
            <p className="text-gray-600">Handpicked properties just for you</p>
          </div>
          <button
            onClick={() => (window.location.href = "/properties")}
            className="px-6 py-2 border rounded-xl hover:bg-gray-100 transition"
          >
            View All Properties
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recommendedProperties.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedPropertiesSection;
