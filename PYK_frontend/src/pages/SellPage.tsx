import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Nav from "@/components/common/Nav";
import FiltersCard from "@/components/property/FiltersCard";
import PropertyCardListView from "@/components/property/PropertyCardListView";
import { Pagination } from "@/utils/Pagination";

import { useProperty } from "@/hooks/useProperty";
import type { FiltersType } from "@/types/filters";

import bg2 from "../assets/Modern House at Twilight.png";

/* ----------------------------------
   Constants
----------------------------------- */
const INITIAL_FILTERS: FiltersType = {
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
const SORT_OPTIONS = [
  { label: "Newest First", value: "createdAt-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Largest Area", value: "area-desc" },
];
export default function SellPage() {
  const { cat: category } = useParams<{ cat: string }>();

  const [filters, setFilters] = useState<FiltersType>(INITIAL_FILTERS);

  /* ----------------------------------
     Reset pagination on category change
  ----------------------------------- */
  useEffect(() => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  }, [category]);

  /* ----------------------------------
     Handlers
  ----------------------------------- */
  const handleFilterChange = useCallback(
    (newFilters: Partial<FiltersType>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
        page: 1,
      }));
    },
    []
  );
  const handleSortChange = useCallback((sortValue: string) => {
    const [sortBy, sortOrder] = sortValue.split("-") as [string, "asc" | "desc"];
    handleFilterChange({ sortBy, sortOrder });
  }, [handleFilterChange]);
  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  /* ----------------------------------
     Build API query params
  ----------------------------------- */
  const queryParams = useMemo(
    () => ({
      listingType: category,
      propertyType: filters.propertyType
        ? filters.propertyType.toLowerCase()
        : undefined,

      minPrice: filters.priceRange[0] || 0,
      maxPrice: filters.priceRange[1] || 0,

      minArea: filters.areaRange[0],
      maxArea: filters.areaRange[1],

      bedrooms: filters.rooms,
      bathrooms: filters.bathrooms,

      location: filters.location
        ? filters.location.split(",")[0]
        : undefined,

      facilities: filters.facilities,
      finishing: filters.finishing,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
      search: filters.keyword,
      page: filters.page,
      limit: filters.limit,
    }),
    [category, filters]
  );

  /* ----------------------------------
     Fetch data
  ----------------------------------- */
  const {
    data: properties = [],
    totalCount = 0,
    loading,
  } = useProperty(queryParams);

  const totalPages = Math.max(1, Math.ceil(totalCount / filters.limit));

  /* ----------------------------------
     Render
  ----------------------------------- */
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url("${bg2}")` }}
      >
        <Nav />

        <div className="relative z-10 max-w-7xl mx-auto top-30">
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
        // New Props
        currentSort={`${filters.sortBy}-${filters.sortOrder}`}
        onSortChange={handleSortChange}
        sortOptions={SORT_OPTIONS}
      />

      {totalCount > 0 && (
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
