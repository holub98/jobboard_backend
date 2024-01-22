import mongoose from "mongoose";
import { CandidateType } from "./type";

const candidateSchema = new mongoose.Schema<CandidateType>({
  offerId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  cv: { type: String, required: true, unique: true },
});

const Candidate = mongoose.model<CandidateType>("Candidate", candidateSchema);

export default Candidate;
