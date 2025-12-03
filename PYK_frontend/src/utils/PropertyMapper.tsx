import type { PropertyData } from "@/types/property";

export const mapPropertyFromApi = (doc: any): PropertyData => {
  return {
    id: doc._id?.toString() ?? "",
    listingType: doc.listingType,
    propertyType: doc.propertyType,
    unitLevel: doc.unitLevel,
    title: doc.title,
    description: doc.description,
    status: doc.status,
    areas: {
      builtUp: doc.areas?.builtUp,
      land: doc.areas?.land,
      total: doc.areas?.total,
      garden: doc.areas?.garden,
      terrace: doc.areas?.terrace,
      roof: doc.areas?.roof,
    },
    price: {
      currency: doc.price?.currency,
      amount: doc.price?.amount,
      monthlyRent: doc.price?.monthlyRent,
      paymentPlan: doc.price?.paymentPlan && {
        downPayment: doc.price.paymentPlan.downPayment,
        installments: doc.price.paymentPlan.installments && {
          years: doc.price.paymentPlan.installments.years,
          frequency: doc.price.paymentPlan.installments.frequency,
        },
      },
    },
    bedrooms: doc.bedrooms,
    bathrooms: doc.bathrooms,
    facilities: doc.facilities ?? [],
    features: doc.features ?? [],
    location: {
      city: doc.location?.city,
      district: doc.location?.district,
      compound: doc.location?.compound,

    },

    media: {
      images: doc.media?.images ?? [],

      floorPlans: doc.media?.floorPlans ?? [],
    },
    developer: doc.developer && {
      id: doc.developer.id?.toString(),
      name: doc.developer.name,
    },
    deliveryDate: doc.deliveryDate,
    owner: doc.owner && {
      name: doc.owner.name,
      contact: {
        phone: doc.owner.contact?.phone,
        email: doc.owner.contact?.email,
      },
    },

    finishing: doc.finishing,
    rentDetails: doc.rentDetails && {
      leaseTerm: doc.rentDetails.leaseTerm,
      deposit: doc.rentDetails.deposit,
      furnished: doc.rentDetails.furnished,
      utilitiesIncluded: doc.rentDetails.utilitiesIncluded,
    },
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};
