"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Control } from "react-hook-form";
import type { PropertyFormValues } from "./property-form";

interface PaymentPlanCardProps {
  control: Control<PropertyFormValues>;
  show: boolean; // pass based on listingType === "primary"
}

export function PaymentPlanCard({ control }: PaymentPlanCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payment Plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="price.paymentPlan.downPayment"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Down Payment *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter down payment"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="price.paymentPlan.installments.years"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Installment Years *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Number of years"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="price.paymentPlan.installments.frequency"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Frequency *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
