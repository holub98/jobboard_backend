import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { CompanyType, LocalizationType } from "./type.js";

const localizationSchema = new mongoose.Schema<LocalizationType>({
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const companySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  localization: localizationSchema,
});

companySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Company = mongoose.model<CompanyType>("Company", companySchema);

export default Company;
