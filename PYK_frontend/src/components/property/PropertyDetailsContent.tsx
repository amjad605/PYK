"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronDown,
  ChevronUp,
  Home,
  Car,
  Wifi,
  Shield,
  Waves,
  Trees,
  Building,
  Sparkles,
  LandPlot,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PropertyData } from "@/components/property/PropertyCard.type";
import { divIcon } from "leaflet";
import { Calendar } from "../ui/calendar";
function calculateInstallment(price: Price): number | null {
  if (!price.amount || !price.paymentPlan) return null;

  const remainingAmount = price.amount - price.paymentPlan.downPayment;
  const { years, frequency } = price.paymentPlan.installments;

  let totalInstallments = 0;

  switch (frequency) {
    case "monthly":
      totalInstallments = years * 12;
      break;
    case "quarterly":
      totalInstallments = years * 4;
      break;
    case "yearly":
      totalInstallments = years;
      break;
  }

  return remainingAmount / totalInstallments;
}
interface PropertyDetailProps {
  property: PropertyData;
}

const statusColors = {
  available: "bg-blue-50 text-blue-700 border-blue-200",
  sold: "bg-slate-50 text-slate-700 border-slate-200",
  rented: "bg-blue-50 text-blue-700 border-blue-200",
  reserved: "bg-sky-50 text-sky-700 border-sky-200",
};

const propertyTypeLabels = {
  apartment: "Apartment",
  villa: "Villa",
  townhouse: "Townhouse",
  twin_house: "Twin House",
  duplex: "Duplex",
  penthouse: "Penthouse",
  studio: "Studio",
};

const finishingLabels = {
  finished: "Finished",
  "semi-finished": "Semi-Finished",
  "core-shell": "Core & Shell",
  "red-brick": "Red Brick",
  "luxury-finished": "Luxury Finished",
};

const furnishingLabels = {
  furnished: "Furnished",
  "semi-furnished": "Semi-Furnished",
  unfurnished: "Unfurnished",
};

const facilityIcons: Record<string, any> = {
  parking: Car,
  wifi: Wifi,
  security: Shield,
  pool: Waves,
  garden: Trees,
  gym: Home,
};

export function PropertyDetailContent({ property }: PropertyDetailProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY < 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatArea = (area: number) => {
    return `${area.toLocaleString()} m²`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Sticky Header Card */}
        <div className="sticky top-0 z-20 pt-4 pb-2 ">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-0  bg-white/70 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-balance bg-blue bg-clip-text text-transparent">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm md:text-base">
                        {property.location.compound &&
                          `${property.location.compound}, `}
                        {property.location.district &&
                          `${property.location.district}, `}
                        {property.location.city}
                      </span>
                    </div>
                  </div>
                  <div className="flex md:flex-col flex-row gap-2 items-end">
                    <div className="text-center">
                      {property.price.amount && (
                        <div>
                          <p className="text-2xl md:text-3xl text-black font-bold">
                            {formatPrice(
                              property.price.amount,
                              property.price.currency
                            )}
                          </p>
                          {property.listingType === "rent" &&
                            property.price.monthlyRent && (
                              <p className="text-blue-600 text-sm">
                                {formatPrice(
                                  property.price.monthlyRent,
                                  property.price.currency
                                )}
                                /month
                              </p>
                            )}
                        </div>
                      )}
                      {property.listingType === "rent" &&
                        property.price.monthlyRent &&
                        !property.price.amount && (
                          <p className="text-2xl md:text-3xl font-bold text-blue-700">
                            {formatPrice(
                              property.price.monthlyRent,
                              property.price.currency
                            )}
                            /month
                          </p>
                        )}
                    </div>
                    <Badge
                      className={cn(
                        "capitalize text-xs px-3 py-1 border",
                        statusColors[property.status]
                      )}
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {property.status}
                    </Badge>
                  </div>
                </div>
                <AnimatePresence>
                  {isScrolled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-4 gap-4 pt-4 mt-4 border-t border-blue-100">
                        {property.bedrooms && (
                          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                            <Bed className="h-4 w-4 text-blue-600" />
                            <span className="text-sm md:text-md font-bold text-blue-900">
                              {property.bedrooms}
                            </span>
                            <span className="text-xs text-slate-600">
                              Bedrooms
                            </span>
                          </div>
                        )}
                        {property.bathrooms && (
                          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                            <Bath className="h-4 w-4 text-blue-600" />
                            <span className="text-sm md:text-md  font-bold text-blue-900">
                              {property.bathrooms}
                            </span>
                            <span className="text-xs text-slate-600">
                              Bathrooms
                            </span>
                          </div>
                        )}
                        {property.areas.total ? (
                          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                            <Home className="h-4 w-4 text-blue-600" />
                            <span className="text-sm md:text-md font-bold text-blue-900">
                              {formatArea(property.areas.total)}
                            </span>
                            <span className="text-xs text-slate-600">
                              Total Area
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-blue-50">
                          <Square className="h-4 w-4 text-blue-600" />
                          <span className="text-sm md:text-md  font-bold text-blue-900">
                            {formatArea(property.areas.builtUp)}
                          </span>
                          <span className="text-xs text-slate-600">
                            Built-up
                          </span>
                        </div>
                        {property.areas.land ? (
                          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                            <LandPlot className="h-4 w-4 text-blue-600" />
                            <span className="text-sm md:text-md  font-bold text-blue-900">
                              {formatArea(property.areas.land)}
                            </span>
                            <span className="text-xs text-slate-600">
                              Land Area
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                        {property.areas.garden ? (
                          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                            <Trees className="h-4 w-4 text-blue-600" />
                            <span className="text-sm md:text-md  font-bold text-blue-900">
                              {formatArea(property.areas.garden)}
                            </span>
                            <span className="text-xs text-slate-600">
                              Garden Area
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                        {property.areas.terrace ? (
                          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-blue-50">
                            <Home className="h-4 w-4 text-blue-600" />
                            <span className="text-lg font-bold text-blue-900">
                              {formatArea(property.areas.terrace)}
                            </span>
                            <span className="text-xs text-slate-600">
                              Terras Area
                            </span>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="py-6 space-y-6">
          {/* Property Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.0 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-blue flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Property Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Property Details Table */}
                <div className="overflow-hidden rounded-xl border border-blue-100">
                  <table className="w-full">
                    <tbody className="divide-y divide-blue-50">
                      <tr className="bg-blue-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-600">
                          Property Type
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-blue-700">
                          {propertyTypeLabels[property.propertyType]}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-slate-600">
                          Listing Type
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900 capitalize">
                          {property.listingType}
                        </td>
                      </tr>
                      {property.finishing && (
                        <tr className="bg-blue-50">
                          <td className="px-4 py-3 text-sm font-medium text-slate-600">
                            Finishing
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-blue-700">
                            {finishingLabels[property.finishing]}
                          </td>
                        </tr>
                      )}

                      {property.deliveryDate && (
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-slate-600">
                            Delivery Date
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-slate-900 flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            {new Date(property.deliveryDate).getFullYear()}
                          </td>
                        </tr>
                      )}
                      {property.developer?.name && (
                        <tr className="bg-blue-50">
                          <td className="px-4 py-3 text-sm font-medium text-slate-600">
                            Developer
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-blue-700">
                            {property.developer.name}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Description */}
                {property.description && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-blue">
                      Description
                    </h3>
                    <div className="relative">
                      <p
                        className={cn(
                          "text-slate-700 leading-relaxed",
                          !isDescriptionExpanded && "line-clamp-4"
                        )}
                      >
                        {property.description}
                      </p>
                      {property.description.length > 200 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setIsDescriptionExpanded(!isDescriptionExpanded)
                          }
                          className="mt-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          {isDescriptionExpanded ? (
                            <>
                              Show Less <ChevronUp className="ml-1 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Show More <ChevronDown className="ml-1 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Facilities & Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-blue">
                  Facilities & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.facilities.map((facility, index) => {
                    const IconComponent =
                      facilityIcons[facility.toLowerCase()] || Home;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
                      >
                        <IconComponent className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-700 capitalize">
                          {facility}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <h4 className="text-md font-semibold text-blue">
                    Additional Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-50"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        <span className="text-sm text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-lg bg-blue text-white overflow-hidden">
              <CardContent className="p-6 space-y-6">
                {/* Main layout: Payment plan + Contact Form */}

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Payment Info */}

                  <div className="flex-1 p-4 bg-white/10 backdrop-blur-sm rounded-xl space-y-3 border border-white/20">
                    {property.price.amount && (
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Total Price</span>
                        <span className="font-semibold">
                          {formatPrice(
                            property.price.amount,
                            property.price.currency
                          )}
                        </span>
                      </div>
                    )}
                    {property.price.paymentPlan?.downPayment && (
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Down Payment</span>
                        <span className="font-semibold">
                          {formatPrice(
                            property.price.paymentPlan.downPayment,
                            property.price.currency
                          )}
                        </span>
                      </div>
                    )}

                    {property.price.paymentPlan?.installments && (
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">Installments</span>
                        <span className="font-semibold">
                          <span className="font-bold text-xl">
                            {(
                              Math.floor(
                                calculateInstallment(property.price) ?? 0
                              ) ?? 0
                            ).toLocaleString("en-US")}{" "}
                          </span>{" "}
                          EGP{" "}
                          {property.price.paymentPlan.installments.frequency}
                        </span>
                      </div>
                    )}

                    {property.price.paymentPlan?.installments && (
                      <div className="flex justify-between items-center">
                        <span className="text-blue-100">
                          Years of installments
                        </span>
                        <span className="font-semibold">
                          {property.price.paymentPlan.installments.years} years
                        </span>
                      </div>
                    )}
                    {property.propertyType === "rent" && (
                      <div className="w-full flex justify-center py-6">
                        <div className="rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                          <Calendar
                            numberOfMonths={2}
                            className="rounded-lg border-none shadow-none [&_.rdp-caption_label]:font-medium [&_.rdp-day_selected]:bg-blue-600 [&_.rdp-day_selected]:text-white [&_.rdp-day_today]:border-blue-500 [&_.rdp-day_today]:text-blue-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Form */}
                  <div className="flex-1 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <h3 className="text-blue-100 mb-4 text-lg font-semibold text-center">
                      Contact Agent
                    </h3>
                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <textarea
                        placeholder="Message"
                        className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                        rows={4}
                      ></textarea>
                      <Button className="w-full mt-2 bg-white text-blue-700 hover:bg-blue-50">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
