import { Request, Response } from "express";
import { PropertyModel } from "./property.model";

export const createProperty = async (req: Request, res: Response) => {
  try {
    const property = new PropertyModel(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getProperties = async (_req: Request, res: Response) => {
  try {
    const properties = await PropertyModel.find();
    res.json(properties);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
