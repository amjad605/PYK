import { Router } from "express";
import { Request, Response } from "express";

import propertyController from "./property.controller";
const propertyRouter = Router();
propertyRouter.get("/filter", propertyController.getProperties);
propertyRouter.post("/", propertyController.createProperty);
propertyRouter.delete("/:id", propertyController.deleteProperty);

export default propertyRouter;
