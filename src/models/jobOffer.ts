import mongoose from "mongoose";
import { JobOfferType } from "./type.js";

const jobOfferSchema = new mongoose.Schema<JobOfferType>({
  companyId: { type: String, required: true },
  name: { type: String, required: true },
  earnings: {
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  workDirection: {
    type: String,
    enum: ["Remote", "PartlyRemote", "Office"],
    default: "Remote",
  },
  requirements: [{ type: String, required: true }],
  description: { type: String, required: true },
  createAt: { type: String, required: true },
});

const JobOffer = mongoose.model<JobOfferType>("JobOffer", jobOfferSchema);
export default JobOffer;
