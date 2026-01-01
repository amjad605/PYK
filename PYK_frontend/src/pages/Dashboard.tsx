"use client";

import { useCallback, useState, useEffect } from "react";
import { PropertyForm } from "@/components/admin/property-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PropertySection } from "@/components/admin/property-section";
import type { PropertyData } from "@/types/property";
import { useProperty } from "../hooks/useProperty";
import { Pagination } from "@/utils/Pagination";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState<{ page: number; limit: number }>({
    page: 1,
    limit: 9,
  });

  const {
    data: properties,
    loading: isLoading,
    totalCount,
    error,

  } = useProperty(filters);

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const totalPages = Math.ceil(totalCount / filters.limit);

  const handleEditProperty = (property: PropertyData) => {
    setEditingProperty(property);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleDeleteProperty = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (confirmDelete) {
      try {
        await axios.delete(`/property/${id}`);
        toast.success("Property deleted successfully");
        // Reset to first page after deletion
        setFilters((prev) => ({ ...prev, page: 1 }));
        // Optionally refetch data

      } catch (error) {
        toast.error("Failed to delete property");
      }
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
    setIsEditing(false);
  };

  const handleFormSubmitSuccess = () => {
    handleCloseForm();
    // Refetch properties to get updated list

    toast.success(
      isEditing
        ? "Property updated successfully"
        : "Property added successfully"
    );
  };

  // Optional: Auto-close form on successful edit/add
  useEffect(() => {
    if (isFormOpen) {
      // Any side effects when form opens
    }
  }, [isFormOpen]);



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

        {/* Property Form */}
        <PropertyForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          property={editingProperty} // Pass the property to edit
          isEditing={isEditing} // Tell form if we're editing
          onSubmitSuccess={handleFormSubmitSuccess} // Handle success callback
        />

        {/* Property List Section */}
        <PropertySection
          properties={properties}
          isLoading={isLoading}
          isEmpty={!properties?.length && !isLoading}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />

        {/* Error Display */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Pagination Controls */}
      {properties?.length > 0 && totalPages > 1 && (
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