"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangeFilterProps {
  filters: DateRange;
  setFilters: (range: DateRange) => void;
  isFirstRender: boolean;
  setIsFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  filters,
  setFilters,
  isFirstRender,
  setIsFirstRender,
}) => {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange>({
    from: filters?.from ?? null,
    to: filters?.to ?? null,
  });
  useEffect(() => {
    if (!filters?.from && !filters?.to) {
      setTempRange({ from: null, to: null });
      setIsFirstRender(true);
    }
  }, [filters]);
  const applyFilter = () => {
    setFilters(tempRange);
    setOpen(false);
    setIsFirstRender(false);
  };

  const formatDate = (date: Date | null) =>
    date ? format(date, "dd MMM yyyy") : "";

  const displayText =
    tempRange.from && tempRange.to
      ? `${formatDate(tempRange.from)} - ${formatDate(tempRange.to)}`
      : "Select Date Range";

  return (
    <div className="relative">
      {/* Trigger Button */}
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center border border-gray-300 rounded-xl px-4 py-2 h-14.5 bg-gray-50 w-full transition shadow-none"
      >
        <span
          className={`${
            !isFirstRender ? "text-gray-700" : "text-gray-400"
          } font-medium text-sm`}
        >
          {displayText}
        </span>
        <div className="flex items-center gap-1 text-gray-400">
          <CalendarIcon size={16} />
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180 opacity-70" : "opacity-50"
            }`}
          />
        </div>
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-2 bg-white border border-gray-200 rounded-xl z-10 p-4 w-[300px]">
          <Calendar
            mode="range"
            selected={tempRange}
            onSelect={(range) =>
              setTempRange({
                from: range?.from ?? null,
                to: range?.to ?? null,
              })
            }
            numberOfMonths={1}
          />

          {/* Apply Button */}
          <Button
            onClick={applyFilter}
            disabled={!tempRange.from || !tempRange.to}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
