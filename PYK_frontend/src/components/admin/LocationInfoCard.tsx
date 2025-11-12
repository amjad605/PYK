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
import { useWatch, useFormContext } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { PropertyFormValues } from "./property-form";

interface LocationInfoCardProps {
  control: Control<PropertyFormValues>;
}

const cities: Record<string, string[]> = {
  Cairo: [
    "Nasr City",
    "Heliopolis",
    "Maadi",
    "Zamalek",
    "Garden City",
    "New Cairo",
  ],
  Giza: ["Dokki", "Mohandessin", "6th of October", "Sheikh Zayed", "Agouza"],
};

export default function LocationInfoCard({ control }: LocationInfoCardProps) {
  const { setValue } = useFormContext();
  const selectedCity = useWatch({ control, name: "location.city" });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Location Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City Select */}
          <FormField
            control={control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setValue("location.district", ""); // reset district when city changes
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(cities).map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District Select */}
          <FormField
            control={control}
            name="location.district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    disabled={!selectedCity}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCity &&
                        cities[selectedCity]?.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
