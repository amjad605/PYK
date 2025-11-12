"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { Control } from "react-hook-form";
import type { PropertyFormData } from "../property/PropertyCard.type";

interface DeveloperOwnerInfoCardProps {
  control: Control<PropertyFormData>;
}

export default function DeveloperOwnerInfoCard({
  control,
}: DeveloperOwnerInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Developer & Owner Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Developer + Owner names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="developer.name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Developer Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter developer name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="owner.name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter owner name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Owner Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="owner.contact.phone"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Owner Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter owner phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="owner.contact.email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Owner Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter owner email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Delivery Date */}
        <FormField
          control={control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Delivery Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
