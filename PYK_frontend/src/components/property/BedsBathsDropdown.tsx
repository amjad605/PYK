"use client";

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative flex flex-col"
      ref={ref}
      style={{ touchAction: "pan-y" }}
    >
      {/* Trigger */}
      <Button
        onClick={() => setOpen((prev) => !prev)}
        variant="outline"
        className="w-full justify-between rounded-xl border-gray-300 bg-gray-50 py-4.5 h-auto"
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
              e.stopPropagation();
              setRooms(null);
              setBathrooms(null);
            }}
          />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-60" />
        )}
      </Button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute z-50 top-full mt-2 w-64 p-4 space-y-4 rounded-xl bg-white border shadow-md">
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
        </div>
      )}
    </div>
  );
};
