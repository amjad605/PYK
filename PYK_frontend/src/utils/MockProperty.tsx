// mockProperty.ts
export const mockProperty = {
  _id: "66c1234567890abcd1234567",
  listingType: "resale",
  propertyType: "apartment",
  unitLevel: "middle",
  title: "Modern Apartment in New Cairo",
  description:
    "A beautiful 3-bedroom apartment with a spacious terrace in the heart of New Cairo.",
  status: "available",
  areas: {
    builtUp: 180,
    land: 0,
    total: 180,
    garden: 0,
    terrace: 20,
    roof: 0,
  },
  price: {
    currency: "USD",
    amount: 250000,
    monthlyRent: null,
    paymentPlan: {
      downPayment: 50000,
      installments: {
        years: 5,
        frequency: "yearly",
      },
    },
  },
  bedrooms: 3,
  bathrooms: 2,
  facilities: ["Parking", "Elevator", "Security", "Swimming Pool"],
  location: {
    city: "Cairo",
    district: "New Cairo",
    compound: "Palm Hills",
    geo: { type: "Point", coordinates: [31.2357, 30.0444] },
  },
  media: {
    images: [
      "https://picsum.photos/800/400?random=1",
      "https://picsum.photos/800/400?random=2",
      "https://picsum.photos/800/400?random=3",
    ],
    videos: [],
    floorPlans: ["https://picsum.photos/600/400?random=10"],
  },
  developer: {
    id: "66cdev12345",
    name: "Palm Hills Developments",
  },
  deliveryDate: "2026-12-01T00:00:00.000Z",
  owner: {
    name: "Ahmed Hassan",
    contact: { phone: "+201234567890", email: "ahmed@example.com" },
  },
  furnishing: "semi-furnished",
  finishing: "luxury-finished",
  rentDetails: null,
  createdAt: "2025-09-01T10:00:00.000Z",
  updatedAt: "2025-09-01T10:00:00.000Z",
};
