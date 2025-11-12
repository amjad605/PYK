import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Nav from "@/components/common/Nav";
import FiltersCard from "@/components/property/FiltersCard";
import PropertyCardListView from "@/components/property/PropertyCardListView";
import { useProperty } from "@/hooks/useProperty";
import { useParams, useSearchParams } from "react-router-dom";
import bg2 from "../assets/Modern House at Twilight.png";
import { Pagination } from "@/utils/Pagination";

/* ---------- helpers ---------- */
const buildSearchParams = (filters: Record<string, any>): URLSearchParams => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (
      value == null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    )
      return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  });
  return params;
};

const parseFiltersFromURL = (searchParams: URLSearchParams) => ({
  propertyType: searchParams.get("propertyType") || "",
  location: searchParams.get("location") || null,
  priceRange: [
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 100000000,
  ] as [number, number],
  areaRange: [
    Number(searchParams.get("minArea")) || 0,
    Number(searchParams.get("maxArea")) || 5000,
  ] as [number, number],
  rooms: searchParams.get("rooms") || null,
  bathrooms: searchParams.get("bathrooms") || null,
  facilities: searchParams.getAll("facilities") || [],
  furnishing: searchParams.get("furnishing") || null,
  contractDuration: searchParams.get("contractDuration") || null,
  keyword: searchParams.get("keyword") || "",
  dateRange: {
    from: searchParams.get("dateFrom")
      ? new Date(searchParams.get("dateFrom") as string)
      : null,
    to: searchParams.get("dateTo")
      ? new Date(searchParams.get("dateTo") as string)
      : null,
  },
  page: Number(searchParams.get("page")) || 1,
  limit: Number(searchParams.get("limit")) || 9,
});

/* ---------- Component ---------- */
export default function SellPage() {
  const { cat: category } = useParams<{ cat: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Track if we're in the middle of a back/forward navigation
  const isNavigatingBack = useRef(false);
  const lastAppliedSearch = useRef<string>(searchParams.toString());

  // initial filters are hydrated from current URL once
  const [filters, setFilters] = useState(() =>
    parseFiltersFromURL(searchParams)
  );

  const prevCategory = useRef<string | undefined>(category);

  /* -------------------------
     Category change: reset page
     ------------------------- */
  useEffect(() => {
    if (prevCategory.current !== category) {
      prevCategory.current = category;
      setFilters((prev) => ({ ...prev, page: 1 }));
    }
  }, [category]);

  /* -------------------------
     filters -> URL (sync)
     - Use replace: true to avoid adding to browser history
     ------------------------- */
  useEffect(() => {
    // Don't update URL during back/forward navigation
    if (isNavigatingBack.current) return;

    const params = buildSearchParams(filters);
    const paramsStr = params.toString();

    if (paramsStr !== lastAppliedSearch.current) {
      lastAppliedSearch.current = paramsStr;
      // Use replace: true to avoid creating new history entries
      setSearchParams(params, { replace: true });
    }
  }, [filters, setSearchParams]);

  /* -------------------------
     URL -> filters (sync for back/forward/manual edits)
     ------------------------- */
  useEffect(() => {
    const current = searchParams.toString();

    if (current !== lastAppliedSearch.current) {
      // This is a navigation event (back/forward or manual URL change)
      isNavigatingBack.current = true;
      lastAppliedSearch.current = current;

      const newFilters = parseFiltersFromURL(searchParams);
      setFilters(newFilters);

      // Reset the flag after a short delay to allow state updates to complete
      setTimeout(() => {
        isNavigatingBack.current = false;
      }, 100);
    }
  }, [searchParams]);

  /* -------------------------
     Cleanup: Reset navigation flag on unmount
     ------------------------- */
  useEffect(() => {
    return () => {
      isNavigatingBack.current = false;
    };
  }, []);

  /* -------------------------
     Handlers (memoized)
     ------------------------- */
  const handleFilterChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    },
    []
  );

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  /* -------------------------
     Build query for backend
     ------------------------- */
  const queryParams = useMemo(
    () => ({
      listingType: category,
      propertyType: (filters.propertyType || "").toLowerCase(),
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      minArea: filters.areaRange[0],
      maxArea: filters.areaRange[1],
      bedrooms: filters.rooms,
      location: (filters.location ?? "").split(",")[0],
      bathrooms: filters.bathrooms,
      facilities: filters.facilities ?? [],
      furnishing: filters.furnishing,
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
  const {
    data: properties = [],
    totalCount = 0,
    loading,
    error,
  } = useProperty(queryParams);

  const totalPages = Math.max(
    1,
    Math.ceil((totalCount || 0) / Math.max(1, filters.limit))
  );

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

      {/* List */}
      <PropertyCardListView
        properties={properties}
        totalCount={totalCount}
        loading={loading}
        error={error}
      />

      {/* Pagination */}
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
