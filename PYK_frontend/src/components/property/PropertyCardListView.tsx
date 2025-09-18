import type { JSX } from "react";
import type { PropertyData } from "./PropertyCard.type";
import { PropertyCardNew } from "./PropertyCardNew";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";
interface PropertyCardListViewProps {
  properties: PropertyData[];
  loading: boolean;
  totalCount: number;
}
const PropertyCardListView = (
  props: PropertyCardListViewProps
): JSX.Element => {
  return (
    <section className="mt-40 flex flex-col items-center justify-center mx-auto max-w-7xl px-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Available Properties
          </h2>
          <p className="text-gray-600 text-center text-sm mt-1">
            {props.loading
              ? "Loading properties..."
              : props.properties.length > 0
              ? `Showing 1-${props.properties.length} of ${props.totalCount} properties`
              : "No properties available."}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 gap-8">
        {props.loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          : props.properties.map((property) => (
              <PropertyCardNew key={property.id} property={property} />
            ))}
      </div>
    </section>
  );
};

export default PropertyCardListView;
