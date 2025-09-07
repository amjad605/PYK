"use client";

import type { FC } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X, Bed, Bath } from "lucide-react";

interface BedsBathsDropdownProps {
  rooms: number | null;
  bathrooms: number | null;
  setRooms: (value: number | null) => void;
  setBathrooms: (value: number | null) => void;
}

export const BedsBathsDropdown: FC<BedsBathsDropdownProps> = ({
  rooms,
  bathrooms,
  setRooms,
  setBathrooms,
}) => {
  const numbers = [1, 2, 3, 4, 5];
  const [open, setOpen] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    // يمنع الفتح أثناء الـ scroll على الموبايل
    if (e.pointerType === "touch" && e.cancelable) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col" style={{ touchAction: "pan-y" }}>
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
        <Bed className="h-3.5 w-3.5 mr-1 pointer-events-none" />
        BEDS & BATHS
      </p>

      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            onPointerDown={handlePointerDown}
            onClick={() => setOpen((prev) => !prev)}
            variant="outline"
            className="w-full justify-between rounded-lg border-gray-300 bg-gray-50 py-5 h-auto"
          >
            <span
              className={rooms || bathrooms ? "text-gray-900" : "text-gray-400"}
            >
              {rooms || bathrooms
                ? `${rooms ?? "Any"} Beds • ${bathrooms ?? "Any"} Baths`
                : "Any beds & baths"}
            </span>

            {rooms || bathrooms ? (
              <X
                className="h-4 w-4 opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setRooms(null);
                  setBathrooms(null);
                }}
              />
            ) : (
              <ChevronDown className="h-4 w-4 opacity-60 pointer-events-none" />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-64 p-4 space-y-4 rounded-xl">
          {/* Beds */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2 flex items-center">
              <Bed className="h-3.5 w-3.5 mr-1" />
              BEDS
            </p>
            <div className="flex gap-2 flex-wrap">
              {numbers.map((num) => (
                <Button
                  key={`bed-${num}`}
                  variant={rooms === num ? "default" : "outline"}
                  onClick={() => setRooms(num)}
                  className="rounded-full w-9 h-9"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          {/* Baths */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-2 flex items-center">
              <Bath className="h-3.5 w-3.5 mr-1" />
              BATHS
            </p>
            <div className="flex gap-2 flex-wrap">
              {numbers.map((num) => (
                <Button
                  key={`bath-${num}`}
                  variant={bathrooms === num ? "default" : "outline"}
                  onClick={() => setBathrooms(num)}
                  className="rounded-full w-9 h-9"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
