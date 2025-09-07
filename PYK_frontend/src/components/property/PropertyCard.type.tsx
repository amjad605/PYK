export interface Property {
  id: number;
  title: string;
  type?: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  imageUrl: string;
  category: "rent" | "resale" | "primary";
}
