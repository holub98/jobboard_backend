import express, { Request, Response } from "express";
import { JobOfferType } from "../models/type";
import JobOffer from "../models/jobOffer";

const router = express.Router();

export const createOffer = async (req: Request, res: Response) => {
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
};

export const getOffers = async (req: Request, res: Response) => {
  try {
    const jobOffers = await JobOffer.find();
    res.json(jobOffers);
  } catch (e) {
    res.status(500).json({ message: "Error, no job offers" });
  }
};
