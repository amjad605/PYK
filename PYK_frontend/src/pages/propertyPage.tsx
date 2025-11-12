"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import PropertyCard from "@/components/notUsed/PropertyCard";
import type { Property } from "@/components/property/PropertyCard.type";
import image from "../assets/cozy-family-duplex.png";
import Nav from "@/components/common/Nav";
import bg2 from "../assets/IMG_4024.jpg";
const unitTypes = [
  { id: "townhouse", label: "Townhouse middle", checked: false },
  { id: "standalone", label: "Standalone", checked: false },
  { id: "apartment", label: "Apartment", checked: false },
  { id: "duplex", label: "Duplex", checked: false },
  { id: "penthouse", label: "Penthouse", checked: false },
];

const locations = [
  "Elshour city",
  "Sheikh Zayed city",
  "Ras sedr",
  "Marassh",
  "New Heliopolis",
];

const projects = [
  "Talata",
  "Sarai",
  "Hajar",
  "Latin City",
  "Latin Settlement (SEC)",
];

const developers = [
  "MNHD",
  "Mountain View",
  "Palm Hills",
  "SEO",
  "Better Home",
];

const properties: Property[] = [
  {
    id: 1,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 2,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 3,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 4,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 5,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 6,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 7,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
  {
    id: 8,
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    price: "2500000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "4500",
    imageUrl: image,
    category: "resale",
  },
];
export default function PropertyListing() {
  const [priceRange, setPriceRange] = useState([500000, 50000000]);
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div
        className="relative h-50  bg-cover bg-center"
        style={{
          backgroundImage: `url("${bg2}")`,
        }}
      >
        <Nav />
      </div>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-6">Filters</h2>

          {/* Unit Types */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Unit Types</h3>
            <div className="space-y-3">
              {unitTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox id={type.id} />
                  <label htmlFor={type.id} className="text-sm text-gray-700">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Number of rooms */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Number of rooms</h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, "5+"].map((num) => (
                <Button
                  key={num}
                  variant={selectedRooms === num ? "default" : "outline"}
                  size="sm"
                  className="w-10 h-10 rounded-full"
                  onClick={() =>
                    setSelectedRooms(
                      selectedRooms === num ? null : (num as number)
                    )
                  }
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Price Range</h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={50000000}
              min={500000}
              step={100000}
              className="mb-4"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{priceRange[0].toLocaleString()}</span>
              <span>{priceRange[1].toLocaleString()}</span>
            </div>
          </div>

          {/* Locations */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Locations</h3>
            <div className="space-y-3">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox id={location} />
                  <label htmlFor={location} className="text-sm text-gray-700">
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Projects</h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project} className="flex items-center space-x-2">
                  <Checkbox id={project} />
                  <label htmlFor={project} className="text-sm text-gray-700">
                    {project}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Developers */}
          <div className="mb-8">
            <h3 className="font-medium mb-4">Developers</h3>
            <div className="space-y-3">
              {developers.map((developer) => (
                <div key={developer} className="flex items-center space-x-2">
                  <Checkbox id={developer} />
                  <label htmlFor={developer} className="text-sm text-gray-700">
                    {developer}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-20 ">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
