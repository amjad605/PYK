"use client";

import { useEffect, useState } from "react";
import type { PropertyData } from "@/types/property";
import PropertyDetailsHeaderCard from "./PropertyDetailsHeaderCard";
import PropertyDetailsInfoCard from "./propertyDetailsInfoCard";
import PropertyDetailsFacilitiesAndFeatureCard from "./PropertyDetailsFacilitiesAndFeatureCard";
import PropertyDetailsContactCard from "./PropertyDetailsContactCard";

interface PropertyDetailProps {
  property: PropertyData;
}
export function PropertyDetailContent({ property }: PropertyDetailProps) {
  const [isScrolled, setIsScrolled] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY < 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Sticky Header Card */}
        {<PropertyDetailsHeaderCard property={property} isScrolled={isScrolled} />}
        {/* Main Content */}
        <div className="py-6 space-y-6">
          {/* Property Details Section */}
          <PropertyDetailsInfoCard property={property} />
          {/* Facilities & Features */}
          <PropertyDetailsFacilitiesAndFeatureCard property={property} />
          {/* Contact Section */}
          <PropertyDetailsContactCard property={property} />
        </div>
      </div>
    </div>
  );
}