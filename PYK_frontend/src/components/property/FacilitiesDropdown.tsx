"use client";

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";

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
  const [tempFacilities, setTempFacilities] = useState<string[]>(facilities);
  const ref = useRef<HTMLDivElement>(null);

  // sync temporary selection with actual selection on open
  useEffect(() => {
    if (open) {
      setTempFacilities(facilities);
    }
  }, [open, facilities]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleFacility = (facility: string) => {
    if (tempFacilities.includes(facility)) {
      setTempFacilities(tempFacilities.filter((f) => f !== facility));
    } else {
      setTempFacilities([...tempFacilities, facility]);
    }
  };

  const applyChanges = () => {
    setFacilities(tempFacilities);
    setOpen(false);
  };

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
        <span className={facilities.length ? "text-gray-900" : "text-gray-400"}>
          {facilities.length > 0 ? facilities.join(", ") : "Select facilities"}
        </span>

        {facilities.length > 0 ? (
          <X
            className="h-4 w-4 opacity-60 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              setFacilities([]);
            }}
          />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-60" />
        )}
      </Button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute z-50 top-full mt-2 w-56 p-3 space-y-1 rounded-xl bg-white border shadow-md">
          {allFacilities.map((facility) => (
            <label
              key={facility}
              className="flex items-center gap-2 rounded-md py-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={tempFacilities.includes(facility)}
                onChange={() => toggleFacility(facility)}
                className="border-none text-primary focus:ring-0 rounded-full h-4 w-4"
              />
              <span>{facility}</span>
            </label>
          ))}

          {/* Apply button */}
          <div className="pt-2 border-t mt-2 flex justify-end">
            <Button size="sm" onClick={applyChanges}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
