"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

interface PriceRangeFilterProps {
  value: [number | null, number | null];
  onChange: (range: [number | null, number | null]) => void;
  min?: number;
  max?: number;
  step?: number;
  isFirstRender: boolean;
  setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  value,
  onChange,
  min = 0,
  max = 100000000,

  isFirstRender,
  setIsFirstRender,
}) => {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<[number | null, number | null]>([min, max]);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `EGP ${(price / 1000000).toFixed(1)}M`;
    }
    return `EGP ${price.toLocaleString()}`;
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
          setTempValue(value);
          setOpen(!open);
        }}
        className="flex justify-between shadow-none items-center border border-gray-300 rounded-xl px-auto py-4 h-auto bg-gray-50 transition w-full"
      >
        <span
          className={`${!isFirstRender ? "text-gray-700" : "text-gray-400"
            } font-medium text-sm`}
        >
          {!isFirstRender
            ? `${formatPrice(value[0] ?? 0)} - ${formatPrice(value[1] ?? 0)}`
            : "Select Price Range"}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${open ? "rotate-180" : "opacity-50"
            }`}
        />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 p-4 space-y-3 w-72">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={tempValue[0] ?? 0}
              onChange={(e) =>
                setTempValue([+e.target.value, tempValue[1] ?? 0])
              }
              className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Min"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={tempValue[1] ?? 100000000}
              onChange={(e) =>
                setTempValue([tempValue[0] ?? 0, +e.target.value])
              }
              className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max"
            />
          </div>

          {/* Slider */}
          <Slider
            min={min}
            max={max}
            step={1000000}
            value={[tempValue[0] ?? min, tempValue[1] ?? max]}
            onValueChange={(newValue) =>
              setTempValue([newValue[0], newValue[1]])
            }
            className="w-full py-3"
          />

          {/* Values */}
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatPrice(tempValue[0] ?? 0)}</span>
            <span>{formatPrice(tempValue[1] ?? 0)}</span>
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
