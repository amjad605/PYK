import React, { useState } from "react";
import { MapPin, Bed, Bath, Square, ArrowRightLeft, Check } from "lucide-react";
import { type PropertyData } from "@/types/property";
import { useNavigate } from "react-router-dom";
import formatPrice from "@/utils/formatPrice";
import { Badge } from "../ui/badge";
import { useCompare } from "@/context/CompareContext";
import placeHolder from "../../../public/placeHolder.svg"
interface PropertyCardProps {
  property: PropertyData;
  // Optional: pass a handler if you want the parent to manage the comparison state
  onCompareClick?: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onCompareClick }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCompare, isInCompare } = useCompare();
  const isAdded = isInCompare(property.id || "");

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCompare(property);
  };
  const handleClick = () => {
    navigate(`/property/${property.id}`, { state: { property } });
  };



  const getCategoryColor = (category: string) => {
    switch (category) {
      case "resale":
        return "bg-orange-100 text-orange-800";
      case "primary":
        return "bg-green-100 text-green-800";
      case "rent":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      onClick={handleClick}
      key={property.id}
      // Ensure 'group' class is here so children can use group-hover
      className="bg-white rounded-2xl mx-4 md:mx-0 shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-1/2">
        <img
          src={property.media.images[0] || placeHolder}
          loading="lazy"
          alt={property.title}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}

        {/* Listing Type Badge (Top Left) */}
        <div className="absolute top-4 left-4 z-10">
          <Badge
            className={`${getCategoryColor(
              property.listingType
            )} rounded-full px-3 py-1 text-xs font-medium shadow-sm`}
          >
            {property.listingType.charAt(0).toUpperCase() +
              property.listingType.slice(1)}
          </Badge>
        </div>

        {/* ---- Compare Button (Top Right - Visible on Hover) ---- */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleCompareClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md transition-all text-sm font-medium ${isAdded
              ? "bg-green-500 text-white"
              : "bg-white/95 text-gray-700 hover:text-blue-600"
              }`}
          >
            {isAdded ? <Check className="h-4 w-4" /> : <ArrowRightLeft className="h-4 w-4" />}
            <span>{isAdded ? "Added" : "Compare"}</span>
          </button>
        </div>
        {/* ------------------------------------------------------- */}

      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center text-gray-500 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.location.city}</span>
        </div>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {formatPrice(property.price.amount ?? 0, property.listingType)}
        </p>

        {/* Details - This section will always be at the bottom */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
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
              <span>{property.areas.builtUp} sqft</span>
            </div>
            {property.facilities && property.facilities.length > 4 && (
              <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600">
                +{property.facilities.length - 4} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;