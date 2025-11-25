import z from "zod";

export const propertyFormSchema = z
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
      images: z.array(z.any()).optional(),
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
