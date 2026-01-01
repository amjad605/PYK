"use client";

import React, { useMemo } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import type { CityLocations } from "@/utils/locations";

interface LocationDropdownProps {
  value: string | null; // stored value: "nasercity"
  onChange: (value: string | null) => void;
  locations: CityLocations[];
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  value,
  onChange,
  locations,
}) => {
  /**
   * Resolve stored value -> UI label
   */
  const selectedLabel = useMemo(() => {
    if (!value) return null;

    for (const city of locations) {
      for (const area of city.areas) {
        if (area.value === value) {
          return area.label;
        }
      }
    }
    return null;
  }, [value, locations]);

  return (
    <div className="flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full shadow-none justify-between rounded-xl border-gray-300 bg-gray-50 py-4 h-auto"
          >
            <span className={value ? "text-gray-900" : "text-gray-400"}>
              {selectedLabel ?? "Select location"}
            </span>

            {value ? (
              <X
                className="h-4 w-4 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
              />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-50 text-gray-400" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-72 p-0 rounded-xl">
          <Command>
            <CommandInput placeholder="Search area..." className="h-11" />
            <CommandList className="max-h-64">
              <CommandEmpty>No results found.</CommandEmpty>

              {locations.map((city) => (
                <CommandGroup key={city.city?.value || ""} heading={city.city?.label || ""} >
                  {city.areas.map((area) => (
                    <CommandItem
                      key={area.value}
                      value={area.label} // 🔥 search by label
                      onSelect={() => onChange(area.value)} // 🔥 store slug
                      className="py-2"
                    >
                      {area.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
