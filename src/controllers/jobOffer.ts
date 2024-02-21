import { Request, Response } from "express";
import { JobOfferType } from "../models/type.js";
import JobOffer from "../models/jobOffer.js";
import Company from "../models/company.js";
import Candidate from "../models/candidate.js";

export const createOffer = async (req: Request, res: Response) => {
  try {
    const newJobOffer: JobOfferType = req.body;

    newJobOffer.companyId = req.companyId;

    const jobOffer = new JobOffer(newJobOffer);
    await jobOffer.save();
    res.status(201).send(jobOffer);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
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

export const getMyOffers = async (req: Request, res: Response) => {
  try {
    const jobOffers = await JobOffer.find({ companyId: req.companyId });

    res.json(jobOffers);
  } catch (e) {
    res.status(500).json({ message: "Error, no job offers" });
  }
};

export const getCompanyOffersInfo = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.companyId).select("-password");
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }
    const count = await JobOffer.countDocuments({ companyId: req.companyId });
    res.json({ name: company.name, count: count });
  } catch (e) {
    res.status(500).json({ message: "Error, no job offers" });
  }
};

export const getSingleOffer = async (req: Request, res: Response) => {
  try {
    const offer = await JobOffer.findOne({ _id: req.params.offerId });
    res.json(offer);
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
};

export const updateOffer = async (req: Request, res: Response) => {
  const update: JobOfferType = req.body;
  try {
    const offer = await JobOffer.findOneAndUpdate(
      {
        _id: req.params.offerId,
        companyId: req.companyId,
      },
      update,
      { new: true }
    );

    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    await offer.save();
    res.status(201).json(offer);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const offer = await JobOffer.findOneAndDelete({
      _id: req.params.offerId,
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
