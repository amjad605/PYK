import { Router } from "express";
import propertyRouter from "./property/property.router";
import authRouter from "./auth/auth.router";
import usersRouter from "./users/users.router";
const appRouter = Router();

appRouter.use("/property", propertyRouter);
appRouter.use("/auth", authRouter);
appRouter.use("/users", usersRouter);
export default appRouter;
