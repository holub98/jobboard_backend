import mongoose from "mongoose";
import {
  CandidateType,
  EducationType,
  ExperienceType,
  LanguagesType,
} from "./type.js";

const experienceSchema = new mongoose.Schema<ExperienceType>({
  companyName: { type: String, required: true },
  job: { type: String, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: false },
  description: { type: String, required: true },
});
const educationSchema = new mongoose.Schema<EducationType>({
  schoolName: { type: String, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: false },
  faculty: { type: String, required: true },
});
const languagesSchema = new mongoose.Schema<LanguagesType>({
  name: { type: String, required: true },
  level: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "C1", "C2", "NATIVE"],
    default: "B2",
  },
});
const candidateSchema = new mongoose.Schema<CandidateType>({
  offerId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  experience: [experienceSchema],
  education: [educationSchema],
  languages: [languagesSchema],
  stack: [{ type: String, required: true }],
  another: { type: String, required: false },
});

const Candidate = mongoose.model<CandidateType>("Candidate", candidateSchema);

export default Candidate;
