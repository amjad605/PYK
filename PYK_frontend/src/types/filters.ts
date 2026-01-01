import type { DateRange, Finishing, PropertyType } from "./property";

export type FiltersType = {
  propertyType: PropertyType;
  location: string | null;
  priceRange: [number | null, number | null];
  areaRange: [number | null, number | null];
  rooms: number | null;
  bathrooms: number | null;
  facilities: string[];
  finishing: null | Finishing;
  contractDuration: string | null;
  dateRange: DateRange;
  page: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  keyword?: string;
  limit: number;
};
