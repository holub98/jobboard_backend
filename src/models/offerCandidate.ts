import mongoose from "mongoose";
import { OfferCandidateType } from "./type.js";

const offerCandidateSchema = new mongoose.Schema<OfferCandidateType>({
  candidateId: { type: String, required: true },
  offerId: { type: String, required: true },
});

const OfferCandidate = mongoose.model<OfferCandidateType>(
  "offerCandidate",
  offerCandidateSchema
);
export default OfferCandidate;
