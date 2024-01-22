import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { CompanyType, LocalizationType } from "./type";

const localizationSchema = new mongoose.Schema<LocalizationType>({
  country: { type: String, required: true, unique: true },
  city: { type: String, required: true, unique: true },
  street: { type: String, required: true, unique: true },
  number: { type: String, required: true, unique: true },
  zipCode: { type: String, required: true, unique: true },
});

const companySchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  localization: [localizationSchema],
  imageUrls: [{ type: String, required: true }],
  workingSince: { type: Date, required: true },
});

companySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Company = mongoose.model<CompanyType>("Company", companySchema);

export default Company;
