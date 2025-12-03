"use client";

import { type FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bed,
  Bath,
  Square,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2,
  Star,
  Heart,
  Share2,
  Download,
  Eye,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
} from "lucide-react";
import type { PropertyData } from "@/types/property";

interface PropertyDetailsPageProps {
  property: PropertyData;
}

const PropertyDetailsTab: FC<PropertyDetailsPageProps> = ({ property }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Enhanced Sticky Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm h-30 pt-5"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.h1
                className="text-xl font-bold text-slate-900 truncate max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {property.title}
              </motion.h1>
              <Badge variant="secondary" className="hidden sm:flex">
                {property.status || "Available"}
              </Badge>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900">
                  {(property.price.amount ?? 0).toLocaleString()}
                </span>
                <span className="text-lg text-slate-600">
                  {property.price.currency}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="hidden sm:flex"
                >
                  <Heart
                    className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""
                      }`}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex bg-transparent"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setShowContactForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Property Stats Cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {property.bedrooms && (
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Bed className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {property.bedrooms}
                      </p>
                      <p className="text-sm text-slate-600">Bedrooms</p>
                    </div>
                  </div>
                </Card>
              )}

              {property.bathrooms && (
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Bath className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {property.bathrooms}
                      </p>
                      <p className="text-sm text-slate-600">Bathrooms</p>
                    </div>
                  </div>
                </Card>
              )}

              {property.areas?.builtUp && (
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Square className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {property.areas.builtUp}
                      </p>
                      <p className="text-sm text-slate-600">m² Built-up</p>
                    </div>
                  </div>
                </Card>
              )}

              <Card className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {property.propertyType || "Apartment"}
                    </p>
                    <p className="text-sm text-slate-600">Property Type</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Enhanced Tabs */}
            <motion.div variants={itemVariants}>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-5 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger
                    value="overview"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Features
                  </TabsTrigger>
                  <TabsTrigger
                    value="payment"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Payment
                  </TabsTrigger>
                  <TabsTrigger
                    value="location"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Location
                  </TabsTrigger>
                  <TabsTrigger
                    value="developer"
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Developer
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-8">
                    <motion.div
                      key="overview"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-8"
                    >
                      <Card className="p-8 shadow-sm border-0 bg-gradient-to-br from-white to-slate-50">
                        <div className="space-y-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                                {property.title}
                              </h2>
                              <div className="flex items-center gap-2 text-slate-600">
                                <MapPin className="h-4 w-4" />
                                <span>
                                  {property.location.city},{" "}
                                  {property.location.district}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-slate-900">
                                {(property.price.amount ?? 0).toLocaleString()}
                              </div>
                              <div className="text-lg text-slate-600">
                                {property.price.currency}
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed text-lg">
                              {property.description}
                            </p>
                          </div>

                          {property.furnishing && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="px-3 py-1">
                                <Star className="h-3 w-3 mr-1" />
                                {property.furnishing}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  {/* Features Tab */}
                  <TabsContent value="features" className="mt-8">
                    <motion.div
                      key="features"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <Card className="p-6 shadow-sm border-0 bg-gradient-to-br from-blue-50 to-white">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="flex items-center gap-2 text-blue-900">
                            <CheckCircle2 className="h-5 w-5" />
                            Property Features
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="grid grid-cols-1 gap-3">
                            {property.features.map((feature, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100/50 transition-colors"
                              >
                                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                                <span className="text-slate-700">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="p-6 shadow-sm border-0 bg-gradient-to-br from-emerald-50 to-white">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="flex items-center gap-2 text-emerald-900">
                            <Building2 className="h-5 w-5" />
                            Building Facilities
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="grid grid-cols-1 gap-3">
                            {property.facilities.map((facility, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-emerald-100/50 transition-colors"
                              >
                                <Building2 className="h-4 w-4 text-emerald-600" />
                                <span className="text-slate-700">
                                  {facility}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  {/* Payment Tab */}
                  <TabsContent value="payment" className="mt-8">
                    <motion.div
                      key="payment"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Card className="p-8 shadow-sm border-0 bg-gradient-to-br from-purple-50 to-white">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="flex items-center gap-2 text-purple-900">
                            <Calendar className="h-5 w-5" />
                            Payment Plans & Financing
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="text-center py-12">
                            <Clock className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                              {property.price.paymentPlan?.downPayment}
                            </h3>
                            <p className="text-slate-600 mb-6">
                              {
                                property.price.paymentPlan?.installments
                                  ?.frequency
                              }{" "}
                              {property.price.paymentPlan?.installments?.years}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  {/* Location Tab */}
                  <TabsContent value="location" className="mt-8">
                    <motion.div
                      key="location"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Card className="p-8 shadow-sm border-0 bg-gradient-to-br from-orange-50 to-white">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="flex items-center gap-2 text-orange-900">
                            <MapPin className="h-5 w-5" />
                            Location & Neighborhood
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-orange-100">
                            <MapPin className="h-6 w-6 text-orange-600" />
                            <div>
                              <p className="font-semibold text-slate-900">
                                {property.location.city}
                              </p>
                              <p className="text-slate-600">
                                {property.location.district}
                              </p>
                            </div>
                          </div>

                          <div className="aspect-video rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center border border-orange-200">
                            <div className="text-center">
                              <MapPin className="h-12 w-12 text-orange-400 mx-auto mb-2" />
                              <p className="text-orange-700 font-medium">
                                Interactive Map
                              </p>
                              <p className="text-orange-600 text-sm">
                                Coming Soon
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  {/* Developer Tab */}
                  <TabsContent value="developer" className="mt-8">
                    <motion.div
                      key="developer"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Card className="p-8 shadow-sm border-0 bg-gradient-to-br from-slate-50 to-white">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="flex items-center gap-2 text-slate-900">
                            <Users className="h-5 w-5" />
                            Developer Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          {property.developer ? (
                            <div className="space-y-4">
                              <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-slate-200">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                                  <Building2 className="h-8 w-8 text-slate-600" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-slate-900">
                                    {property.developer.name}
                                  </h3>
                                  <p className="text-slate-600">
                                    {property.developer.description ||
                                      "Trusted Property Developer"}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                className="w-full bg-transparent"
                              >
                                <ArrowRight className="h-4 w-4 mr-2" />
                                View Developer Profile
                              </Button>
                            </div>
                          ) : (
                            <div className="text-center py-12">
                              <Building2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                              <p className="text-slate-600">
                                Developer information not available
                              </p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Contact Form Card */}
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 sticky top-32">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-slate-900">
                  <Phone className="h-5 w-5" />
                  Contact Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message (Optional)"
                      rows={3}
                      className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3">
                    <Phone className="h-4 w-4 mr-2" />
                    Request Call Back
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 shadow-sm border-0 bg-white">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                  Brochure
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Eye className="h-4 w-4" />
                  Virtual Tour
                </Button>
              </div>
            </Card>

            {/* Developer Info */}
            <Card className="p-4 shadow-sm border-0 bg-white">
              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Developer
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="font-semibold text-slate-900">
                  {property.developer?.name || "Premium Developer"}
                </p>
                <p className="text-sm text-slate-600 mt-1">Trusted Partner</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyDetailsTab;
