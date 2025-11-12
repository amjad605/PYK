import type {
  PropertyData,
  PropertyFilters,
} from "@/components/property/PropertyCard.type";
import type { PropertiesResponse, SelectOption } from "@/lib/api";

// Mock property data
export const mockProperties: PropertyData[] = [
  {
    id: "1",
    title: "Luxury Villa in New Cairo",
    listingType: "primary",
    propertyType: "villa",
    price: {
      amount: 4000000,
      currency: "EGP",
    },
    location: {
      city: "cairo",
    },
    status: "available",
    bedrooms: 5,
    bathrooms: 4,
    areas: {
      builtUp: 450,
      land: 600,
      garden: 200,
    },

    developer: { name: "Palm Hills", id: "palm-hills" },
    compoundId: "palm-hills-new-cairo",

    facilities: ["Swimming Pool", "Gym", "Security", "Parking"],
    media: {
      images: ["/luxury-villa-exterior.png"],
      floorPlans: ["/villa-floor-plan.jpg"],
      videos: [],
    },
    description:
      "Stunning 5-bedroom villa with private garden and premium finishes",

    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    features: [],
  },
  {
    id: "1",
    title: "Luxury Villa in New Cairo",
    listingType: "primary",
    propertyType: "villa",
    price: {
      amount: 4000000,
      currency: "EGP",
    },
    location: {
      city: "cairo",
    },
    status: "available",
    bedrooms: 5,
    bathrooms: 4,
    areas: {
      builtUp: 450,
      land: 600,
      garden: 200,
    },

    developer: { name: "Palm Hills", id: "palm-hills" },
    compoundId: "palm-hills-new-cairo",

    facilities: ["Swimming Pool", "Gym", "Security", "Parking"],
    media: {
      images: ["/luxury-villa-exterior.png"],
      floorPlans: ["/villa-floor-plan.jpg"],
      videos: [],
    },
    description:
      "Stunning 5-bedroom villa with private garden and premium finishes",

    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    features: [],
  },
  {
    id: "1",
    title: "Luxury Villa in New Cairo",
    listingType: "primary",
    propertyType: "villa",
    price: {
      amount: 4000000,
      currency: "EGP",
    },
    location: {
      city: "cairo",
    },
    status: "available",
    bedrooms: 5,
    bathrooms: 4,
    areas: {
      builtUp: 450,
      land: 600,
      garden: 200,
    },

    developer: { name: "Palm Hills", id: "palm-hills" },
    compoundId: "palm-hills-new-cairo",

    facilities: ["Swimming Pool", "Gym", "Security", "Parking"],
    media: {
      images: ["/luxury-villa-exterior.png"],
      floorPlans: ["/villa-floor-plan.jpg"],
      videos: [],
    },
    description:
      "Stunning 5-bedroom villa with private garden and premium finishes",

    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    features: [],
  },
  {
    id: "1",
    title: "Luxury Villa in New Cairo",
    listingType: "primary",
    propertyType: "villa",
    price: {
      amount: 4000000,
      currency: "EGP",
    },
    location: {
      city: "cairo",
    },
    status: "available",
    bedrooms: 5,
    bathrooms: 4,
    areas: {
      builtUp: 450,
      land: 600,
      garden: 200,
    },

    developer: { name: "Palm Hills", id: "palm-hills" },
    compoundId: "palm-hills-new-cairo",

    facilities: ["Swimming Pool", "Gym", "Security", "Parking"],
    media: {
      images: ["/luxury-villa-exterior.png"],
      floorPlans: ["/villa-floor-plan.jpg"],
      videos: [],
    },
    description:
      "Stunning 5-bedroom villa with private garden and premium finishes",

    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    features: [],
  },
];

// Mock options data
export const mockDevelopers: SelectOption[] = [
  { value: "palm-hills", label: "Palm Hills" },
  { value: "capital-group", label: "Capital Group" },
  { value: "sodic", label: "SODIC" },
  { value: "emaar", label: "Emaar Misr" },
  { value: "mountain-view", label: "Mountain View" },
  { value: "hyde-park", label: "Hyde Park" },
  { value: "ora", label: "ORA Developers" },
];

export const mockCompounds: SelectOption[] = [
  { value: "palm-hills-new-cairo", label: "Palm Hills New Cairo" },
  { value: "capital-heights", label: "Capital Heights" },
  { value: "beverly-hills", label: "Beverly Hills" },
  { value: "dreamland", label: "Dreamland" },
  { value: "allegria", label: "Allegria" },
  { value: "madinaty", label: "Madinaty" },
  { value: "rehab-city", label: "Rehab City" },
];

export const mockCities: SelectOption[] = [
  { value: "new-cairo", label: "New Cairo" },
  { value: "cairo", label: "Cairo" },
  { value: "sheikh-zayed", label: "Sheikh Zayed" },
  { value: "new-administrative-capital", label: "New Administrative Capital" },
  { value: "maadi", label: "Maadi" },
  { value: "6th-october", label: "6th October" },
  { value: "zamalek", label: "Zamalek" },
  { value: "heliopolis", label: "Heliopolis" },
];

export const mockFacilities: SelectOption[] = [
  { value: "swimming-pool", label: "Swimming Pool" },
  { value: "gym", label: "Gym" },
  { value: "security", label: "Security" },
  { value: "parking", label: "Parking" },
  { value: "elevator", label: "Elevator" },
  { value: "kids-area", label: "Kids Area" },
  { value: "spa", label: "Spa" },
  { value: "concierge", label: "Concierge" },
  { value: "garden", label: "Garden" },
  { value: "balcony", label: "Balcony" },
];

// Mock API functions
export const mockPropertiesApi = {
  getProperties: async (
    filters: PropertyFilters & { page?: number; limit?: number }
  ): Promise<PropertiesResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    let filteredProperties = [...mockProperties];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProperties = filteredProperties.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.location.city.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.listingType) {
      filteredProperties = filteredProperties.filter(
        (p) => p.listingType === filters.listingType
      );
    }

    if (filters.propertyType) {
      filteredProperties = filteredProperties.filter(
        (p) => p.propertyType === filters.propertyType
      );
    }

    if (filters.city) {
      filteredProperties = filteredProperties.filter(
        (p) =>
          p.location.city.toLowerCase().replace(/\s+/g, "-") === filters.city
      );
    }

    if (filters.developer) {
      filteredProperties = filteredProperties.filter(
        (p) =>
          p.developer?.name?.toLowerCase().replace(/\s+/g, "-") ===
          filters.developer
      );
    }

    if (filters.minPrice) {
      filteredProperties = filteredProperties.filter(
        (p) => p.price.amount ?? 0 >= filters.minPrice!
      );
    }

    if (filters.maxPrice) {
      filteredProperties = filteredProperties.filter(
        (p) => p.price.amount ?? 0 <= filters.maxPrice!
      );
    }

    if (filters.minArea) {
      filteredProperties = filteredProperties.filter(
        (p) => p.areas.builtUp >= filters.minArea!
      );
    }

    if (filters.maxArea) {
      filteredProperties = filteredProperties.filter(
        (p) => p.areas.builtUp <= filters.maxArea!
      );
    }

    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(
        (p) => p.bedrooms === filters.bedrooms
      );
    }

    if (filters.bathrooms) {
      filteredProperties = filteredProperties.filter(
        (p) => p.bathrooms === filters.bathrooms
      );
    }

    if (filters.furnishing) {
      filteredProperties = filteredProperties.filter(
        (p) => p.furnishing === filters.furnishing
      );
    }

    if (filters.status) {
      filteredProperties = filteredProperties.filter(
        (p) => p.status === filters.status
      );
    }

    if (filters.facilities && filters.facilities.length > 0) {
      filteredProperties = filteredProperties.filter((p) =>
        filters.facilities!.every((facility) =>
          p.facilities?.includes(facility)
        )
      );
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    return {
      properties: paginatedProperties,
      pagination: {
        page,
        limit,
        total: filteredProperties.length,
        totalPages: Math.ceil(filteredProperties.length / limit),
      },
    };
  },

  createProperty: async (
    property: Omit<PropertyData, "id" | "createdAt" | "updatedAt">
  ): Promise<PropertyData> => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newProperty: PropertyData = {
      ...property,
      id: Date.now().toString(),
    };

    mockProperties.unshift(newProperty);
    return newProperty;
  },

  updateProperty: async (
    id: string,
    updates: Partial<PropertyData>
  ): Promise<PropertyData> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const index = mockProperties.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }

    const updatedProperty = {
      ...mockProperties[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    mockProperties[index] = updatedProperty;
    return updatedProperty;
  },

  deleteProperty: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const index = mockProperties.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Property not found");
    }

    mockProperties.splice(index, 1);
  },
};

export const mockOptionsApi = {
  getDevelopers: async (search?: string): Promise<SelectOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!search) return mockDevelopers;

    const searchLower = search.toLowerCase();
    return mockDevelopers.filter((dev) =>
      dev.label.toLowerCase().includes(searchLower)
    );
  },

  getCompounds: async (search?: string): Promise<SelectOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!search) return mockCompounds;

    const searchLower = search.toLowerCase();
    return mockCompounds.filter((compound) =>
      compound.label.toLowerCase().includes(searchLower)
    );
  },

  getCities: async (search?: string): Promise<SelectOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!search) return mockCities;

    const searchLower = search.toLowerCase();
    return mockCities.filter((city) =>
      city.label.toLowerCase().includes(searchLower)
    );
  },

  getFacilities: async (search?: string): Promise<SelectOption[]> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!search) return mockFacilities;

    const searchLower = search.toLowerCase();
    return mockFacilities.filter((facility) =>
      facility.label.toLowerCase().includes(searchLower)
    );
  },
};
