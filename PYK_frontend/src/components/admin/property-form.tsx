"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, Plus, X, Images } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { BasicInfoCard } from "./BasicInfoCard";
import { PropertyTypeAndListingCard } from "./PropertyTypeAndListingCard";
import { PricingAndAreaCard } from "./PricingAndAreaCard";
import LocationInfoCard from "./LocationInfoCard";
import FacilitiesCard from "./FacilitiesCard";
import DeveloperOwnerInfoCard from "./DeveloperOwnerInfoCard";
import { PaymentPlanCard } from "./PaymentPlanCard";

// Define the property form schema to match backend schema
const propertyFormSchema = z
  .object({
    title: z.string().min(1, "Property title is required"),
    status: z.enum(["available", "sold", "rented", "reserved"], {
      required_error: "Status is required",
    }),
    description: z.string().optional(),
    listingType: z.enum(["primary", "resale", "rent"], {
      required_error: "Listing type is required",
    }),
    propertyType: z.enum(
      [
        "apartment",
        "villa",
        "townhouse",
        "twin_house",
        "duplex",
        "penthouse",
        "studio",
        "",
      ],
      {
        required_error: "Property type is required",
      }
    ),
    unitLevel: z
      .enum(["ground", "middle", "roof", "duplex-lower", "duplex-upper"])
      .optional(),
    price: z.object({
      currency: z.string().default("EGP"),
      amount: z.coerce.number().optional(),
      monthlyRent: z.coerce.number().optional(),
      paymentPlan: z
        .object({
          downPayment: z.coerce.number().min(0, "Down payment is required"),
          installments: z.object({
            years: z.coerce.number().min(1, "Years must be at least 1"),
            frequency: z.enum(["monthly", "quarterly", "yearly"]),
          }),
        })
        .optional(),
    }),
    areas: z.object({
      builtUp: z.coerce.number().min(1, "Built-up area must be greater than 0"),
      land: z.coerce.number().min(0, "Land area cannot be negative").optional(),
      total: z.coerce
        .number()
        .min(0, "Total area cannot be negative")
        .optional(),
      garden: z.coerce
        .number()
        .min(0, "Garden area cannot be negative")
        .optional(),
      terrace: z.coerce
        .number()
        .min(0, "Terrace area cannot be negative")
        .optional(),
      roof: z.coerce.number().min(0, "Roof area cannot be negative").optional(),
    }),
    bedrooms: z.coerce
      .number()
      .min(0, "Bedrooms cannot be negative")
      .optional(),
    bathrooms: z.coerce
      .number()
      .min(0, "Bathrooms cannot be negative")
      .optional(),
    facilities: z.array(z.string()).default([]),
    location: z.object({
      city: z.string().min(1, "City is required"),
      district: z.string().optional(),
      compound: z.string().optional(),
      geo: z
        .object({
          type: z.literal("Point").default("Point"),
          coordinates: z.tuple([z.number(), z.number()]).optional(),
        })
        .optional(),
    }),
    compoundId: z.string().optional().nullable(),
    media: z.object({
      images: z.array(z.any()).min(1, "At least one image is required"),
      floorPlans: z.array(z.any()).optional(),
    }),
    developer: z
      .object({
        id: z.string().optional(),
        name: z.string().optional(),
      })
      .optional(),
    deliveryDate: z.string().optional(),
    owner: z
      .object({
        name: z.string().optional(),
        contact: z
          .object({
            phone: z.string().optional(),
            email: z.string().email().optional(),
          })
          .optional(),
      })
      .optional(),
    furnishing: z
      .enum(["furnished", "semi-furnished", "unfurnished"])
      .optional(),
    finishing: z
      .enum([
        "finished",
        "semi-finished",
        "core-shell",
        "red-brick",
        "luxury-finished",
      ])
      .optional(),
    rentDetails: z
      .object({
        leaseTerm: z.string().optional(),
        deposit: z.coerce
          .number()
          .min(0, "Deposit cannot be negative")
          .optional(),
        furnished: z.boolean().optional(),
        utilitiesIncluded: z.boolean().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // For villas, require land area
      if (["villa", "townhouse", "twin_house"].includes(data.propertyType)) {
        return data.areas.land && data.areas.land > 0;
      }
      return true;
    },
    {
      message: "Land area is required for villas, townhouses, and twin houses",
      path: ["areas.land"],
    }
  )
  .refine(
    (data) => {
      // For building types, require unitLevel
      if (
        ["apartment", "duplex", "penthouse", "studio"].includes(
          data.propertyType
        )
      ) {
        return !!data.unitLevel;
      }
      return true;
    },
    {
      message:
        "Unit level is required for apartments, duplexes, penthouses, and studios",
      path: ["unitLevel"],
    }
  );

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;

const ImageUploader = lazy(() =>
  import("@/components/admin/image-uploader").then((m) => ({
    default: m.ImageUploader,
  }))
);
const FloorPlanUploader = lazy(() =>
  import("@/components/admin/floor-plan-uploader").then((m) => ({
    default: m.FloorPlanUploader,
  }))
);

interface PropertyFormProps {
  onClose: () => void;
}

export function PropertyForm({ onClose }: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [propertyType, setPropertyType] = useState("");

  // Initialize the form with default values that match backend schema
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      listingType: "primary",
      propertyType: "",
      location: {
        city: "",
        district: "",
        compound: "",
      },
      price: {
        currency: "EGP",
      },
      facilities: [],
    },
  });

  // Watch propertyType to show/hide conditional fields
  const watchedPropertyType = form.watch("propertyType");
  const watchedListingType = form.watch("listingType");

  useEffect(() => {
    setPropertyType(watchedPropertyType || "");
  }, [watchedPropertyType]);

  // Handle form submission - FIXED to match backend schema
  const onSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true);
    try {
      // 1. First, let's test with a simple JSON request (without files)
      const propertyData = {
        title: data.title,
        status: data.status,
        description: data.description || "",
        listingType: data.listingType,
        propertyType: data.propertyType,
        unitLevel: data.unitLevel,
        price: {
          currency: data.price.currency,
          amount: data.price.amount,
          paymentPlan: {
            downPayment: data.price.paymentPlan?.downPayment || undefined,
            installments: {
              years: data.price.paymentPlan?.installments?.years || undefined,
              frequency:
                data.price.paymentPlan?.installments?.frequency || undefined,
            },
          },
          monthlyRent: data.price.monthlyRent || undefined,
        },
        areas: {
          builtUp: data.areas.builtUp,
          land: data.areas.land || undefined,
          total: data.areas.total || undefined,
          garden: data.areas.garden || undefined,
          terrace: data.areas.terrace || undefined,
          roof: data.areas.roof || undefined,
        },
        bedrooms: data.bedrooms || undefined,
        bathrooms: data.bathrooms || undefined,
        facilities: data.facilities || [],
        location: {
          city: data.location.city,
          district: data.location.district || "",
          compound: data.location.compound || "",
        },
        compoundId: data.compoundId || null,
        developer: data.developer?.name
          ? {
              id: data.developer.id || "64f2b1c4c3d2f4e6a8b1c3f2",
              name: data.developer.name,
            }
          : undefined,
        deliveryDate: data.deliveryDate
          ? new Date(data.deliveryDate).toISOString()
          : undefined,
        owner: data.owner?.name
          ? {
              name: data.owner.name,
              contact: {
                phone: data.owner.contact?.phone || "",
                email: data.owner.contact?.email || "",
              },
            }
          : undefined,
        furnishing: data.furnishing || undefined,
        finishing: data.finishing || undefined,
        rentDetails: data.rentDetails
          ? {
              leaseTerm: data.rentDetails.leaseTerm || "",
              deposit: data.rentDetails.deposit || undefined,
              furnished: data.rentDetails.furnished || false,
              utilitiesIncluded: data.rentDetails.utilitiesIncluded || false,
            }
          : undefined,
      };

      // Remove undefined values to clean up the object
      const cleanPropertyData = JSON.parse(JSON.stringify(propertyData));

      console.log("📤 Submitting property data:", cleanPropertyData);

      // 2. Try sending as pure JSON first
      const response = await axios.post(
        "http://localhost:3000/property",
        cleanPropertyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        }
      );

      console.log("✅ Created property:", response.data);

      // 3. If JSON works, then handle file uploads separately if needed
      if (data.media.images && data.media.images.length > 0) {
        console.log("📸 Handling image uploads separately...");
        // You can implement file upload separately here
      }

      alert("Property created successfully!");
      onClose();
    } catch (error: any) {
      console.error("❌ Error creating property:", error);

      // Detailed error logging
      if (error.response) {
        // Server responded with error status
        console.error("📡 Server response error:", error.response.status);
        console.error("📄 Server error data:", error.response.data);
        console.error("🔧 Server error headers:", error.response.headers);

        alert(
          `Server error (${error.response.status}): ${
            error.response.data?.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error("📡 No response received:", error.request);
        alert("No response from server. Check if backend is running.");
      } else {
        // Something else happened
        console.error("❌ Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  // Add a facility to the list

  // Check which fields should be shown based on property type
  const showVillaFields = ["villa", "townhouse", "twin_house"].includes(
    propertyType
  );
  const showBuildingFields = [
    "apartment",
    "duplex",
    "penthouse",
    "studio",
  ].includes(propertyType);
  const showRentFields = watchedListingType === "rent";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto  mx-auto p-10  ">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <BasicInfoCard form={form} />

            {/* Property Type & Listing */}
            <PropertyTypeAndListingCard
              form={form}
              showBuildingFields={showBuildingFields}
            />
            {/* Pricing & Area */}
            <PricingAndAreaCard
              form={form}
              showRentFields={showRentFields}
              showVillaFields={showVillaFields}
            />

            {/* Location Information */}
            <LocationInfoCard control={form.control} />

            {/* Facilities */}
            <FacilitiesCard
              control={form.control}
              watch={form.watch}
              setValue={form.setValue}
            />

            {/* Developer & Owner Information */}
            <DeveloperOwnerInfoCard control={form.control} />
            {watchedListingType === "primary" && (
              <PaymentPlanCard form={form} />
            )}
            {/* Rent Details (only for rent listing type) */}
            {showRentFields && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Rent Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="rentDetails.leaseTerm"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Lease Term</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1 year" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rentDetails.deposit"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel>Deposit (EGP)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rentDetails.utilitiesIncluded"
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Utilities Included</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rentDetails.furnished"
                      render={({ field }) => (
                        <FormItem className="space-y-2 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Furnished</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Media Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="media.images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Images *</FormLabel>
                      <Suspense
                        fallback={
                          <div className="space-y-4">
                            <Skeleton className="h-48 w-full" />
                            <div className="text-center text-sm text-muted-foreground">
                              Loading image uploader...
                            </div>
                          </div>
                        }
                      >
                        <ImageUploader
                          images={field.value || []}
                          onImagesChange={field.onChange}
                          maxFiles={15}
                          maxSize={5}
                        />
                      </Suspense>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="media.floorPlans"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Floor Plans</FormLabel>
                      <Suspense
                        fallback={
                          <div className="space-y-4">
                            <Skeleton className="h-32 w-full" />
                            <div className="text-center text-sm text-muted-foreground">
                              Loading floor plan uploader...
                            </div>
                          </div>
                        }
                      >
                        <FloorPlanUploader
                          floorPlans={field.value || []}
                          onFloorPlansChange={field.onChange}
                          maxFiles={5}
                          maxSize={10}
                        />
                      </Suspense>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-end pt-6 border-t">
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Creating..." : "Create Property"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
