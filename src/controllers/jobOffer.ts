import { Request, Response } from "express";
import { JobOfferType } from "../models/type";
import JobOffer from "../models/jobOffer";

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

export const getSingleOffer = async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const offer = await JobOffer.findOne({ _id: id });
    res.json(offer);
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  try {
    const offer = await JobOffer.findOneAndUpdate({
      _id: req.params.id,
      companyId: req.companyId,
    });

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    await offer.save();
    res.status(201).json(offer);
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
};

export const deleteOffeer = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const offer = await JobOffer.findOneAndDelete({
      _id: id,
      companyId: req.companyId,
    });
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    await offer.save();
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
};
