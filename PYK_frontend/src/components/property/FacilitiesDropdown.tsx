"use client";

import type { FC } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Settings } from "lucide-react";

interface FacilitiesDropdownProps {
  facilities: string[];
  setFacilities: (facilities: string[]) => void;
}

const allFacilities = ["Parking", "Pool", "Gym", "Elevator", "Garden"];

export const FacilitiesDropdown: FC<FacilitiesDropdownProps> = ({
  facilities,
  setFacilities,
}) => {
  const [open, setOpen] = useState(false);

  const toggleFacility = (facility: string) => {
    if (facilities.includes(facility)) {
      setFacilities(facilities.filter((f) => f !== facility));
    } else {
      setFacilities([...facilities, facility]);
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
        <Settings className="h-3.5 w-3.5 mr-1" />
        FACILITIES
      </p>

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onPointerDown={(e) => {
              // يمنع الفتح أثناء الـ scroll على الموبايل
              if (e.pointerType === "touch" && e.cancelable) {
                e.preventDefault();
              }
            }}
            onClick={() => setOpen((prev) => !prev)}
            variant="outline"
            className="w-full justify-between rounded-lg border-gray-300 bg-gray-50 py-5 h-auto"
          >
            <span
              className={facilities.length ? "text-gray-900" : "text-gray-400"}
            >
              {facilities.length > 0
                ? facilities.join(", ")
                : "Select facilities"}
            </span>

            <ChevronDown className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 p-3 space-y-1 rounded-xl">
          {allFacilities.map((facility) => (
            <DropdownMenuCheckboxItem
              key={facility}
              checked={facilities.includes(facility)}
              onCheckedChange={() => toggleFacility(facility)}
              className="rounded-md py-2 w-full"
            >
              {facility}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
