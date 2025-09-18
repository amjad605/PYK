"use client";

import type { FC } from "react";
import { ChevronDown, ChevronUp, Home, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type PropertyType =
  | "Apartment"
  | "House"
  | "Villa"
  | "Condo"
  | "Townhouse"
  | "Twinhouse"
  | "Duplex"
  | "Penthouse"
  | "Studio"
  | "";

interface PropertyTypeDropdownProps {
  propertyType: PropertyType;
  setPropertyType: (type: PropertyType) => void;
  clearFilter: () => void;
}

export const PropertyTypeDropdown: FC<PropertyTypeDropdownProps> = ({
  propertyType,
  setPropertyType,
  clearFilter,
}) => {
  const propertyTypes: PropertyType[] = [
    "Apartment",
    "Villa",
    "Townhouse",
    "Twinhouse",
    "Duplex",
    "Penthouse",
    "Studio",
  ];

  return (
    <div className="flex flex-col">
      <div className="relative w-full">
        <Select
          value={propertyType || ""}
          onValueChange={(value) => setPropertyType(value as PropertyType)}
        >
          <SelectTrigger className="w-full justify-between rounded-lg border-gray-200 bg-gray-50 py-6.5 h-auto data-[placeholder]:font-medium data-[placeholder]:text-gray-400">
            <SelectValue placeholder="Property type" />
            {propertyType ? (
              <X className="cursor-pointer  h-4 w-4 opacity-50" />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-50" />
            )}
          </SelectTrigger>

          <SelectContent className="w-70 p-3 px-12 space-y-1 rounded-xl">
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type} className="rounded-md py-2">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
