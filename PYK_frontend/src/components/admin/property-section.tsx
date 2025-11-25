'use client';

import { useState } from 'react';
import { PropertyCard } from './property-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import type { PropertyData } from "@/components/property/PropertyCard.type";

interface PropertySectionProps {
  properties: PropertyData[];
  isLoading?: boolean;
  isEmpty?: boolean;
  onEdit: (property: PropertyData) => void;
  onDelete: (id: string) => void;
}

export function PropertySection({
  properties,
  isLoading = false,
  isEmpty = false,
  onEdit,
  onDelete,
}: PropertySectionProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    // Optional: Add confirmation dialog here
    setDeletingId(id);
    onDelete(id);
    // Clear after animation
    setTimeout(() => setDeletingId(null), 300);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-60" />
            {/* Content Skeleton */}
            <div className="p-4 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <div className="grid grid-cols-3 gap-3 py-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
              <Skeleton className="h-10" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <Card className="col-span-full">
        <div className="flex flex-col items-center justify-center py-24 px-6">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-5xl">🏠</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2 text-center">No Properties Found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Start by adding your first property. Click the "Add Property" button to get started.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className={`transition-opacity duration-300 ${deletingId === property.id ? 'opacity-50' : 'opacity-100'
            }`}
        >
          <PropertyCard
            property={property}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}
