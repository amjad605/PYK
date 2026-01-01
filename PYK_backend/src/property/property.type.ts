import { Request } from "express";
import { Types } from "mongoose";
export type PropertyFilters = {
  minPrice?: string;
  maxPrice?: string;
  minArea?: string;
  maxArea?: string;
  bedrooms?: string;
  bathrooms?: string;
  furnishing?: "furnished" | "semi-furnished" | "unfurnished";
  listingType?: "resale" | "primary" | "rent";
  propertyType?: "apartment" | "villa" | "studio" | "duplex";
  location?: string;
  compound?: string;
  facilities?: string[];

  // pagination
  page?: string;
  limit?: string;
};

export type PropertyFilterRequest = Request<
  {}, // params
  {}, // response
  {}, // body
  PropertyFilters // query
>;
export type ParsedPropertyFilters = {
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnishing?: "furnished" | "semi-furnished" | "unfurnished";
  listingType?: "resale" | "primary" | "rent";
  propertyType?: "apartment" | "villa" | "studio" | "duplex";
  location?: string;
  compound?: string;
  facilities?: string[];
  search?: string;
  // pagination
  sortBy?: "price" | "createdAt" | "area";
  sortOrder?: "asc" | "desc";

  page: number;
  limit: number;
};

export type ListingType = "primary" | "resale" | "rent";
export type Finishing =
  | "finished"
  | "semi-finished"
  | "core-shell"
  | "red-brick"
  | "luxury-finished";
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
  | "typical"
  | "roof"
  | "duplex-lower"
  | "duplex-upper";

export interface Price {
  currency: string;
  amount?: number; // for sale (primary/resale)
  monthlyRent?: number; // for rent
  paymentPlan?: {
    // for primary
    downPayment: number;
    installments: {
      years: number;
      frequency: "monthly" | "quarterly" | "yearly";
    };
  };
}

export interface RentDetails {
  leaseTerm: string;
  deposit: number; // in months
  furnished: boolean;
  utilitiesIncluded: boolean;
}
export interface Areas {
  builtUp: number;
  land?: number;
  total?: number;
  garden?: number;
  terrace?: number;
  roof?: number;
}
export interface PropertyLocation {
  city: string;
  district?: string;
}
export interface DeveloperRef {
  id: Types.ObjectId;
  name: string;
}
export interface Owner {
  name: string;
  contact: { phone: string; email: string };
}
export interface Media {
  images: string[];

  floorPlans: string[];
}
