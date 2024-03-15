import express, { Request, Response } from "express";
import Company from "../models/company.js";
import jwt from "jsonwebtoken";
import { CandidateType, CompanyType } from "../models/type.js";
import JobOffer from "src/models/jobOffer.js";
import Candidate from "src/models/candidate.js";

const router = express.Router();

export const myCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.companyId);
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }
    const myOffersCount = await JobOffer.countDocuments({
      companyId: req.companyId,
    });
    res.json({ company, myOffersCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const newCompany: CompanyType = req.body;

    const company = new Company(newCompany);

    await company.save();

    const token = jwt.sign(
      { companyId: company.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).send({ id: company.id, name: company.name });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find().select("-email -password");
    const offers = await JobOffer.find();

    const allCompanies = companies.map((company) => {
      return {
        company,
        actualOffers: offers.filter((it) => it.companyId == company._id).length,
      };
    });
    res.json(allCompanies);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
export const getSingleCompany = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.companyId).select(
      " -password"
    );
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const offers = await JobOffer.find({ companyId: company._id });
    const actualOffers = await JobOffer.countDocuments({
      companyId: company._id,
    });

    res.json({ company, offers, actualOffers });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const updateMyCompany = async (req: Request, res: Response) => {
  const update: CompanyType = req.body;

  try {
    const myCompany = await Company.findByIdAndUpdate(req.companyId, update, {
      new: true,
    });
    if (!myCompany) {
      return res.status(401);
    }
    await myCompany.save();
    res.status(201).json(myCompany);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const account = await Company.findById(req.companyId);
    if (!account) {
      return res.status(401);
    }
    const offers = await JobOffer.find({ companyId: account._id });

    offers.map(async (offer) => {
      await Candidate.deleteMany({ offerId: offer._id });
    });
    await JobOffer.deleteMany({ companyId: account._id });
    Company.findByIdAndDelete(req.companyId);

    res.cookie("auth_token", "", {
      expires: new Date(0),
    });
    res.send();
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

export default router;
