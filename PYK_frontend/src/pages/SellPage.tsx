import Nav from "@/components/common/Nav";
import FiltersCard from "@/components/property/FiltersCard";
import PropertyCardListView from "@/components/property/PropertyCardListView";
import { useProperty } from "@/hooks/useProperty";
import { useState, useEffect } from "react";
import { replace, useParams, useSearchParams } from "react-router-dom";
import bg2 from "../assets/Modern House at Twilight.png";
import { Pagination } from "@/utils/Pagination";

export default function SellPage() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // ⬇️ Initialize filters from URL or default
  const [filters, setFilters] = useState({
    propertyType: searchParams.get("propertyType") || "",
    location: searchParams.get("location") || null,
    priceRange: [
      Number(searchParams.get("minPrice")) || 500000,
      Number(searchParams.get("maxPrice")) || 25000000,
    ],
    areaRange: [
      Number(searchParams.get("minArea")) || 100,
      Number(searchParams.get("maxArea")) || 5000,
    ],
    rooms: searchParams.get("rooms") || null,
    bathrooms: searchParams.get("bathrooms") || null,
    facilities: searchParams.getAll("facilities") || [],
    furnishing: searchParams.get("furnishing") || null,
    contractDuration: searchParams.get("contractDuration") || null,
    keyword: searchParams.get("keyword") || "",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 9,
  });

  // ⬇️ Sync filters to URL whenever they change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else {
        params.set(key, String(value));
      }
    });

    // قارن قبل التحديث
    const currentParams = new URLSearchParams(window.location.search);

    if (params.toString() !== currentParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, setSearchParams]);
  const handleFilterChange = (newFilters: Record<string, unknown>) => {
    // reset page to 1 when filters change
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  // ⬇️ Call backend with current filters + pagination
  const {
    data: properties,
    totalCount,
    loading,
    error,
  } = useProperty({
    listingType: params.cat,
    propertyType: filters.propertyType?.toLocaleLowerCase() ?? "",
    minPrice: filters.priceRange[0],
    maxPrice: filters.priceRange[1],
    bedrooms: filters.rooms,
    location: (filters.location ?? "").split(",")[0],
    bathrooms: filters.bathrooms,
    facilities: filters.facilities ?? [],
    search: filters.keyword,
    page: filters.page,
    limit: filters.limit,
  });

  // ⬇️ Calculate total pages from backend
  const totalPages = Math.ceil((totalCount || 0) / filters.limit);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url("${bg2}")` }}
      >
        <Nav />
        <div className="max-w-7xl mx-auto relative z-10   top-30">
          <FiltersCard
            listingType={params.cat}
            filters={filters}
            setFilters={setFilters}
            onApply={handleFilterChange}
          />
        </div>
      </div>

      {/* Property List */}
      <PropertyCardListView
        properties={properties}
        totalCount={totalCount}
        loading={loading}
      />

      {/* Pagination */}
      {properties.length > 0 && (
        <div className="flex justify-center pb-10 bg-stone-50">
          <Pagination
            page={filters.page}
            totalPages={totalPages} // محسوبة من backend
            onPageChange={(newPage) =>
              setFilters((prev) => ({ ...prev, page: newPage }))
            }
          />
        </div>
      )}
    </div>
  );
}
