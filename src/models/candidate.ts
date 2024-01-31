import mongoose from "mongoose";
import { CandidateType } from "./type.js";

const candidateSchema = new mongoose.Schema<CandidateType>({
  offerId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cv: { type: String, required: true },
});

const Candidate = mongoose.model<CandidateType>("Candidate", candidateSchema);

export default Candidate;
