"use client";

import { useState } from "react";

import { PropertyForm } from "@/components/admin/property-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const handleAddProperty = () => {
    setEditingProperty(null);
    setIsFormOpen(true);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProperty(null);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Real Estate Admin
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your property listings
            </p>
          </div>
          <Button
            onClick={handleAddProperty}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>

        {isFormOpen && (
          <PropertyForm
            property={editingProperty}
            onClose={handleCloseForm}
            onSave={() => {
              // Refresh table data
              handleCloseForm();
            }}
          />
        )}
      </div>
    </div>
  );
}
