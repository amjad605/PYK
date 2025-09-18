import { Router } from "express";
import propertyRouter from "./property/property.router";
const appRouter = Router();

appRouter.use("/property", propertyRouter);

export default appRouter;
