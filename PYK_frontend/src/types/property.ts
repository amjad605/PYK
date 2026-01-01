export type ListingType = "primary" | "resale" | "rent";
export type Finishing =
  | "Core-Shell"
  | "Semi-Finished"
  | "Finished"
  | "Furnished";
export type PropertyType =
  | "Apartment"
  | "House"
  | "Villa"
  | "Townhouse"
  | "Twinhouse"
  | "Duplex"
  | "Penthouse"
  | "Studio"
  | "";

export type UnitLevel =
  | "ground"
  | "middle"
  | "roof"
  | "duplex-lower"
  | "duplex-upper";

export interface Price {
  currency: string;
  amount?: number; // for sale (primary/resale)
  monthlyRent?: number; // for rent
  paymentPlan?: {
    // for primary
    downPayment?: number;
    installments?: {
      years: number;
      frequency: "monthly" | "quarterly" | "yearly";
    };
  };
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}
export interface Areas {
  builtUp: number;
  land?: number;
  total?: number;
  garden?: number;
  terrace?: number;
  roof?: number;
}

export interface location {
  city: string;
  district?: string;
  compound?: string;
}

export interface DeveloperRef {
  name: string;
}

export interface Media {
  images: string[];
  floorPlans: string[];
  masterPlans: string[];
}
export type Status = "available" | "sold" | "rented" | "reserved" | "pending";
export interface PropertyData {
  id?: string;
  listingType: ListingType | "";
  propertyType: PropertyType | "";
  unitLevel?: UnitLevel | "";
  title: string;
  description?: string;
  status: Status;
  areas: Areas;
  price: Price;
  bedrooms?: number;
  bathrooms?: number;
  location: location;
  media: Media;
  developer?: DeveloperRef;
  finishing?: Finishing | "";
  hasGarden?: boolean;
  hasTerrace?: boolean;
  facilities?: string[];
  owner: string;
  deliveryDate?: string;
  features?: string[];
  rentDetails?: RentDetails;
  createdAt?: string;
  updatedAt?: string;
}
export interface RentDetails {
  leaseTerm?: string;
  deposit?: number;
  furnished?: boolean;
  utilitiesIncluded?: boolean;
}
export interface PropertyFilters {
  search?: string;
  listingType?: string;
  propertyType?: string;
  city?: string;
  compound?: string;
  developer?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnishing?: string;
  status?: string;
  facilities?: string[];
}
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
