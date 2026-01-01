import z from "zod";

// Define the PropertyType union outside for clarity and reuse
export const PropertyTypes = z.enum(
  [
    "apartment",
    "villa",
    "townhouse",
    "twin_house",
    "duplex",
    "penthouse",
    "studio",
  ],
  {
    message:
      "Property type is required and must be one of the specified options.",
  }
);

// Define the UnitLevel union outside
export const UnitLevels = z.enum([
  "ground",
  "middle",
  "roof",
  "duplex-lower",
  "duplex-upper",
]);

export const propertyFormSchema = z
  .object({
    title: z.string().min(1, "Property title is required"),
    status: z
      .enum(["available", "sold", "rented", "reserved", "pending"], {
        // Use 'message' instead of 'required_error' or 'invalid_type_error'
        message: "Status is required and must be one of the specified options.",
      })
      .optional(),
    description: z.string().optional(),
    listingType: z.enum(["primary", "resale", "rent"], {
      // Use 'message' instead of 'required_error'
      message:
        "Listing type is required and must be one of the specified options.",
    }),

    propertyType: PropertyTypes, // Already includes the error message

    unitLevel: UnitLevels.optional(),

    price: z.object({
      currency: z.string().default("EGP").optional().nullable(),
      amount: z.coerce.number().optional(),
      monthlyRent: z.coerce.number().optional(),
      paymentPlan: z
        .object({
          downPayment: z.coerce
            .number()
            .min(0, "Down payment is required")
            .optional()
            .nullable(),
          installments: z
            .object({
              years: z.coerce
                .number()
                .min(1, "Years must be at least 1")
                .optional()
                .nullable(),
              frequency: z
                .enum(["monthly", "quarterly", "yearly"])
                .optional()
                .nullable(),
            })
            .optional()
            .nullable(),
        })
        .optional()
        .nullable(),
    }),
    areas: z
      .object({
        builtUp: z.coerce
          .number()
          .min(1, "Built-up area must be greater than 0"),
        land: z.coerce
          .number()
          .min(0, "Land area cannot be negative")
          .optional(),
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
          .min(0, "Terarce area cannot be negative")
          .optional(),
        roof: z.coerce
          .number()
          .min(0, "Roof area cannot be negative")
          .optional(),
      })
      .optional()
      .nullable(),
    bedrooms: z.coerce
      .number()
      .min(0, "Bedrooms cannot be negative")
      .optional(),
    bathrooms: z.coerce
      .number()
      .min(0, "Bathrooms cannot be negative")
      .optional(),
    facilities: z.array(z.string()).default([]).optional().nullable(),
    location: z
      .object({
        city: z.string().min(1, "City is required"),
        district: z.string().optional(),
        compound: z.string().optional(),
      })
      .optional()
      .nullable(),

    media: z
      .object({
        images: z.array(z.any()).optional(),
        floorPlans: z.array(z.any()).optional(),
      })
      .optional()
      .nullable(),
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
            email: z.string().email().optional().nullable(),
          })
          .optional(),
      })
      .optional(),

    finishing: z
      .enum(["finished", "semi-finished", "core-shell", "furnished"])
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
        return data.areas?.land !== undefined && data.areas.land > 0;
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
        return data.unitLevel !== undefined; // Check if it's explicitly set
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
