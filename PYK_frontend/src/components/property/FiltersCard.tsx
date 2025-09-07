"use client";

import { useState } from "react";
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
import { SlidersHorizontal } from "lucide-react";

import { PropertyTypeDropdown } from "./PropertyTypeDropDown";
import { FacilitiesDropdown } from "./FacilitiesDropdown";
import { BedsBathsDropdown } from "./BedsBathsDropdown";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AreaRangeFilter } from "./AreaRangeFilter";
import { LocationDropdown } from "./LocationDropDown";
import { FurnishingDropdown } from "./FurnishingDropdown";
import { ContractDurationDropdown } from "./ContractDurationDropdown";

export type ListingType = "primary" | "resale" | "rent";
type PropertyType = "Apartment" | "House" | "Villa" | "Condo" | "Townhouse";

interface FiltersCardProps {
  listingType: string;
}

export default function FiltersCard({ listingType }: FiltersCardProps) {
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 5000]);
  const [rooms, setRooms] = useState<number | null>(null);
  const [bathrooms, setBathrooms] = useState<number | null>(null);
  const [areaRange, setAreaRange] = useState<[number, number]>([1000, 5000]);
  const [facilities, setFacilities] = useState<string[]>([]);
  const [location, setLocation] = useState<string | null>("");
  const [furnishing, setFurnishing] = useState<string | null>("");
  const [contractDuration, setContractDuration] = useState<string | null>(null);

  const handleApply = () => {
    const filters = {
      listingType,
      propertyType,
      priceRange,
      rooms,
      bathrooms,
      areaRange,
      facilities,
      furnishing,
      contractDuration,
    };
    console.log("Applied Filters:", filters);
  };

  const clearAll = () => {
    setPropertyType("");
    setLocation(null);
    setPriceRange([1000, 5000]);
    setRooms(null);
    setBathrooms(null);
    setFacilities([]);
    setFurnishing(null);
    setContractDuration(null);
  };

  const egyptLocations: Record<string, string[]> = {
    Cairo: ["Nasr City", "Heliopolis", "Maadi", "Fifth Settlement", "Zamalek"],
    Giza: ["Dokki", "Mohandessin", "October City", "Sheikh Zayed", "Haram"],
    Alexandria: ["Smouha", "Stanley", "Gleem", "Miami", "Montaza"],
  };

  const renderFilters = () => {
    const commonFilters = (
      <>
        <LocationDropdown
          location={location}
          setLocation={setLocation}
          egyptLocations={egyptLocations}
        />
        <PropertyTypeDropdown
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          clearFilter={() => setPropertyType("")}
        />
        <AreaRangeFilter
          value={areaRange}
          onChange={setAreaRange}
          min={1000}
          max={5000}
          step={100}
        />
        <PriceRangeFilter
          value={priceRange}
          onChange={setPriceRange}
          min={1000}
          max={5000}
          step={100}
        />
        <BedsBathsDropdown
          rooms={rooms}
          bathrooms={bathrooms}
          setRooms={setRooms}
          setBathrooms={setBathrooms}
        />
      </>
    );

    if (listingType === "primary") {
      return (
        <>
          {commonFilters}
          <FacilitiesDropdown
            facilities={facilities}
            setFacilities={setFacilities}
          />
        </>
      );
    }

    if (listingType === "resale") {
      return (
        <>
          {commonFilters}
          <FacilitiesDropdown
            facilities={facilities}
            setFacilities={setFacilities}
          />
        </>
      );
    }

    if (listingType === "rent") {
      return (
        <>
          {commonFilters}
          <BedsBathsDropdown
            rooms={rooms}
            bathrooms={bathrooms}
            setRooms={setRooms}
            setBathrooms={setBathrooms}
          />
          <FurnishingDropdown value={furnishing} setValue={setFurnishing} />
          <ContractDurationDropdown
            value={contractDuration}
            setValue={setContractDuration}
          />
        </>
      );
    }
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <Card className="w-full max-w-7xl mx-auto shadow-sm border border-gray-100 rounded-2xl p-5 bg-white">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <SlidersHorizontal className="h-5 w-5 mr-2 text-blue-600" />
              Refine Your Search
            </CardTitle>
          </CardHeader>

          <div className="grid grid-cols-4 gap-4">{renderFilters()}</div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={clearAll}
              className="rounded-lg text-gray-600 hover:text-gray-900 bg-gray-100 px-6 py-3"
            >
              Clear All
            </Button>
            <Button
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3"
            >
              Apply Filters
            </Button>
          </div>
        </Card>
      </div>

      {/* Mobile */}
      <div className="lg:hidden w-full px-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-3">
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </Button>
          </DrawerTrigger>

          <DrawerContent className="flex flex-col h-[85vh] rounded-t-2xl p-4">
            <DrawerHeader>
              <DrawerTitle className="text-lg font-semibold">
                Refine Your Search
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 overflow-y-auto grid grid-cols-1 gap-4 py-4">
              {renderFilters()}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button
                variant="ghost"
                onClick={clearAll}
                className="w-full rounded-lg text-gray-600 hover:text-gray-900 bg-gray-100 py-3"
              >
                Clear All
              </Button>
              <DrawerClose asChild>
                <Button
                  onClick={handleApply}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
                >
                  Apply Filters
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
