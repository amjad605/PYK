import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import mongoose from "mongoose";
import "dotenv/config";
import appRouter from "./appRouter";
const app = express();
const port = 3000;
app.use(express.json());
app.use(appRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

mongoose.connect(process.env.DB_URL || "").then(() => {
  console.log("Connected to database");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
