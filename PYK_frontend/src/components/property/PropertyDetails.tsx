"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { Card, CardContent } from "@/components/ui/card";
import image from "../../assets/cozy-family-duplex.png";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Wifi,
  Dumbbell,
  Waves,
  ArrowLeft,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Mail,
  User,
  Calendar,
  MessageSquare,
  ChevronDown,
  Home,
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  Star,
  Building,
  TreePine,
  Utensils,
  GraduationCap,
  ShoppingBag,
  Stethoscope,
  Calculator,
  FileText,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Nav from "../common/Nav";
import { ContactForm } from "../home/ContactForm";
import PropertyTabs from "./PropertyTabs";

interface PropertyData {
  id: string;
  title: string;
  price: string;
  pricePerSqft: string;
  location: string;
  address: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSize: number;
  parking: number;
  yearBuilt: number;
  mlsNumber: string;
  images: string[];
  amenities: string[];
  description: string;
  propertyHistory: Array<{
    date: string;
    event: string;
    price: string;
  }>;
  neighborhood: {
    walkScore: number;
    schools: Array<{ name: string; rating: number; type: string }>;
    nearby: Array<{ name: string; distance: string; type: string }>;
  };
  financials: {
    monthlyPayment: string;
    downPayment: string;
    propertyTax: string;
    hoaFees: string;
  };
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
    license: string;
    experience: string;
  };
}

const mockProperty: PropertyData = {
  id: "MLS-2024-001847",
  title: "Luxurious Modern Villa with Panoramic Views",
  price: "$2,850,000",
  pricePerSqft: "$891",
  location: "Beverly Hills, CA 90210",
  address: "1247 Hillcrest Drive, Beverly Hills, CA 90210",
  type: "Single Family Home",
  status: "Active",
  bedrooms: 5,
  bathrooms: 4,
  area: 3200,
  lotSize: 8500,
  parking: 3,
  yearBuilt: 2019,
  mlsNumber: "BH24001847",
  images: [image, image, image, image, image, image],
  amenities: [
    "Swimming Pool",
    "Home Theater",
    "Wine Cellar",
    "Gym",
    "Smart Home",
    "Security System",
  ],
  description:
    "Experience unparalleled luxury in this stunning contemporary masterpiece featuring panoramic city and ocean views. This architectural gem boasts premium finishes throughout, including Italian marble, custom millwork, and state-of-the-art smart home technology. The open-concept design seamlessly blends indoor and outdoor living with floor-to-ceiling windows and multiple terraces. Perfect for entertaining with a gourmet kitchen, wine cellar, and resort-style backyard with infinity pool.",
  propertyHistory: [
    { date: "2024-01-15", event: "Listed for Sale", price: "$2,850,000" },
    { date: "2019-06-20", event: "Last Sold", price: "$2,200,000" },
    { date: "2018-03-10", event: "Construction Completed", price: "N/A" },
  ],
  neighborhood: {
    walkScore: 78,
    schools: [
      {
        name: "Beverly Hills High School",
        rating: 9,
        type: "Public High School",
      },
      { name: "Hawthorne Elementary", rating: 10, type: "Public Elementary" },
      { name: "Beverly Hills Prep", rating: 8, type: "Private School" },
    ],
    nearby: [
      { name: "Rodeo Drive", distance: "0.8 miles", type: "Shopping" },
      { name: "Beverly Gardens Park", distance: "0.5 miles", type: "Park" },
      {
        name: "Cedars-Sinai Medical Center",
        distance: "2.1 miles",
        type: "Hospital",
      },
      {
        name: "The Beverly Hills Hotel",
        distance: "1.2 miles",
        type: "Dining",
      },
    ],
  },
  financials: {
    monthlyPayment: "$11,847",
    downPayment: "$570,000",
    propertyTax: "$28,500/year",
    hoaFees: "$450/month",
  },
  features: [
    "Panoramic City Views",
    "Gourmet Kitchen",
    "Master Suite with Balcony",
    "Home Office",
    "3-Car Garage",
    "Infinity Pool & Spa",
    "Outdoor Kitchen",
    "Wine Cellar",
    "Home Theater",
    "Smart Home System",
    "Security System",
    "Hardwood Floors",
  ],
  agent: {
    name: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@luxuryrealty.com",
    image: "/real-estate-agent-headshot.png",
    license: "DRE #01234567",
    experience: "15+ years",
  },
};

const amenityIcons: Record<string, any> = {
  "Swimming Pool": Waves,
  "Home Theater": Square,
  "Wine Cellar": Square,
  Gym: Dumbbell,
  "Smart Home": Wifi,
  "Security System": Shield,
};

const nearbyIcons: Record<string, any> = {
  Shopping: ShoppingBag,
  Park: TreePine,
  Hospital: Stethoscope,
  Dining: Utensils,
  School: GraduationCap,
};

export default function PropertyDetails() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
    preferredDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <div className="bg-black h-17">
        <Nav />
      </div>
      {/* Hero Image Section */}
      <div className="relative h-[65vh] overflow-hidden">
        <img
          src={mockProperty.images[currentImageIndex] || "/placeholder.svg"}
          alt={mockProperty.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div
          onClick={() => {
            if (currentImageIndex > 0) {
              setCurrentImageIndex(currentImageIndex - 1);
            }
          }}
          className="absolute top-1/2 left-6 cursor-pointer bg-gray-200/70 rounded-full p-2 "
        >
          <ArrowLeft />
        </div>
        <div
          onClick={() => {
            if (currentImageIndex < mockProperty.images.length - 1) {
              setCurrentImageIndex(currentImageIndex + 1);
            }
          }}
          className="absolute top-1/2 right-6 cursor-pointer bg-gray-200/70 rounded-full p-2 "
        >
          <ArrowRight />
        </div>
        {/* Image Navigation */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {mockProperty.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-110"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Property Status Badge */}
        <div className="absolute top-6 left-6"></div>

        {/* MLS Number */}
        <div className="absolute top-6 right-6"></div>

        {/* Price Overlay */}
        <div className="absolute bottom-6 left-6">
          <div className="bg-background/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-border shadow-xl">
            <div className="text-3xl font-bold text-primary">
              {mockProperty.price}
            </div>
            <div className="text-sm text-muted-foreground">
              {mockProperty.pricePerSqft} per sq ft
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Property Header */}
        <Card className="border-0 shadow-xl bg-card">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground text-balance leading-tight">
                  {mockProperty.title}
                </h1>
                <div className="flex items-center gap-3 mt-4 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-lg">{mockProperty.address}</span>
                </div>
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      {mockProperty.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">
                      Built in {mockProperty.yearBuilt}
                    </span>
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
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Bed className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProperty.bedrooms}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Bedrooms
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Bath className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProperty.bathrooms}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Bathrooms
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Square className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProperty.area.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Sq Ft
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <TreePine className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProperty.lotSize.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Lot Sq Ft
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProperty.parking}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Parking
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/20">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {mockProperty.yearBuilt}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Year Built
                  </div>
                </div>
              </div>
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
                    {mockProperty.amenities.map((amenity) => {
                      const IconComponent = amenityIcons[amenity] || Square;
                      return (
                        <div
                          key={amenity}
                          className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/20"
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
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

            {activeTab === "history" && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Property History
                </h3>
                <div className="space-y-4">
                  {mockProperty.propertyHistory.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {event.event}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {event.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {event.price}
                      </div>
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
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-foreground">
                          Est. Monthly Payment
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {mockProperty.financials.monthlyPayment}
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
                        {mockProperty.financials.downPayment}
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
                      <div className="text-xl font-bold text-foreground">
                        {mockProperty.financials.propertyTax}
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
                        {mockProperty.financials.hoaFees}
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
                    src="https://elbayt.com/assets/uploads/images/29319/311bbcbb424f23e919bb542352c22471/masterplan--the-square-new-cairo-al-ahly-sabbour1jpg.jpg"
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
                      {mockProperty.location}
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA */}
    </div>
  );
}
