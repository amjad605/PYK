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
    downPayment?: string;
    installments?: {
      year?: number;
      frequency: "monthly" | "quarterly" | "yearly";
    };
  };
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
}
export type Status = "active" | "sold" | "rented" | "inactive" | "pending";
export interface PropertyFormData {
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
  features?: string[];
}
