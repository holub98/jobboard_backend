import mongoose from "mongoose";
import { JobOfferType } from "./type";

const jobOfferSchema = new mongoose.Schema<JobOfferType>({
  companyId: { type: String, required: true },
  name: { type: String, required: true },
  earnings: [{ type: String, required: true }],
  remotly: {
    type: String,
    enum: ["Remote", "PartlyRemote", "Office"],
    default: "Remote",
  },
  requirements: [{ type: String, required: true }],
  description: { type: String, required: true },
});

const JobOffer = mongoose.model<JobOfferType>("JobOffer", jobOfferSchema);
export default JobOffer;
