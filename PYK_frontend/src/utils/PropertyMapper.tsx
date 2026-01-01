import type { ApiProperty } from "@/Response/PropertyResponse";
import type { PropertyData } from "@/types/property";


export const mapPropertyFromApi = (doc: ApiProperty): PropertyData => {
  return {
    id: doc._id,
    listingType: doc.listingType as PropertyData["listingType"],
    propertyType: doc.propertyType as PropertyData["propertyType"],
    unitLevel: doc.unitLevel as PropertyData["unitLevel"],

    title: doc.title,
    description: doc.description,
    status: doc.status as PropertyData["status"],

    areas: {
      builtUp: doc.areas?.builtUp ?? 0,
      land: doc.areas?.land,
      total: doc.areas?.total,
      garden: doc.areas?.garden,
      terrace: doc.areas?.terrace,
      roof: doc.areas?.roof,
    },

    price: {
      currency: doc.price?.currency ?? "",
      amount: doc.price?.amount,
      monthlyRent: doc.price?.monthlyRent,
      paymentPlan: doc.price?.paymentPlan && {
        downPayment: doc.price.paymentPlan.downPayment,
        installments: doc.price.paymentPlan.installments && {
          years: doc.price.paymentPlan.installments.years ?? 0,
          frequency: doc.price.paymentPlan.installments.frequency,
        },
      },
    },

    bedrooms: doc.bedrooms,
    bathrooms: doc.bathrooms,
    facilities: doc.facilities ?? [],
    features: doc.features ?? [],

    location: {
      city: doc.location?.city ?? "",
      district: doc.location?.district,
      compound: doc.location?.compound,
    },

    media: {
      images: doc.media?.images ?? [],
      floorPlans: doc.media?.floorPlans ?? [],
    },

    developer:
      doc.developer && {
        name: doc.developer.name,
      },

    owner: doc.owner?.name ?? "",

    deliveryDate: doc.deliveryDate,

    rentDetails:
      doc.rentDetails && {
        leaseTerm: doc.rentDetails.leaseTerm,
        deposit: doc.rentDetails.deposit,
        furnished: doc.rentDetails.furnished,
        utilitiesIncluded: doc.rentDetails.utilitiesIncluded,
      },

    finishing: doc.finishing as PropertyData["finishing"],

    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};
