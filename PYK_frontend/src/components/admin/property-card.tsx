'use client';

import { Edit2, Trash2, MapPin, Bed, Bath, Ruler as Ruler2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { PropertyData, Status } from '@/types/property';

interface PropertyCardProps {
  property: PropertyData;
  onEdit: (property: PropertyData) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<Status, string> = {
  available: 'bg-green-100 text-green-800 border-green-300',
  sold: 'bg-blue-100 text-blue-800 border-blue-300',
  rented: 'bg-purple-100 text-purple-800 border-purple-300',
  reserved: 'bg-gray-100 text-gray-800 border-gray-300',
  pending: 'bg-red-100 text-red-800 border-red-300',


};

const getStatusLabel = (status: Status): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const getPropertyTypeIcon = (type: string): string => {
  const typeMap: Record<string, string> = {
    apartment: '🏢',
    villa: '🏡',
    townhouse: '🏘️',
    land: '🌍',
    commercial: '🏬',
    penthouse: '🏗️',
  };
  return typeMap[type] || '🏠';
};

const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

export function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
  const mainImage = property.media.images[0] || '/diverse-property-showcase.png';
  const listingLabel = property.listingType
  const displayPrice =
    property.listingType === 'rent' && property.rentDetails
      ? `${formatPrice(property.rentDetails.deposit ?? 0, property.price.currency)}/${property.rentDetails.leaseTerm === 'monthly' ? 'mo' : 'yr'}`
      : formatPrice(property.price.amount ?? 0, property.price.currency);

  return (
    <Card className="overflow-hidden max-h-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full bg-card">
      {/* Image Container */}
      <div className="relative w-full h-60 bg-muted overflow-hidden group">
        <img
          src={mainImage || "/placeholder.svg"}
          alt={property.title}

          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className={`${statusColors[property.status]} font-semibold text-xs px-2 py-1`}
          >
            {getStatusLabel(property.status)}
          </Badge>
        </div>

        {/* Listing Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-primary-foreground font-semibold text-xs px-2 py-1">
            {listingLabel}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title and Property Type */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-lg text-foreground line-clamp-2 flex-1 text-pretty">{property.title}</h3>
            <span className="text-2xl flex-shrink-0">{getPropertyTypeIcon(property.propertyType)}</span>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {property.propertyType.replace(/([A-Z])/g, ' $1').trim()}
            {property.unitLevel && ` • ${property.unitLevel}`}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="line-clamp-1">{`${property.location.district}, ${property.location.city}`}</span>
        </div>

        {/* Price */}
        <div className="mb-4 pt-2 border-t border-border">
          <p className="text-2xl font-bold text-foreground">{displayPrice}</p>
          {property.price.amount && (
            <p className="text-xs text-muted-foreground">
              {formatPrice(property.price.amount, property.price.currency)}/sqm
            </p>
          )}
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-border">
          {property.bedrooms !== undefined && (
            <div className="flex flex-col items-center">
              <Bed className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="font-semibold text-sm">{property.bedrooms}</span>
              <span className="text-xs text-muted-foreground">Beds</span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex flex-col items-center">
              <Bath className="w-5 h-5 text-muted-foreground mb-1" />
              <span className="font-semibold text-sm">{property.bathrooms}</span>
              <span className="text-xs text-muted-foreground">Baths</span>
            </div>
          )}
          <div className="flex flex-col items-center">
            <Ruler2 className="w-5 h-5 text-muted-foreground mb-1" />
            <span className="font-semibold text-sm">{property.areas.builtUp.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">sqm</span>
          </div>
        </div>

        {/* Features/Facilities */}
        {((property.features?.length ?? 0) > 0 || (property.facilities?.length ?? 0) > 0) && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {[...(property.features ?? []), ...(property.facilities ?? [])].slice(0, 3).map((item, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
              {(property.features?.length ?? 0) + (property.facilities?.length ?? 0) > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(property.features?.length ?? 0) + (property.facilities?.length ?? 0) - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Additional Info */}
        {(property.developer || property.finishing) && (
          <div className="mb-4 space-y-1 text-xs text-muted-foreground">
            {property.developer && <p>Developer: {property.developer.name}</p>}
            {property.finishing && <p>Finishing: {property.finishing}</p>}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onEdit(property)}
          >
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onDelete(property.id!)}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
