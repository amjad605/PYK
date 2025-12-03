"use client";
import Nav from "../common/Nav";

import type { PropertyData } from "@/types/property";
import { ImageCarousel } from "./ImageCarousel";
import { useLocation } from "react-router-dom";
import RowImageBars from "./RowImageBar";
import { PropertyDetailContent } from "./PropertyDetailsContent";
import { useIsMobile } from "@/hooks/useIsMobile";


export default function PropertyDetails() {
  const location = useLocation();
  const mockProperty: PropertyData = location.state.property;
  const isMobile = useIsMobile(768);

  return (
    <div className="min-h-screen  bg-background">
      {/* Header */}

      <div className="bg-blue h-17">
        <Nav />
      </div>
      {/* Hero Image Section
       */}
      {isMobile ? (
        <ImageCarousel images={mockProperty.media.images} />
      ) : (
        <RowImageBars images={mockProperty.media.images} />
      )}
      {/* Content */}
      <PropertyDetailContent property={mockProperty} />

      {/* Bottom CTA */}
    </div>
  );
}
