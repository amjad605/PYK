export interface Property {
  _id: string;
  title: string;
  description?: string;
  listingType: "primary" | "resale" | "rent";
  propertyType: string;
  status: string;
  bedrooms?: number;
  bathrooms?: number;
  price: {
    currency: string;
    amount?: number;
    monthlyRent?: number;
  };
  areas: {
    builtUp: number;
    land?: number;
    garden?: number;
    terrace?: number;
  };
  location: {
    city: string;
    district?: string;
  };
  media: { images: string[] };
  facilities: string[];
}
export type ListingType = "primary" | "resale" | "rent";
export type PropertyType =
  | "apartment"
  | "villa"
  | "townhouse"
  | "twin_house"
  | "duplex"
  | "penthouse"
  | "studio";

export type UnitLevel =
  | "ground"
  | "middle"
  | "roof"
  | "duplex-lower"
  | "duplex-upper";

export type Status = "available" | "sold" | "rented" | "reserved";

export type Furnishing = "furnished" | "semi-furnished" | "unfurnished";

export type Finishing =
  | "finished"
  | "semi-finished"
  | "core-shell"
  | "red-brick"
  | "luxury-finished";

export interface Areas {
  builtUp: number;
  land?: number;
  total?: number;
  garden?: number;
  terrace?: number;
  roof?: number;
}

export interface Price {
  currency: string;
  amount?: number;
  monthlyRent?: number;
  paymentPlan?: {
    downPayment?: number;
    installments?: {
      years?: number;
      frequency?: "monthly" | "quarterly" | "yearly";
    };
  };
}

export interface Location {
  city: string;
  district?: string;
  compound?: string;
  geo?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
}

export interface Media {
  images: string[];
  videos: string[];
  floorPlans?: string[];
}

export interface Developer {
  id?: string;
  name?: string;
}

export interface Owner {
  name?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
}

export interface RentDetails {
  leaseTerm?: string;
  deposit?: number;
  furnished?: boolean;
  utilitiesIncluded?: boolean;
}

export interface PropertyData {
  id: string;
  listingType: ListingType;
  propertyType: PropertyType;
  unitLevel?: UnitLevel;
  title: string;
  description?: string;
  status: Status;
  areas: Areas;
  price: Price;
  bedrooms?: number;
  bathrooms?: number;
  facilities: string[];
  features: string[];
  location: Location;
  compoundId?: string;
  media: Media;
  developer?: Developer;
  deliveryDate?: string;
  owner?: Owner;
  furnishing?: Furnishing;
  finishing?: Finishing;
  rentDetails?: RentDetails;
  createdAt?: string;
  updatedAt?: string;
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
