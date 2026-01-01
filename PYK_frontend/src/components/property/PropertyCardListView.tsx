import type { JSX } from "react";
import type { PropertyData } from "@/types/property";
import PropertyCard from "../notUsed/PropertyCard";
import PropertyCardSkeletonOld from "../notUsed/PropertyCardSkeletonOld";

interface PropertyCardListViewProps {
  properties: PropertyData[];
  loading: boolean;
  totalCount: number;
  // New props for sorting
  currentSort: string;
  onSortChange: (value: string) => void;
  sortOptions: { label: string; value: string }[];
}

const PropertyCardListView = ({
  properties,
  loading,
  totalCount,
  currentSort,
  onSortChange,
  sortOptions,
}: PropertyCardListViewProps): JSX.Element => {
  return (
    <section className="mt-40 mx-auto max-w-7xl px-4 md:px-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-stone-200">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl  font-semibold text-stone-900">
            Available Properties
          </h2>
          <p className="text-stone-500 text-sm mt-1">
            {loading
              ? "Updating results..."
              : `Showing ${properties.length} of ${totalCount} properties`}
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-sm font-medium text-stone-600 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort"
            value={currentSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-white border border-stone-300 text-stone-900 text-sm rounded-lg focus:ring-gold-500 focus:border-gold-500 block w-full p-2.5 outline-none transition-all cursor-pointer hover:border-stone-400"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Section */}
      {properties.length === 0 && !loading ? (
        <div className="py-20 text-center">
          <p className="text-stone-400 text-lg">No properties match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
              <PropertyCardSkeletonOld key={`skeleton-${index}`} />
            ))
            : properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
        </div>
      )}
    </section>
  );
};

export default PropertyCardListView;