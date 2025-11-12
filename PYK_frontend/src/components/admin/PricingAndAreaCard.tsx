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

interface PricingAndAreaCardProps {
  form: any; // 👉 ideally: UseFormReturn<PropertyFormData>
  showRentFields: boolean;
  showVillaFields: boolean;
}

export function PricingAndAreaCard({
  form,
  showRentFields,
  showVillaFields,
}: PricingAndAreaCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pricing & Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price + Built-up area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price.amount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Price (EGP) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {showRentFields && (
            <FormField
              control={form.control}
              name="price.monthlyRent"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Monthly Rent (EGP)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="areas.builtUp"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Built-up Area (sqm) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Bedrooms / Bathrooms / Furnishing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Bathrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="furnishing"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Furnishing</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="semi-furnished">
                      Semi-Furnished
                    </SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Finishing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="finishing"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Finishing</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select finishing" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="finished">Finished</SelectItem>
                    <SelectItem value="semi-finished">Semi-Finished</SelectItem>
                    <SelectItem value="core-shell">Core & Shell</SelectItem>
                    <SelectItem value="red-brick">Red Brick</SelectItem>
                    <SelectItem value="luxury-finished">
                      Luxury Finished
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Villa-specific fields */}
        {showVillaFields && (
          <div className="pt-4 border-t">
            <h4 className="text-md font-medium mb-4">Villa Specific Areas</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="areas.land"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Land Area (sqm) *</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="areas.garden"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Garden Area (sqm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="areas.terrace"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Terrace Area (sqm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="areas.roof"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Roof Area (sqm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="areas.total"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Total Area (sqm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
