"use client";

import { useCallback, useState } from "react";
import { PropertyForm } from "@/components/admin/property-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertySection } from "@/components/admin/property-section";
import type { PropertyData } from "@/components/property/PropertyCard.type";
import { useProperty } from "../hooks/useProperty";
import { Pagination } from "@/utils/Pagination"

export function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyData | null>(null);
  const [filters, setFilters] = useState<{ page: number; pageSize: number }>({
    page: 1,
    pageSize: 10,
  });

  const { data: properties, loading: isLoading, totalCount, error } = useProperty(filters);
  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const totalPages = Math.ceil(totalCount / filters.pageSize);

  const handleEditProperty = (property: PropertyData) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleDeleteProperty = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (confirmDelete) {
      alert(`Deleted property ${id} (API call should happen here)`);
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto py-0">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Real Estate Admin</h1>
            <p className="text-muted-foreground mt-2">Manage your property listings</p>
          </div>
          <Button onClick={handleAddProperty} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>


        <PropertyForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
        />


        <PropertySection
          properties={properties}
          isLoading={isLoading}
          isEmpty={!properties.length && !isLoading}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />

        {/* Pagination Controls */}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
      {properties.length > 0 && (
        <div className="flex justify-center pb-10 bg-white">
          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>

  );
}
