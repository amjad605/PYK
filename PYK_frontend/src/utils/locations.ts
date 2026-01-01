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
      { label: "New Cairo", value: "New Cairo" },
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
