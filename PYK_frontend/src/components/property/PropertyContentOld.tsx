import {
  MapPin,
  Home,
  Calendar,
  Bed,
  Bath,
  Square,
  TreePine,
  Car,
  CheckCircle,
  DollarSign,
  Calculator,
  FileText,
  Building,
  Dumbbell,
  Shield,
  Waves,
  Wifi,
} from "lucide-react";
import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { ContactForm } from "../home/ContactForm";
import { Card, CardContent } from "../ui/card";
import InfoCard from "./InfoCard";
import PropertyTabs from "./PropertyTabs";

import type { PropertyData, PropertyType } from "./PropertyCard.type";
interface PropertyDetailProps {
  mockProperty: PropertyData;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const amenityIcons: Record<string, any> = {
  "Swimming Pool": Waves,
  "Home Theater": Square,
  "Wine Cellar": Square,
  Gym: Dumbbell,
  "Smart Home": Wifi,
  "Security System": Shield,
};
const PropertyContentOld = ({
  mockProperty,
  activeTab,
  setActiveTab,
}: PropertyDetailProps) => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Property Header */}
      <Card className="border-0 shadow-xl bg-card">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground text-balance leading-tight">
                {mockProperty.title}
              </h1>
              <div className="flex items-center gap-3 mt-4 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm md:text-lg">
                  {mockProperty.location.city}
                </span>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">
                    {mockProperty.listingType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Built in {2025}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Stats */}
      <Card className="border-0 shadow-xl bg-card">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Property Details
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <InfoCard
              icon={<Bed className="h-5 w-5 text-primary" />}
              value={mockProperty.bedrooms}
              label="Bedrooms"
            />
            <InfoCard
              icon={<Bath className="h-5 w-5 text-primary" />}
              value={mockProperty.bathrooms}
              label="Bathrooms"
            />

            <InfoCard
              icon={<Square className="h-5 w-5 text-primary" />}
              value={mockProperty.areas.builtUp.toLocaleString()}
              label="m2 Ft"
            />

            {(mockProperty.propertyType === ("villa" as PropertyType) ||
              mockProperty.propertyType === ("twin-house" as PropertyType) ||
              mockProperty.propertyType === ("town-house" as PropertyType)) &&
              mockProperty.areas.land && (
                <InfoCard
                  icon={<TreePine className="h-5 w-5 text-primary" />}
                  value={mockProperty.areas.land!.toLocaleString()}
                  label="Land m2 Ft"
                />
              )}

            <InfoCard
              icon={<Car className="h-5 w-5 text-primary" />}
              value={2}
              label="Parking"
            />
            <InfoCard
              icon={<Calendar className="h-5 w-5 text-primary" />}
              value={2}
              label="Delivery Date"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-card">
        <CardContent className="p-8">
          {/* Tab Navigation */}
          <PropertyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-8 ">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  About This Property
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {mockProperty.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Premium Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockProperty.facilities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Square;
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-4 bg-blue/5 rounded-xl border border-blue/20"
                      >
                        <div className="p-2 bg-blue/10 rounded-lg">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">
                Property Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockProperty.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "financing" && (
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">
                Financing Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue/5 rounded-xl border border-blue/20">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-foreground">
                        Est. Monthly Payment
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {mockProperty.price.paymentPlan?.installments?.years ?? 0}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Principal & Interest
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-foreground">
                        Down Payment (20%)
                      </span>
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {mockProperty.price.paymentPlan?.downPayment}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-foreground">
                        Property Tax
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-foreground">
                        HOA Fees
                      </span>
                    </div>
                    <div className="text-xl font-bold text-foreground">
                      {22}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "master-plan" && (
            <TransformWrapper>
              <TransformComponent>
                <img
                  src={mockProperty.media.floorPlans[0]}
                  alt="master plan"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </TransformComponent>
            </TransformWrapper>
          )}
        </CardContent>
      </Card>

      {/* Location & Contact */}
      <Card className="border-0 shadow-xl bg-card">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Location & Contact
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                Property Location
              </h3>
              <div className="w-full h-96 bg-muted rounded-3xl overflow-hidden relative shadow-2xl border-2 border-primary/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733!2d-118.4!3d34.09!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzI0LjAiTiAxMTjCsDI0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-3xl"
                />
                <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-lg px-6 py-4 rounded-2xl border-2 border-primary/30 shadow-xl">
                  <div className="flex items-center gap-3 text-sm font-semibold">
                    <MapPin className="h-5 w-5 text-primary" />
                    {mockProperty.location.city}
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyContentOld;
