import { Request, Response } from "express";
import { JobOfferType, OffersFilterType } from "../models/type.js";
import JobOffer from "../models/jobOffer.js";
import Company from "../models/company.js";
import Candidate from "../models/candidate.js";

export type FilterType = {
  name?: string | RegExp;
  requirements?: string[];
  workDirection?: string;
  localizationCompany?: string[];
};

export const createOffer = async (req: Request, res: Response) => {
  try {
    const newJobOffer: JobOfferType = req.body;

    newJobOffer.companyId = req.companyId;
    newJobOffer.createAt = new Date();
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
    const filterOffer: OffersFilterType = req.query;

    let body: FilterType = {};
    if (filterOffer.name) {
      body.name = new RegExp(filterOffer.name, "i");
    }
    if (filterOffer.localization) {
      const company = await Company.find({
        "localization.city": filterOffer.localization,
      });
      if (company) {
        body.localizationCompany = company.map((it) => it._id);
      }
    }
    if (filterOffer.requirements) {
      body.requirements = { $all: filterOffer.requirements } as any;
    }
    if (filterOffer.workDirection) {
      body.workDirection = filterOffer.workDirection;
    }
    const jobOffers = await JobOffer.find(body);
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

export const getRecomendedOffer = async (req: Request, res: Response) => {
  try {
    const count = await JobOffer.countDocuments({});
    const random = Math.floor(Math.random() * (count - 3));
    const offer = await JobOffer.find().skip(random).limit(3);
    res.json(offer);
  } catch (e) {
    res.status(500).json({ message: e });
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
