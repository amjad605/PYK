interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
}

interface BaseProperty {
  id: string;
  title: string;
  description?: string;
  price: number;
  sizeSqm: number;
  bedrooms?: number;
  bathrooms?: number;
  status: "available" | "sold" | "rented";
  listedAt: Date;
  updatedAt?: Date;
  address: Address;
  images?: string[];
  ownerId: string;
}

enum SaleType {
  Primary = "PRIMARY",
  Resale = "RESALE",
}

interface PrimaryProperty extends BaseProperty {
  saleType: SaleType.Primary;
}

interface ResaleProperty extends BaseProperty {
  saleType: SaleType.Resale;
  downPayment: number; // mandatory for resale
}
type Property = PrimaryProperty | ResaleProperty;
