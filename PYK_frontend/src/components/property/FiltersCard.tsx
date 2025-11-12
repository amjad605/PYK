"use client";

import { useState, useEffect } from "react";
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

import { PropertyTypeDropdown } from "./PropertyTypeDropDown";
import { FacilitiesDropdown } from "./FacilitiesDropdown";
import { BedsBathsDropdown } from "./BedsBathsDropdown";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AreaRangeFilter } from "./AreaRangeFilter";
import { LocationDropdown } from "./LocationDropDown";
import { FurnishingDropdown } from "./FurnishingDropdown";
import { ContractDurationDropdown } from "./ContractDurationDropdown";
import { DateRangeFilter } from "./DateRangeFilter";
import { date } from "zod";

export type ListingType = "primary" | "resale" | "rent";

interface FiltersCardProps {
  listingType: string | undefined;
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  onApply: () => void;
}

export default function FiltersCard({
  listingType,
  filters,
  setFilters,
  onApply,
}: FiltersCardProps) {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [keyword, setKeyword] = useState(filters.keyword || "");
  const [isFirstRenderPrice, setIsFirstRenderPrice] = useState(true);
  const [isFirstRenderArea, setIsFirstRenderArea] = useState(true);
  // debounce for keyword
  useEffect(() => {
    const handler = setTimeout(() => {
      if (keyword !== filters.keyword) {
        setFilters({ ...filters, keyword });
        onApply();
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [keyword]);

  const clearAll = () => {
    setFilters({
      propertyType: "",
      location: null,
      priceRange: [0, 100000000],
      areaRange: [0, 5000],
      rooms: null,
      bathrooms: null,
      facilities: [],
      furnishing: null,
      contractDuration: null,
      dateRange: {
        from: null,
        to: null,
      },
      keyword: "",
      page: 1,
      limit: 9,
    });
    setIsFirstRenderPrice(true);
    setIsFirstRenderArea(true);
  };

  const egyptLocations: Record<string, string[]> = {
    Cairo: [
      "Nasr City",
      "Heliopolis",
      "Maadi",
      "Fifth Settlement",
      "New Cairo",
      "Zamalek",
    ],
    Giza: ["Dokki", "Mohandessin", "6th of October", "Sheikh Zayed", "Haram"],
    Alexandria: ["Smouha", "Stanley", "Gleem", "Miami", "Montaza"],
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block ">
        <Card className="w-full mx-auto shadow-sm border border-gray-100 rounded-2xl  p-6 bg-white">
          <CardHeader className="p-0 pb-4 flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2 text-blue-600" />
              Refine Your Search
            </CardTitle>
            <button
              onClick={clearAll}
              className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition text-gray-600"
            >
              Clear
            </button>
          </CardHeader>

          <div className="flex w-full gap-3 items-center">
            {/* keyword input */}
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-4 w-[90%] bg-gray-50">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by  Developer / Compound / Location / Keyword..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFilters({ ...filters, keyword });
                  }
                }}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            <LocationDropdown
              location={filters.location}
              setLocation={(location) => setFilters({ ...filters, location })}
              egyptLocations={egyptLocations}
            />
            <PropertyTypeDropdown
              propertyType={filters.propertyType}
              setPropertyType={(propertyType) => {
                setFilters({ ...filters, propertyType });
                onApply();
              }}
              clearFilter={() => setFilters({ ...filters, propertyType: "" })}
            />
            <PriceRangeFilter
              value={filters.priceRange}
              onChange={(priceRange) => setFilters({ ...filters, priceRange })}
              min={0}
              max={100000000}
              step={10000}
              isFirstRender={isFirstRenderPrice}
              setIsFirstRender={setIsFirstRenderPrice}
            />

            {/* Toggle More Filters */}
            <Button
              variant="outline"
              onClick={() => setShowMore(!showMore)}
              className="rounded-lg flex items-center gap-2 text-sm"
            >
              {showMore ? (
                <>
                  <X className="h-4 w-4" /> Hide Filters
                </>
              ) : (
                <>
                  <SlidersHorizontal className="h-4 w-4" /> More Filters
                </>
              )}
            </Button>
          </div>

          {showMore && (
            <div className="mt-5 grid grid-cols-4 gap-4">
              <BedsBathsDropdown
                rooms={filters.rooms}
                bathrooms={filters.bathrooms}
                setRooms={(rooms) => setFilters({ ...filters, rooms })}
                setBathrooms={(bathrooms) =>
                  setFilters({ ...filters, bathrooms })
                }
              />
              <AreaRangeFilter
                value={filters.areaRange}
                onChange={(areaRange) => setFilters({ ...filters, areaRange })}
                min={0}
                max={5000}
                step={100}
                isFirstRender={isFirstRenderArea}
                setIsFirstRender={setIsFirstRenderArea}
              />
              <FurnishingDropdown
                value={filters.furnishing}
                setValue={(furnishing) =>
                  setFilters({ ...filters, furnishing })
                }
              />
              <FacilitiesDropdown
                facilities={filters.facilities}
                setFacilities={(facilities) =>
                  setFilters({ ...filters, facilities })
                }
              />

              {listingType === "rent" && (
                <>
                  <DateRangeFilter
                    filters={filters.dateRange}
                    setFilters={(dateRange) =>
                      setFilters({ ...filters, dateRange })
                    }
                    isFirstRender={isFirstRender}
                    setIsFirstRender={setIsFirstRender}
                  />
                </>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Mobile (unchanged) */}
      <div className="lg:hidden w-full px-4">
        <Drawer>
          <div className="flex gap-2 ">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-4 w-[90%] bg-gray-50">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by Developer/Compound/Location/Keyword..."
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFilters({ ...filters, keyword });
                  }
                }}
                className="w-full bg-transparent text-[10px] outline-none"
              />
            </div>
            <DrawerTrigger asChild>
              <Button className="flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg mx-auto h-14 w-14">
                <SlidersHorizontal className="h6 w-6 " />
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerContent className="flex flex-col h-[45vh] rounded-t-2xl p-4">
            <DrawerHeader>
              <DrawerTitle className="text-lg font-semibold">
                Refine Your Search
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-4 py-4">
              <LocationDropdown
                location={filters.location}
                setLocation={(location) => setFilters({ ...filters, location })}
                egyptLocations={egyptLocations}
              />
              <PropertyTypeDropdown
                propertyType={filters.propertyType}
                setPropertyType={(propertyType) =>
                  setFilters({ ...filters, propertyType })
                }
                clearFilter={() => setFilters({ ...filters, propertyType: "" })}
              />
              <BedsBathsDropdown
                rooms={filters.rooms}
                bathrooms={filters.bathrooms}
                setRooms={(rooms) => setFilters({ ...filters, rooms })}
                setBathrooms={(bathrooms) =>
                  setFilters({ ...filters, bathrooms })
                }
              />
              <FacilitiesDropdown
                facilities={filters.facilities}
                setFacilities={(facilities) =>
                  setFilters({ ...filters, facilities })
                }
              />
              <AreaRangeFilter
                value={filters.areaRange}
                onChange={(areaRange) => setFilters({ ...filters, areaRange })}
                min={1000}
                max={5000}
                step={100}
              />
              <PriceRangeFilter
                value={filters.priceRange}
                onChange={(priceRange) =>
                  setFilters({ ...filters, priceRange })
                }
                min={1000}
                max={5000}
                step={100}
              />

              {listingType === "rent" && (
                <>
                  <FurnishingDropdown
                    value={filters.furnishing}
                    setValue={(furnishing) =>
                      setFilters({ ...filters, furnishing })
                    }
                  />
                  <ContractDurationDropdown
                    value={filters.contractDuration}
                    setValue={(contractDuration) =>
                      setFilters({ ...filters, contractDuration })
                    }
                  />
                </>
              )}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="ghost"
                onClick={clearAll}
                className="w-full rounded-lg text-gray-600 hover:text-gray-900 bg-gray-100 py-3"
              >
                Clear All
              </Button>
              <DrawerClose asChild></DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
