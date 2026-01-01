import { PropertyLocation } from "../property/property.type";
import { AppError } from "./AppError";
export interface LocationArea {
  label: string; // "Nasr City"
  value: string; // "nasercity"
}

export interface CityLocations {
  city: {
    label: string; // "Cairo"
    value: string; // "cairo"
  };
  areas: LocationArea[];
}

export const EGYPT_LOCATIONS: CityLocations[] = [
  {
    city: { label: "Cairo", value: "cairo" },
    areas: [
      { label: "Nasr City", value: "nasercity" },
      { label: "Heliopolis", value: "heliopolis" },
      { label: "Maadi", value: "maadi" },
      { label: "New Cairo", value: "newcairo" },
      { label: "Zamalek", value: "zamalek" },
    ],
  },
  {
    city: { label: "Giza", value: "giza" },
    areas: [
      { label: "Dokki", value: "dokki" },
      { label: "Mohandessin", value: "mohandessin" },
      { label: "6th of October", value: "6thofoctober" },
      { label: "Sheikh Zayed", value: "sheikhzayed" },
    ],
  },
];

const VALID_LOCATIONS = new Map<string, Set<string>>(
  EGYPT_LOCATIONS.map((c) => [
    c.city.value,
    new Set(c.areas.map((a) => a.value)),
  ])
);

export const validateLocation = (location?: PropertyLocation) => {
  if (!location) return;

  const { city, district } = location;

  if (!VALID_LOCATIONS.has(city)) {
    throw new AppError(`Invalid city: ${city}`, 400);
  }

  if (district && !VALID_LOCATIONS.get(city)!.has(district)) {
    throw new AppError(
      `Invalid district "${district}" for city "${city}"`,
      400
    );
  }
};
