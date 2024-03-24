import { Request, Response } from "express";
import { CandidateType } from "../models/type.js";
import Candidate from "../models/candidate.js";
import JobOffer from "../models/jobOffer.js";
import Company from "../models/company.js";

export const sendCandidate = async (req: Request, res: Response) => {
  try {
    const newCandidate: CandidateType = req.body;

    newCandidate.offerId = req.params.offerId;

    const candidate = new Candidate(newCandidate);

    await candidate.save();
    res.json(candidate);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const getCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find({ offerId: req.params.offerId });
    res.json(candidates);
  } catch (e) {
    res.status(500).send({ message: e });
  }
};

export const getSingleCandidates = async (req: Request, res: Response) => {
  try {
    const offer = await JobOffer.findOne({
      _id: req.params.offerId,
      companyId: req.companyId,
    });

    if (!offer) {
      return res.send(404);
    }
    const candidate = await Candidate.findOne({
      _id: req.params.candidateId,
      offerId: offer._id,
    });
    const company = await Company.findById(req.companyId);

    res.json({ candidate, offer, company });
  } catch (e) {
    res.status(500).send({ message: e });
  }
};
