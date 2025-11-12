"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import type { Control, UseFormWatch, UseFormSetValue } from "react-hook-form";
import type { PropertyFormValues } from "./property-form";

interface FacilitiesCardProps {
  control: Control<PropertyFormValues>;
  watch: UseFormWatch<PropertyFormValues>;
  setValue: UseFormSetValue<PropertyFormValues>;
}

export default function FacilitiesCard({
  watch,
  setValue,
}: FacilitiesCardProps) {
  const [facilityInput, setFacilityInput] = useState("");

  const addFacility = () => {
    if (!facilityInput.trim()) return;
    const currentFacilities = watch("facilities") || [];
    setValue("facilities", [...currentFacilities, facilityInput.trim()]);
    setFacilityInput("");
  };

  const removeFacility = (index: number) => {
    const currentFacilities = watch("facilities") || [];
    const updatedFacilities = currentFacilities.filter((_, i) => i !== index);
    setValue("facilities", updatedFacilities);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Facilities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="mb-2 block">Facilities</Label>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Add a facility (e.g. Parking, Gym)"
              value={facilityInput}
              onChange={(e) => setFacilityInput(e.target.value)}
            />
            <Button type="button" onClick={addFacility}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {watch("facilities")?.map((facility, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {facility}
                <button
                  type="button"
                  onClick={() => removeFacility(index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
