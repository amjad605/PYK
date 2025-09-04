import { Router } from "express";
import { Request, Response } from "express";
import { createProperty, getProperties } from "./property.controller";
const propertyRouter = Router();
propertyRouter.get("/", getProperties);
propertyRouter.post("/", createProperty);
export default propertyRouter;
