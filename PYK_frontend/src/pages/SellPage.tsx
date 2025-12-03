import React, { useCallback, useEffect, useMemo, useState } from "react";
import Nav from "@/components/common/Nav";
import FiltersCard from "@/components/property/FiltersCard";
import PropertyCardListView from "@/components/property/PropertyCardListView";
import { useProperty } from "@/hooks/useProperty";
import { useParams } from "react-router-dom";
import bg2 from "../assets/Modern House at Twilight.png";
import { Pagination } from "@/utils/Pagination";
import type { FiltersType } from "@/types/filters";

export default function SellPage() {
  const { cat: category } = useParams<{ cat: string }>();

  const [filters, setFilters] = useState<FiltersType>({
    propertyType: "",
    location: null,
    priceRange: [0, 100000000] as [number, number],
    areaRange: [0, 5000] as [number, number],
    rooms: null,
    bathrooms: null,
    facilities: [],
    finishing: null,
    contractDuration: null,
    dateRange: { from: null, to: null },
    page: 1,
    keyword: "",
    limit: 9,
  });

  const prevCategory = React.useRef(category);

  // Reset page when category changes
  useEffect(() => {
    if (prevCategory.current !== category) {
      prevCategory.current = category;
      setFilters((prev) => ({ ...prev, page: 1 }));
    }
  }, [category]);


  const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);


  const queryParams = useMemo(
    () => ({
      listingType: category,
      propertyType: filters.propertyType.toLowerCase(),
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      minArea: filters.areaRange[0],
      maxArea: filters.areaRange[1],
      bedrooms: filters.rooms,
      bathrooms: filters.bathrooms,
      location: (filters.location ?? "").split(",")[0],
      facilities: filters.facilities,
      furnishing: filters.finishing,
      contractDuration: filters.contractDuration,
      search: filters.keyword,
      page: filters.page,
      limit: filters.limit,
    }),
    [category, filters]
  );

  /* -------------------------
      Fetch data
     ------------------------- */
  const { data: properties = [], totalCount = 0, loading } = useProperty(queryParams);

  const totalPages = Math.max(1, Math.ceil(totalCount / filters.limit));

  /* -------------------------
      Render
     ------------------------- */
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url("${bg2}")` }}
      >
        <Nav />
        <div className="max-w-7xl mx-auto relative z-10 top-30">
          <FiltersCard
            listingType={category}
            filters={filters}
            setFilters={setFilters}
            onApply={handleFilterChange}
          />
        </div>
      </div>

      <PropertyCardListView
        properties={properties}
        totalCount={totalCount}
        loading={loading}
      />

      {properties.length > 0 && (
        <div className="flex justify-center pb-10 bg-stone-50">
          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
