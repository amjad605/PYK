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
const port = 3000;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.0.2:5173"], // 👈 رابط الـ frontend
    credentials: true,
  })
);
app.use(appRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use(globalErrorHandler);
mongoose.connect(process.env.DB_URL || "").then(() => {
  console.log("Connected to database");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
