// src/models/property.model.ts
import { Schema, model, models, Document } from "mongoose";

export enum SaleType {
  Primary = "PRIMARY",
  Resale = "RESALE",
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  EGP = "EGP",
  GBP = "GBP",
}

export interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
}

/** ==== Base interface (shape only) ==== */
export interface BaseProperty {
  title: string;
  description?: string;
  price: number;
  currency: Currency;
  sizeSqm: number;
  bedrooms?: number;
  bathrooms?: number;
  status: "available" | "sold" | "rented";
  listedAt: Date;
  updatedAt?: Date;
  address: Address;
  images?: string[];
  ownerId: string;
  saleType: SaleType;
  downPayment?: number; // سنضبطها بالقواعد في الـ schema
}

/** ==== Document interfaces (extend from Document) ==== */
export interface PrimaryPropertyDoc extends BaseProperty, Document {
  saleType: SaleType.Primary;
  downPayment?: never; // مش مسموح
}

export interface ResalePropertyDoc extends BaseProperty, Document {
  saleType: SaleType.Resale;
  downPayment: number; // إجباري
}

export type PropertyDoc = PrimaryPropertyDoc | ResalePropertyDoc;

const AddressSchema = new Schema<Address>(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    postalCode: { type: String, trim: true },
  },
  { _id: false }
);

const PropertySchema = new Schema<PropertyDoc>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: {
      type: String,
      enum: Object.values(Currency),
      required: true,
    },
    sizeSqm: { type: Number, required: true, min: 0 },
    bedrooms: { type: Number, min: 0 },
    bathrooms: { type: Number, min: 0 },
    status: {
      type: String,
      enum: ["available", "sold", "rented"],
      required: true,
      default: "available",
    },
    listedAt: { type: Date, required: true, default: () => new Date() },
    updatedAt: { type: Date },
    address: { type: AddressSchema, required: true },
    images: [{ type: String }],
    ownerId: { type: String, required: true, index: true },

    saleType: {
      type: String,
      enum: Object.values(SaleType),
      required: true,
      index: true,
    },

    downPayment: {
      type: Number,
      min: 0,
      validate: [
        {
          validator: function (this: PropertyDoc, v: number | undefined) {
            return this.saleType === SaleType.Primary ? v == null : true;
          },
          message: "downPayment is not allowed for PRIMARY properties.",
        },
        {
          validator: function (this: PropertyDoc, v: number | undefined) {
            return this.saleType === SaleType.Resale ? v != null : true;
          },
          message: "downPayment is required for RESALE properties.",
        },
      ],
    },
  },
  {
    timestamps: true, // creates createdAt/updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PropertySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

PropertySchema.index({ "address.city": 1 });
PropertySchema.index({ price: 1 });
PropertySchema.index({ saleType: 1, price: 1 });

/** ==== Model ==== */
export const PropertyModel =
  models.Property || model<PropertyDoc>("Property", PropertySchema);
