import { Schema, model, Document } from "mongoose";

export interface DeveloperDoc extends Document {
  name: string;
  description?: string;
  foundedYear?: number;
  headquarters?: string;
  website?: string;
  logo?: string;
  projects: string[]; // list of project names or marketing tags
  createdAt: Date;
  updatedAt: Date;
}

const DeveloperSchema = new Schema<DeveloperDoc>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    foundedYear: Number,
    headquarters: String,
    website: String,
    logo: String,
    projects: { type: [String], default: [] },
  },
  { timestamps: true }
);

DeveloperSchema.index({ name: 1 });

export const Developer = model<DeveloperDoc>("Developer", DeveloperSchema);
