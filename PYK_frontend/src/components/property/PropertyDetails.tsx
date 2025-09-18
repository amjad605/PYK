"use client";

import type React from "react";
import { useState } from "react";

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
  Calendar,
  Home,
  DollarSign,
  Shield,
  Building,
  TreePine,
  Calculator,
  FileText,
  CheckCircle,
  ArrowRight,
  Info,
} from "lucide-react";
import Nav from "../common/Nav";
import { ContactForm } from "../home/ContactForm";
import PropertyTabs from "./PropertyTabs";
import type { PropertyData, PropertyType } from "./PropertyCard.type";
import { ImageCarousel } from "./ImageCarousel";
import { useLocation } from "react-router-dom";
import InfoCard from "./InfoCard";
import ImageSlider from "./ImageSlider";
import RowImageBars from "./RowImageBar";
import { PropertyDetailContent } from "./PropertyDetailsContent";

export default function PropertyDetails() {
  const location = useLocation();
  const mockProperty: PropertyData = location.state.property;
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
    <div className="min-h-screen  bg-background">
      {/* Header */}

      <div className="bg-blue h-17">
        <Nav />
      </div>
      {/* Hero Image Section */}

      <RowImageBars images={mockProperty.media.images} />

      {/* Content */}
      <PropertyDetailContent property={mockProperty} />
      {/* Bottom CTA */}
    </div>
  );
}
