"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Search, SlidersHorizontal, X } from "lucide-react";

import type { FiltersType } from "@/types/filters";

import { PropertyTypeDropdown } from "./PropertyTypeDropDown";
import { FacilitiesDropdown } from "./FacilitiesDropdown";
import { BedsBathsDropdown } from "./BedsBathsDropdown";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AreaRangeFilter } from "./AreaRangeFilter";
import { LocationDropdown } from "./LocationDropDown";
import { FurnishingDropdown } from "./FurnishingDropdown";
import { ContractDurationDropdown } from "./ContractDurationDropdown";
import { DateRangeFilter } from "./DateRangeFilter";
import { se } from "date-fns/locale";
import { EGYPT_LOCATIONS } from "@/utils/locations";

/* ----------------------------------
   Constants
----------------------------------- */
const EMPTY_FILTERS: FiltersType = {
  propertyType: "",
  location: null,
  priceRange: [0, 0],
  areaRange: [0, 5000],
  rooms: null,
  bathrooms: null,
  facilities: [],
  finishing: null,
  contractDuration: null,
  dateRange: { from: null, to: null },
  sortBy: "createdAt",
  sortOrder: "desc",
  page: 1,
  keyword: "",
  limit: 12,
};



interface FiltersCardProps {
  listingType?: string;
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  onApply: (filters: Partial<FiltersType>) => void;
}

export default function FiltersCard({
  listingType,
  filters,
  setFilters,
  onApply,
}: FiltersCardProps) {
  const [showMore, setShowMore] = useState(false);
  const [keyword, setKeyword] = useState(filters.keyword);
  const [isAreaFirstRendered, setIsAreaFirstRendered] = useState(true);
  const [isPriceFirstRendered, setIsPriceFirstRendered] = useState(true);
  const [isDateFirstRendered, setIsDateFirstRendered] = useState(true);
  /* ----------------------------------
     Unified updater
  ----------------------------------- */
  const updateFilters = useCallback(
    (updates: Partial<FiltersType>) => {
      setFilters((prev) => {
        const next = { ...prev, ...updates, page: 1 };
        onApply(next);
        return next;
      });
    },
    [onApply, setFilters]
  );

  /* ----------------------------------
     Keyword debounce
  ----------------------------------- */
  useEffect(() => {
    const id = setTimeout(() => {
      if (keyword !== filters.keyword) {
        updateFilters({ keyword });
      }
    }, 800);

    return () => clearTimeout(id);
  }, [keyword, filters.keyword, updateFilters]);

  /* ----------------------------------
     Clear all
  ----------------------------------- */
  const clearAll = () => {
    setFilters(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
    setKeyword("");
    setIsAreaFirstRendered(true);
    setIsPriceFirstRendered(true);
    setIsDateFirstRendered(true);
  };

  /* ----------------------------------
     Render
  ----------------------------------- */
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Card className="p-6 rounded-2xl border border-gray-100">
          <CardHeader className="p-0 pb-4 flex justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <SlidersHorizontal className="h-5 w-5 text-blue-600" />
              Refine Your Search
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear
            </Button>
          </CardHeader>

          <div className="flex gap-3 items-center">
            <div className="flex w-[90%] items-center border rounded-lg px-3 py-4 bg-gray-50">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search by developer, compound, location..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <LocationDropdown
              value={filters.location}
              onChange={(location) => updateFilters({ location })}
              locations={EGYPT_LOCATIONS}
            />

            <PropertyTypeDropdown
              propertyType={filters.propertyType}
              setPropertyType={(propertyType) =>
                updateFilters({ propertyType })
              }
              clearFilter={() => updateFilters({ propertyType: "" })}
            />

            <PriceRangeFilter
              value={filters.priceRange}
              onChange={(priceRange) => updateFilters({ priceRange })}
              min={0}
              max={100_000_000}
              step={10_000}
              isFirstRender={isPriceFirstRendered}
              setIsFirstRender={setIsPriceFirstRendered}
            />

            <Button
              variant="outline"
              onClick={() => setShowMore((s) => !s)}
              className="flex items-center gap-2"
            >
              {showMore ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
              {showMore ? "Hide" : "More"}
            </Button>
          </div>

          {showMore && (
            <div className="grid grid-cols-4 gap-4 mt-5">
              <BedsBathsDropdown
                rooms={filters.rooms}
                bathrooms={filters.bathrooms}
                setRooms={(rooms) => updateFilters({ rooms })}
                setBathrooms={(bathrooms) =>
                  updateFilters({ bathrooms })
                }
              />

              <AreaRangeFilter
                value={filters.areaRange}
                onChange={(areaRange) => updateFilters({ areaRange })}
                min={0}
                max={5000}
                step={100}
                isFirstRender={isAreaFirstRendered} setIsFirstRender={setIsAreaFirstRendered} />

              <FurnishingDropdown
                value={filters.finishing}
                setValue={(finishing) =>
                  updateFilters({ finishing })
                }
              />

              <FacilitiesDropdown
                facilities={filters.facilities}
                setFacilities={(facilities) =>
                  updateFilters({ facilities })
                }
              />

              {listingType === "rent" && (
                <DateRangeFilter
                  filters={filters.dateRange}
                  isFirstRender={isDateFirstRendered}
                  setIsFirstRender={setIsDateFirstRendered}
                  setFilters={(dateRange) =>
                    updateFilters({ dateRange })

                  }
                />
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Mobile */}
      <div className="lg:hidden px-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full h-14 flex gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </Button>
          </DrawerTrigger>

          <DrawerContent className="h-[45vh] p-4 rounded-t-2xl">
            <DrawerHeader>
              <DrawerTitle>Refine Your Search</DrawerTitle>
            </DrawerHeader>

            <div className="grid gap-4 overflow-y-auto">
              <LocationDropdown
                value={filters.location}
                onChange={(location) => updateFilters({ location })}
                locations={EGYPT_LOCATIONS}
              />

              <PropertyTypeDropdown
                propertyType={filters.propertyType}
                setPropertyType={(propertyType) =>
                  updateFilters({ propertyType })
                }
                clearFilter={() => updateFilters({ propertyType: "" })}
              />

              <BedsBathsDropdown
                rooms={filters.rooms}
                bathrooms={filters.bathrooms}
                setRooms={(rooms) => updateFilters({ rooms })}
                setBathrooms={(bathrooms) =>
                  updateFilters({ bathrooms })
                }
              />

              <FacilitiesDropdown
                facilities={filters.facilities}
                setFacilities={(facilities) =>
                  updateFilters({ facilities })
                }
              />

              {listingType === "rent" && (
                <>
                  <FurnishingDropdown
                    value={filters.finishing}
                    setValue={(finishing) =>
                      updateFilters({ finishing })
                    }
                  />
                  <ContractDurationDropdown
                    value={filters.contractDuration}
                    setValue={(contractDuration) =>
                      updateFilters({ contractDuration })
                    }
                  />
                </>
              )}
            </div>

            <div className="mt-4 flex gap-3">
              <Button variant="outline" onClick={clearAll} className="w-full">
                Clear All
              </Button>
              <DrawerClose asChild>
                <Button className="w-full">Apply</Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
