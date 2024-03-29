import { Request, Response } from "express";
import { JobOfferType, OffersFilterType } from "../models/type.js";
import JobOffer from "../models/jobOffer.js";
import Company from "../models/company.js";
import Candidate from "../models/candidate.js";

export type FilterType = {
  name?: string | RegExp;
  requirements?: string[];
  workDirection?: string;
  companyId?: string[];
};

export const createOffer = async (req: Request, res: Response) => {
  try {
    const newJobOffer: JobOfferType = req.body;

    newJobOffer.companyId = req.companyId;
    const jobOffer = new JobOffer(newJobOffer);
    await jobOffer.save();
    res.status(201).send(jobOffer);
  } catch (e) {
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
        "localization.city": new RegExp(filterOffer.localization, "i"),
      });
      if (company) {
        body.companyId = company.map((it) => it._id);
      }
    }
    if (filterOffer.requirements) {
      body.requirements = { $all: filterOffer.requirements } as any;
    }
    if (filterOffer.workDirection) {
      body.workDirection = filterOffer.workDirection;
    }
    const jobOffers = await JobOffer.find(body);
    const companyOffer = await Company.find().select("-email -password");

    const allOffers = jobOffers.map((offer) => {
      return {
        offer,
        company: companyOffer.find((it) => it._id == offer.companyId),
      };
    });
    res.json(allOffers);
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

    const company = await Company.findById(offer?.companyId).select(
      "-email -password"
    );
    res.json({ offer, company });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const getMySingleOffer = async (req: Request, res: Response) => {
  try {
    const offer = await JobOffer.findOne({ _id: req.params.offerId });
    res.json(offer);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const getRecomendedOffer = async (req: Request, res: Response) => {
  try {
    const count = await JobOffer.countDocuments({});
    if (count < 3) {
      return res.json([]);
    }
    const random = Math.floor(Math.random() * (count - 3));
    const offer = await JobOffer.find().skip(random).limit(3);

    res.json(offer);
  } catch (e) {
    res.status(404).json({ message: "We do not have any recomended offers" });
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
    await Candidate.deleteMany({ offerId: req.params.offerId });
    await JobOffer.findByIdAndDelete(req.params.offerId);
  } catch (e) {
    res.status(500).json({ message: "Something wrong" });
  }
};
