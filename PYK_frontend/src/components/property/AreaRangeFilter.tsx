"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Square } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface AreaRangeFilterProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const AreaRangeFilter: React.FC<AreaRangeFilterProps> = ({
  value,
  onChange,
  min = 50,
  max = 1000,
  step = 10,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      {/* Label */}
      <p className="text-xs font-medium text-gray-500 mb-2 flex items-center">
        <Square className="h-3.5 w-3.5 mr-1" />
        AREA RANGE (m²)
      </p>

      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center border border-gray-300 rounded-xl px-4 py-2 h-16 bg-gray-50   transition"
      >
        <span className="text-gray-700 text-sm">
          {value[0] && value[1]
            ? `${value[0]} m² - ${value[1]} m²`
            : "Select Area Range"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={value[0]}
              onChange={(e) => onChange([+e.target.value, value[1]])}
              className="w-24 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Min"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={value[1]}
              onChange={(e) => onChange([value[0], +e.target.value])}
              className="w-24 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max"
            />
            <SlidersHorizontal className="w-4 h-4 text-gray-500" />
          </div>

          {/* Sliders */}
          <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={(newValue) => onChange([newValue[0], newValue[1]])}
            className="w-full py-3"
          />

          {/* Values */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>${min}</span>
            <span>${max}</span>
          </div>
        </div>
      )}
    </div>
  );
};
