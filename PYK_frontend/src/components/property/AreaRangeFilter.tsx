"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface AreaRangeFilterProps {
  value: [number, number];
  onChange: (range: [number | null, number | null]) => void;
  min?: number;
  max?: number;
  step?: number;
  isFirstRender: boolean;
  setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AreaRangeFilter: React.FC<AreaRangeFilterProps> = ({
  value,
  onChange,
  min = 50,
  max = 2000,
  step = 10,
  isFirstRender,
  setIsFirstRender,
}) => {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<[number, number]>([min, max]);

  const formatArea = (area: number) => {
    return `${area.toLocaleString()} m²`;
  };

  const applyFilter = () => {
    onChange(tempValue);
    setOpen(false);
    setIsFirstRender(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => {
          setTempValue(value); // كل مرة يفتح يرجّع القيم الحالية
          setOpen(!open);
        }}
        className="flex justify-between shadow-none items-center border border-gray-300 rounded-xl px-4 py-2 h-14.5 bg-gray-50 transition w-full"
      >
        {/* Text */}

        <span
          className={`${
            !isFirstRender ? "text-gray-700" : "text-gray-400"
          } font-medium text-sm`}
        >
          {!isFirstRender
            ? `${formatArea(value[0])} - ${formatArea(value[1])}`
            : "Select Area Range"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400   transition-transform ${
            open ? "rotate-180" : "opacity-50"
          }`}
        />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded-xl  z-10 p-4 space-y-3 w-72">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempValue[0] ?? min}
              onChange={(e) =>
                setTempValue([+e.target.value, tempValue[1] ?? max])
              }
              className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Min"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={tempValue[1] ?? max}
              onChange={(e) =>
                setTempValue([tempValue[0] ?? min, +e.target.value])
              }
              className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max"
            />
          </div>

          {/* Slider */}
          <Slider
            min={min}
            max={max}
            step={step}
            value={tempValue}
            onValueChange={(newValue) =>
              setTempValue([newValue[0], newValue[1]])
            }
            className="w-full py-3"
          />

          {/* Values */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatArea(min)}</span>
            <span>{formatArea(max)}</span>
          </div>

          {/* Apply Button */}
          <Button
            onClick={applyFilter}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
