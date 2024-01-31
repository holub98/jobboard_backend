import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import companyRoutes from "./routes/companies.js";
import offersRoutes from "./routes/jobOffer.js";
import candiateRoutes from "./routes/candidate.js";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.DATABASE_URL as string);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// app.use((req: Request, res: Response) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
// });

app.use("/api/auth", authRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job-offer", offersRoutes);
app.use("/api/candidates", candiateRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.send("Welcome to Express");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
