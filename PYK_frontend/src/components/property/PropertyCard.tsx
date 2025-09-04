import React from "react";
import { Heart, MapPin, Bed, Bath, Square } from "lucide-react";
import { type Property } from "./PropertyCard.type";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div
      key={property.id}
      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition"
    >
      {/* Image with Favorite Button */}
      <div className="relative overflow-hidden">
        <img
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition">
          <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {property.price}
        </p>

        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
