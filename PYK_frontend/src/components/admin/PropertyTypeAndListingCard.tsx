"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface PropertyTypeAndListingProps {
  form: any; // 👉 replace `any` with UseFormReturn<PropertyFormData> later
  showBuildingFields: boolean;
}

export function PropertyTypeAndListingCard({
  form,
  showBuildingFields,
}: PropertyTypeAndListingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Property Classification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Listing Type */}
          <FormField
            control={form.control}
            name="listingType"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Listing Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="resale">Resale</SelectItem>
                    <SelectItem value="rent">Rent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Property Type */}
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Property Type *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="twin_house">Twin House</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Unit Level — only if building */}
        {showBuildingFields && (
          <FormField
            control={form.control}
            name="unitLevel"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Unit Level *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ground">Ground Floor</SelectItem>
                    <SelectItem value="middle">Middle Floor</SelectItem>
                    <SelectItem value="roof">Roof</SelectItem>
                    <SelectItem value="duplex-lower">Duplex Lower</SelectItem>
                    <SelectItem value="duplex-upper">Duplex Upper</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
