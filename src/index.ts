import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import companyRoutes from "./routes/companies.js";
import offersRoutes from "./routes/jobOffer.js";
import candiateRoutes from "./routes/candidate.js";
import cookieParser from "cookie-parser";
import cors from "cors";

mongoose.connect(process.env.DATABASE_URL as string);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: `https://jobboard-gabrielh.vercel.app`,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job-offer", offersRoutes);
app.use("/api/candidates", candiateRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin",`https://jobboard-gabrielh.vercel.app` );
  res.setHeader("Access-Control-Allow-Credentials", 'true');
  res.send("Welcome to Express");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
