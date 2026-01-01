"use client";

import { lazy, Suspense, useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Save } from "lucide-react";
import { useForm, } from "react-hook-form"; // Added FieldValues for safer useForm typing
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { BasicInfoCard } from "./BasicInfoCard";
import { PropertyTypeAndListingCard } from "./PropertyTypeAndListingCard";
import { PricingAndAreaCard } from "./PricingAndAreaCard";
import LocationInfoCard from "./LocationInfoCard";
import FacilitiesCard from "./FacilitiesCard";
import DeveloperOwnerInfoCard from "./DeveloperOwnerInfoCard";
import { PaymentPlanCard } from "./PaymentPlanCard";
import {
  propertyFormSchema,
  type PropertyFormValues,
} from "@/types/property-form-schema";
import type { PropertyData } from "@/types/property";
import toast from "react-hot-toast";
import axios from "@/lib/axios";
// Lazy load uploaders
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
  isOpen: boolean;
  property?: PropertyData | null;
  isEditing?: boolean;
  onSubmitSuccess?: () => void;
}

// Define the default values structure for clarity and reuse
const defaultFormValues: PropertyFormValues = {
  title: "",
  status: "available",
  description: "",
  listingType: "primary",
  propertyType: "" as any,
  unitLevel: undefined,
  price: {
    currency: "EGP",
    amount: undefined,
    monthlyRent: undefined,
    paymentPlan: undefined,
  },

};

export function PropertyForm({
  onClose,
  isOpen,
  property,
  isEditing = false,
  onSubmitSuccess,
}: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingFloorPlans, setExistingFloorPlans] = useState<string[]>([]);

  // Safely map existing property data to form values for editing
  const initialFormValues: PropertyFormValues = useMemo(() => {
    if (property && isEditing) {
      return {
        title: property.title || "",
        status: property.status,
        description: property.description || "",
        listingType: property.listingType || "primary",
        propertyType: property.propertyType as any,
        unitLevel: property.unitLevel as any,
        price: {
          currency: property.price?.currency || "EGP",
          amount: property.price?.amount || undefined,
          monthlyRent: property.price?.monthlyRent || undefined,
          paymentPlan: property.price?.paymentPlan
            ? {
              downPayment: property.price.paymentPlan.downPayment || 0,
              installments: {
                years: property.price.paymentPlan.installments?.years || 0,
                frequency:
                  property.price.paymentPlan.installments?.frequency as any ||
                  "monthly",
              },
            }
            : undefined,
        },
        areas: {
          builtUp: property.areas?.builtUp || 0,
          land: property.areas?.land || undefined,
          total: property.areas?.total || undefined,
          garden: property.areas?.garden || undefined,
          terrace: property.areas?.terrace || undefined,
          roof: property.areas?.roof || undefined,
        },

      };
    }
    return defaultFormValues;
  }, [property, isEditing]);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema) as any, // Retain 'as any' for complex object structures if necessary, though direct type is usually better.
    defaultValues: initialFormValues as unknown as PropertyFormValues, // Use FieldValues for better type inference with react-hook-form
  });

  // Watch fields for conditional rendering
  const propertyType = form.watch("propertyType");
  const watchedListingType = form.watch("listingType");

  // Reset form and set existing media when dialog opens/property changes
  useEffect(() => {
    if (isOpen) {
      if (property && isEditing) {
        // Set existing media URLs
        setExistingImages(property.media?.images || []);
        setExistingFloorPlans(property.media?.floorPlans || []);

        // Reset form with mapped initial values
        form.reset(initialFormValues);
      } else {
        // Reset to defaults for new property
        form.reset(defaultFormValues);
        setExistingImages([]);
        setExistingFloorPlans([]);
      }
    }
  }, [property, isEditing, form, isOpen, initialFormValues]); // Added initialFormValues to dependencies

  const onSubmit = async (data: PropertyFormValues) => {
    setIsSubmitting(true);
    try {
      const propertyId = property?.id || property?.id;

      // Prepare clean data - remove undefined values (JSON.parse(JSON.stringify) is a common way to deep-clean but inefficient. Better to manually remove properties or rely on the backend.)
      // For simplicity and matching original logic, we'll keep the shallow clean
      const cleanData = JSON.parse(JSON.stringify(data));

      if (isEditing && propertyId) {
        // EDIT MODE: Update property details (including the *current* list of existing media URLs)
        const updateData = {
          ...cleanData,
          media: {
            images: existingImages, // Send current state of existing images
            floorPlans: existingFloorPlans, // Send current state of existing floor plans
          },
        };

        await axios.put(`/property/${propertyId}`, updateData);
        toast.success("Property details updated successfully!");

        // Upload new files if any
        const hasNewImages = data.media?.images && data.media.images.length > 0;
        const hasNewFloorPlans =
          data.media?.floorPlans && data.media.floorPlans.length > 0;

        if (hasNewImages || hasNewFloorPlans) {
          const formData = new FormData();

          if (data.media?.images) {
            data.media.images.forEach((file: File) => {
              formData.append("images", file);
            });
          }

          if (data.media?.floorPlans) {
            data.media.floorPlans.forEach((file: File) => {
              formData.append("floorPlans", file);
            });
          }

          await axios.patch(`/property/${propertyId}/media`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("New media uploaded successfully!");
        }
      } else {
        // ADD MODE: Create property details (initially with empty media arrays)
        const createData = {
          ...cleanData,
          media: {
            images: [],
            floorPlans: [],
          },
        };

        // const response = 
        await axios.post("/property", createData);
        // const newPropertyId = response.data?.id as string | undefined || "";


        // // Upload files for new property (if any)
        // const hasImages = data.media?.images && data.media.images.length > 0;
        // const hasFloorPlans =
        //   data.media?.floorPlans && data.media.floorPlans.length > 0;

        // if (hasImages || hasFloorPlans) {
        //   const formData = new FormData();

        //   if (hasImages) {
        //     data.media?.images?.forEach((file: File) => {
        //       formData.append("images", file);
        //     });
        //   }

        //   if (hasFloorPlans) {
        //     data.media?.floorPlans?.forEach((file: File) => {
        //       formData.append("floorPlans", file);
        //     });
        //   }

        //   await axios.patch(`/property/${newPropertyId}/media`, formData, {
        //     headers: { "Content-Type": "multipart/form-data" },
        //   });
        //   toast.success("Media uploaded successfully for the new property!");
        // }
      }

      onSubmitSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("❌ Error submitting property form:", error);

      if (error.response) {
        const errorMessage =
          error.response.data?.message || error.response.statusText;
        toast.error(`Server Error (${error.response.status}): ${errorMessage}`);
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error(`Client Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logic for showing fields
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

  const handleImageRemoval = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFloorPlanRemoval = (index: number) => {
    setExistingFloorPlans((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto mx-auto p-6 md:p-10">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Property" : "Add New Property"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* --- Basic Information --- */}
            <BasicInfoCard form={form} />

            <hr className="my-6" />

            {/* --- Property Type & Listing --- */}
            <PropertyTypeAndListingCard
              form={form}
              showBuildingFields={showBuildingFields}
              showGroundFields={form.watch("unitLevel") === "ground"}
            />

            <hr className="my-6" />

            {/* --- Pricing & Area --- */}
            <PricingAndAreaCard
              form={form}
              showRentFields={showRentFields}
              showVillaFields={showVillaFields}
            />

            <hr className="my-6" />

            {/* --- Location Information --- */}
            <LocationInfoCard control={form.control} />

            <hr className="my-6" />

            {/* --- Facilities --- */}
            <FacilitiesCard
              control={form.control}
              watch={form.watch}
              setValue={form.setValue}
            />

            <hr className="my-6" />

            {/* --- Developer & Owner Information --- */}
            <DeveloperOwnerInfoCard control={form.control} />

            <hr className="my-6" />

            {/* --- Payment Plan (Primary Listing Only) --- */}
            {watchedListingType === "primary" && <PaymentPlanCard show control={form.control} />}

            {/* --- Rent Details (Rent Listing Only) --- */}
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
                            <Input
                              type="number"
                              placeholder="0"
                              value={field.value ?? ""} // Use nullish coalescing for better handling of undefined/null
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Checkbox: Utilities Included */}
                    <FormField
                      control={form.control}
                      name="rentDetails.utilitiesIncluded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Utilities Included</FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Checkbox: Furnished */}
                    <FormField
                      control={form.control}
                      name="rentDetails.furnished"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value || false}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Furnished</FormLabel>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <hr className="my-6" />

            {/* --- Media Upload Section --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Property Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Existing Images */}
                {isEditing && existingImages.length > 0 && (
                  <div className="mb-6">
                    <FormLabel className="mb-2 block font-semibold">
                      Existing Images
                    </FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {existingImages.map((img, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={img}
                            alt={`Existing image ${index + 1}`}
                            className="w-full h-32 object-cover transition-opacity duration-300 group-hover:opacity-80"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs h-6 px-2 py-0"
                            onClick={() => handleImageRemoval(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Images removed here will be deleted from the server upon saving the changes.
                    </p>
                  </div>
                )}

                {/* New Images Upload */}
                <FormField
                  control={form.control}
                  name="media.images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isEditing ? "Add New Images" : "Images"}
                        {!isEditing && <span className="text-red-500"> *</span>}
                      </FormLabel>
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

                <hr className="my-6" />

                {/* Existing Floor Plans */}
                {isEditing && existingFloorPlans.length > 0 && (
                  <div className="mb-6">
                    <FormLabel className="mb-2 block font-semibold">
                      Existing Floor Plans
                    </FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {existingFloorPlans.map((plan, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden border">
                          <img
                            src={plan}
                            alt={`Existing floor plan ${index + 1}`}
                            className="w-full h-48 object-contain bg-gray-50 p-2 transition-opacity duration-300 group-hover:opacity-80"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity text-xs h-6 px-2 py-0"
                            onClick={() => handleFloorPlanRemoval(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3">
                      Floor plans removed here will be deleted from the server upon saving the changes.
                    </p>
                  </div>
                )}

                {/* New Floor Plans Upload */}
                <FormField
                  control={form.control}
                  name="media.floorPlans"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {isEditing ? "Add New Floor Plans" : "Floor Plans"}
                      </FormLabel>
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

            {/* --- Form Actions --- */}
            <div className="flex items-center justify-end pt-6 border-t mt-8">
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting
                    ? isEditing
                      ? "Updating..."
                      : "Creating..."
                    : isEditing
                      ? "Update Property"
                      : "Create Property"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}