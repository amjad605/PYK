"use client";

import { MapPin, ChevronDown, X } from "lucide-react";
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

interface LocationDropdownProps {
  location: string | null;
  setLocation: (loc: string | null) => void;
  egyptLocations: Record<string, string[]>;
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  location,
  setLocation,
  egyptLocations,
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
        <MapPin className="h-3.5 w-3.5 mr-1" />
        LOCATION
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between rounded-lg border-gray-300 bg-gray-50 py-5 h-auto"
          >
            <span className={location ? "text-gray-900" : "text-gray-400"}>
              {location || "Any location"}
            </span>
            {location ? (
              <X
                className="h-4 w-4 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setLocation(null);
                }}
              />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-60" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-72 p-0 rounded-xl">
          <Command className="rounded-lg">
            <CommandInput placeholder="Search area..." className="h-11" />
            <CommandList className="max-h-64">
              <CommandEmpty>No results found.</CommandEmpty>
              {Object.entries(egyptLocations).map(([city, areas]) => (
                <CommandGroup key={city} heading={city}>
                  {areas.map((area) => (
                    <CommandItem
                      key={area}
                      value={area}
                      onSelect={() => setLocation(`${area}, ${city}`)}
                      className="py-2"
                    >
                      {area}
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
