import mongoose, { Schema, Types } from "mongoose";
import {
  Areas,
  DeveloperRef,
  Finishing,
  ListingType,
  Media,
  Owner,
  Price,
  PropertyLocation,
  PropertyType,
  RentDetails,
  UnitLevel,
} from "./property.type";

export interface IPropertyDoc extends Document {
  listingType: ListingType;
  propertyType: PropertyType;
  unitLevel?: UnitLevel;
  title: string;
  description?: string;
  status: "available" | "sold" | "rented" | "reserved";
  areas: Areas;
  price: Price;
  bedrooms?: number;
  bathrooms?: number;
  facilities: string[];
  propertyLocation: PropertyLocation;
  compoundId?: Types.ObjectId | null;
  media: Media;
  developer?: DeveloperRef;
  deliveryDate?: Date;
  owner?: Owner;
  furnishing?: "furnished" | "semi-furnished" | "unfurnished";
  finishing?: Finishing;
  rentDetails?: RentDetails;
  createdAt: Date;
  updatedAt: Date;
  hasGarden?: boolean;
  hasTerrace?: boolean;
}

const buildingTypes: PropertyType[] = [
  "apartment",
  "duplex",
  "penthouse",
  "studio",
];
const villaTypes: PropertyType[] = ["villa", "townhouse", "twin_house"];

const AreasSchema = new Schema<IPropertyDoc["areas"]>(
  {
    builtUp: { type: Number, required: true, min: 1 },
    land: { type: Number, min: 0 },
    total: { type: Number, min: 0 },
    garden: { type: Number, min: 0 },
    terrace: { type: Number, min: 0 },
    roof: { type: Number, min: 0 },
  },
  { _id: false }
);

const PropertySchema = new Schema<IPropertyDoc>(
  {
    listingType: {
      type: String,
      enum: ["primary", "resale", "rent"],
      required: true,
    },
    propertyType: {
      type: String,
      enum: [
        "apartment",
        "villa",
        "townhouse",
        "twinhouse",
        "duplex",
        "penthouse",
        "studio",
      ],
      required: true,
    },
    unitLevel: {
      type: String,
      enum: ["ground", "typical", "roof", "duplex-lower", "duplex-upper"],
    },
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ["available", "sold", "rented", "reserved"],
      default: "available",
    },
    areas: { type: AreasSchema, required: true },
    price: {
      currency: { type: String, required: true },
      amount: Number,
      monthlyRent: Number,
      paymentPlan: {
        downPayment: Number,
        installments: {
          years: Number,
          frequency: { type: String, enum: ["monthly", "quarterly", "yearly"] },
        },
      },
    },
    bedrooms: Number,
    bathrooms: Number,
    facilities: {
      type: [String],
      default: [],
    },
    location: {
      city: { type: String, required: true },
      district: String,
    },
    compoundId: { type: Schema.Types.ObjectId, ref: "Compound", default: null },
    media: {
      images: { type: [String], default: [] },

      floorPlans: { type: [String], default: [] },
    },
    developer: {
      id: { type: Schema.Types.ObjectId, ref: "Developer" },
      name: String,
    },
    deliveryDate: Date,
    owner: {
      name: String,
      contact: { phone: String, email: String },
    },
    furnishing: {
      type: String,
      enum: ["furnished", "semi-furnished", "unfurnished"],
    },
    finishing: {
      type: String,
      enum: [
        "finished",
        "semi-finished",
        "core-shell",
        "red-brick",
        "luxury-finished",
      ],
    },
    rentDetails: {
      leaseTerm: String,
      deposit: Number,
      furnished: Boolean,
      utilitiesIncluded: Boolean,
    },
  },
  { timestamps: true }
);

/** Validations */
PropertySchema.path("areas.land").validate({
  validator(this: IPropertyDoc, value: number | undefined) {
    if (villaTypes.includes(this.propertyType)) {
      return typeof value === "number" && value > 0;
    }
    return true;
  },
  message: "Villas/townhouses must include 'areas.land'.",
});

PropertySchema.path("areas.garden").validate({
  validator(this: IPropertyDoc, value: number | undefined) {
    if (
      buildingTypes.includes(this.propertyType) &&
      this.unitLevel === "ground"
    ) {
      return typeof value === "number" && value > 0;
    }
    return true;
  },
  message: "Ground units must include 'areas.garden'.",
});

/** Virtuals */
PropertySchema.virtual("hasGarden").get(function (this: IPropertyDoc) {
  return typeof this.areas?.garden === "number" && this.areas.garden > 0;
});
PropertySchema.virtual("hasTerrace").get(function (this: IPropertyDoc) {
  const t = this.areas?.terrace ?? 0;
  const r = this.areas?.roof ?? 0;
  return t > 0 || r > 0;
});

/** Indexes */
PropertySchema.index({ listingType: 1, propertyType: 1, unitLevel: 1 });
PropertySchema.index({ "areas.builtUp": 1 });
PropertySchema.index({ "areas.land": 1 });
PropertySchema.index({ bedrooms: 1, bathrooms: 1 });
PropertySchema.index({ "price.amount": 1, "price.monthlyRent": 1 });
PropertySchema.index({ compoundId: 1 });
PropertySchema.index({
  title: "text",
  "location.city": "text",
  "location.district": "text",
  "location.compound": "text",
  "developer.name": "text",
});

export const PropertyModel = mongoose.model<IPropertyDoc>(
  "Property",
  PropertySchema
);
