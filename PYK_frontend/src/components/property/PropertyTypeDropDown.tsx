"use client";

import type { FC } from "react";
import { Home, X } from "lucide-react";
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
    "House",
    "Villa",
    "Condo",
    "Townhouse",
  ];

  return (
    <div className="flex flex-col">
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
        <Home className="h-3.5 w-3.5 mr-1" />
        PROPERTY TYPE
      </p>

      <div className="relative w-full">
        <Select
          value={propertyType || ""}
          onValueChange={(value) => setPropertyType(value as PropertyType)}
        >
          <SelectTrigger className="w-full justify-between rounded-lg border-gray-300 bg-gray-50 py-7.5 h-auto data-[placeholder]:font-medium data-[placeholder]:text-gray-400">
            <SelectValue placeholder="Any type" />
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
