import React, { useState, useRef, useEffect } from "react";

interface PriceRangeDropdownProps {
  min: number;
  max: number;
  step?: number;
  value?: [number, number] | null;
  onChange: (value: [number, number]) => void;
}

const PriceRangeDropdown: React.FC<PriceRangeDropdownProps> = ({
  min,
  max,
  step = 100,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [minValue, setMinValue] = useState(value![0]);
  const [maxValue, setMaxValue] = useState(value![1]);

  // Sync with parent value if it changes
  useEffect(() => {
    setMinValue(value![0]);
    setMaxValue(value![1]);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update parent when values change
  const handleChange = (newMin: number, newMax: number) => {
    setMinValue(newMin);
    setMaxValue(newMax);
    onChange([newMin, newMax]);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 w-56  rounded-lg bg-white shadow-sm flex justify-between"
      >
        ({minValue} - {maxValue} )EGP<span className="ml-2"></span>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 z-50">
          {/* Inputs */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              value={minValue}
              min={min}
              max={maxValue - step}
              onChange={(e) =>
                handleChange(
                  Math.min(+e.target.value, maxValue - step),
                  maxValue
                )
              }
              className="w-full border rounded-lg px-2 py-1"
              placeholder="Min"
            />
            <input
              type="number"
              value={maxValue}
              min={minValue + step}
              max={max}
              onChange={(e) =>
                handleChange(
                  minValue,
                  Math.max(+e.target.value, minValue + step)
                )
              }
              className="w-full border rounded-lg px-2 py-1"
              placeholder="Max"
            />
          </div>

          {/* Slider */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full">
            {/* Range highlight */}
            <div
              className="absolute h-2 bg-blue-500 rounded-full"
              style={{
                left: `${((minValue - min) / (max - min)) * 100}%`,
                right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
              }}
            ></div>

            {/* Min handle */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={minValue}
              onChange={(e) =>
                handleChange(
                  Math.min(+e.target.value, maxValue - step),
                  maxValue
                )
              }
              className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
            />

            {/* Max handle */}
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={maxValue}
              onChange={(e) =>
                handleChange(
                  minValue,
                  Math.max(+e.target.value, minValue + step)
                )
              }
              className="absolute w-full h-2 bg-transparent appearance-none pointer-events-auto"
            />
          </div>

          {/* Slider labels */}
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{min}EGP</span>
            <span>{max}EGP</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRangeDropdown;
