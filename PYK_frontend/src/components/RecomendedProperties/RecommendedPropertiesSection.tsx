import React from "react";

import cozyVilla from "../../assets/cozy-family-duplex.png";
import modernvilla from "../../assets/luxury-downtown-apartment.png";
import luxuryApartment from "../../assets/luxury-downtown-apartment.png";
import PropertyCard from "../notUsed/PropertyCard";
import { type PropertyData } from "../property/PropertyCard.type";

function RecommendedPropertiesSection() {
  // Supporting interfaces

  // Enums

  // Mock data
  const mockProperty: PropertyData = {
    id: "prop-12345",
    listingType: "resale",
    propertyType: "apartment",
    unitLevel: "ground",
    title: "Luxury 3-Bedroom Apartment with Sea View",
    description:
      "Stunning luxury apartment with panoramic sea views, located in the heart of the city. Features high-end finishes and premium amenities.",
    status: "available",

    areas: {
      builtUp: 180,
      land: 220,
    },
    price: {
      amount: 7500000,
      currency: "USD",
    },
    bedrooms: 3,
    bathrooms: 3,
    facilities: [
      "Swimming Pool",
      "Gym",
      "Spa",
      "Children's Play Area",
      "24/7 Security",
    ],
    features: [
      "Sea View",
      "Balcony",
      "Walk-in Closet",
      "Central AC",
      "Smart Home System",
    ],
    location: {
      district: "123 Coastal Avenue",
      city: "Dubai",
    },
    compoundId: "comp-67890",
    media: {
      images: [
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      videos: ["https://example.com/virtual-tour.mp4"],
    },
    developer: {
      id: "dev-54321",
      name: "Emaar Properties",
    },
    deliveryDate: "2024-12-01",
    owner: {
      name: "Ahmed Hassan",
    },
    finishing: "finished",
  };

  // Additional mock data for different property types
  const mockProperties: PropertyData[] = [
    mockProperty,
    mockProperty,
    mockProperty,
    mockProperty,
    mockProperty,
    mockProperty,
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
          {mockProperties.map((property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedPropertiesSection;
