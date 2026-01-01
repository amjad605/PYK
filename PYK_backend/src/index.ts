import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import appRouter from "./appRouter";
import { globalErrorHandler } from "./utils/GlobalErrorHandler";
const app = express();
const port = 8080;
app.use(express.json());
app.use(
  cors({
    origin: "*", // or your frontend domain
  })
);

app.use(appRouter);

app.use(globalErrorHandler);
try {
  mongoose.connect(process.env.DB_URL || "").then(() => {
    console.log("Connected to database");
  });
} catch {
  console.log("failed to connect to database");
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
