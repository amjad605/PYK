import { Schema, model, Document, Types } from "mongoose";

export interface CompoundDoc extends Document {
  name: string;
  city: string;
  district?: string;
  description?: string;
  location: {
    geo: { type: "Point"; coordinates: [number, number] };
    address?: string;
  };
  masterPlan?: string; // URL to image/pdf
  amenities: string[];
  developer: Types.ObjectId; // ref to Developer
  media: { images: string[]; videos: string[] };
  createdAt: Date;
  updatedAt: Date;
}

const CompoundSchema = new Schema<CompoundDoc>(
  {
    name: { type: String, required: true, index: true },
    city: { type: String, required: true },
    district: String,
    description: String,
    location: {
      geo: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" },
      },
      address: String,
    },
    masterPlan: String,
    amenities: { type: [String], default: [] },
    developer: {
      type: Schema.Types.ObjectId,
      ref: "Developer",
      required: true,
    },
    media: {
      images: { type: [String], default: [] },
      videos: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

CompoundSchema.index({ name: 1, city: 1 });

export const Compound = model<CompoundDoc>("Compound", CompoundSchema);
