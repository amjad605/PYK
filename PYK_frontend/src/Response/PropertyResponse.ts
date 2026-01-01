export interface ApiProperty {
  _id: string;

  listingType: string; // "primary" | "resale" | "rent"
  propertyType: string; // matches your PropertyType union
  unitLevel?: string;

  title: string;
  description?: string;
  status: string;

  areas?: {
    builtUp: number;
    land?: number;
    total?: number;
    garden?: number;
    terrace?: number;
    roof?: number;
  };

  price?: {
    currency: string;
    amount?: number;
    monthlyRent?: number;
    paymentPlan?: {
      downPayment?: number;
      installments?: {
        years?: number; // API uses "years"
        frequency: "monthly" | "quarterly" | "yearly";
      };
    };
  };

  bedrooms?: number;
  bathrooms?: number;

  facilities?: string[];
  features?: string[];

  location?: {
    city: string;
    district?: string;
    compound?: string;
  };

  media?: {
    images?: string[];
    floorPlans?: string[];
  };

  developer?: {
    id?: string;
    name: string;
  };

  deliveryDate?: string;

  owner?: {
    name: string;
    contact?: {
      phone?: string;
      email?: string;
    };
  };

  finishing?: string;

  rentDetails?: {
    leaseTerm?: string;
    deposit?: number;
    furnished?: boolean;
    utilitiesIncluded?: boolean;
  };

  createdAt?: string;
  updatedAt?: string;
}
