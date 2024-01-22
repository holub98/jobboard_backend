import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { JobOfferType } from "../models/type";
import JobOffer from "../models/jobOffer";

const router = express.Router();

router.post("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const newJobOffer: JobOfferType = req.body;

    newJobOffer.companyId = req.companyId;

    const jobOffer = new JobOffer(newJobOffer);
    await jobOffer.save();
    res.status(201).send(jobOffer);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something wrong" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const jobOffers = await JobOffer.find();
    res.json(jobOffers);
  } catch (e) {
    res.status(500).json({ message: "Error, no job offers" });
  }
});
