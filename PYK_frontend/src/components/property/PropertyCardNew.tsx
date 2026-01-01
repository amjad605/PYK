"use client";

import { useState } from "react";
// Import from Next.js for routing
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Waves,
  Dumbbell,
  Trees,
  Shield,
  Users,
} from "lucide-react";

// Assuming this utility is correctly placed in the utils directory relative to component usage
import formatPrice from "@/utils/formatPrice";
import type { PropertyData } from "@/types/property";

interface PropertyCardProps {
  property: PropertyData;
}

const facilityIcons = {
  parking: Car,
  pool: Waves,
  gym: Dumbbell,
  garden: Trees,
  security: Shield,
  reception: Users,
};

export function PropertyCardNew({ property }: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  // Use Next.js router
  const navigator = useNavigate();

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
    <Card className="group overflow-hidden bg-white border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-2xl flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-gray-100">
          <img
            src={property.media.images[0] || "/placeholder.svg"}
            loading="lazy"
            alt={property.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            className={`${getCategoryColor(
              property.listingType
            )} rounded-full px-3 py-1 text-xs font-medium`}
          >
            {property.listingType.charAt(0).toUpperCase() +
              property.listingType.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-6 flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{property.location.city}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(property.price.amount ?? 0, property.listingType)}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          {property.bedrooms! > 0 && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
          )}
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.areas.builtUp}m²</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* FIX 1: Use optional chaining (?.) before calling slice. 
            If facilities is null/undefined, the expression evaluates to undefined,
            and map() will not be called. We use an empty array (?? []) 
            to ensure slice() can be safely called, avoiding potential runtime errors.
          */}
          {property.facilities?.slice(0, 4).map((facility) => {
            const IconComponent =
              facilityIcons[facility as keyof typeof facilityIcons];
            return IconComponent ? (
              <div
                key={facility}
                className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
              >
                <IconComponent className="h-3 w-3 mr-1" />
                <span className="capitalize">{facility}</span>
              </div>
            ) : null;
          })}
          {/* FIX 2: Use optional chaining (?.) to safely access the length. 
            If facilities is null/undefined, length is undefined. The condition 
            will correctly short-circuit and not render the 'more' badge.
          */}
          {property.facilities &&
            property.facilities?.length > 4 && (
              <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600">
                +{property.facilities.length - 4} more
              </div>
            )}
        </div>
      </CardContent>

      {/* Button always at bottom */}
      <div className="p-6 pt-0">
        <Button
          // Correctly navigate using the Next.js router
          onClick={() =>
            navigator(`/property/${property.id}`)
          }
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}