import { Request, Response } from "express";
import { CandidateType } from "../models/type";
import cloudinary from "cloudinary";
import multer from "multer";
import Candidate from "../models/candidate";

import verifyToken from "../middleware/auth";
import JobOffer from "../models/jobOffer";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
});

export const uploadPdf = upload.single("imagePdf");

export const sendCandidate = async (req: Request, res: Response) => {
  try {
    const imagePdf = req.file as Express.Multer.File;
    const newCandidate: CandidateType = req.body;

    const pdf = await uploadImage(imagePdf);
    newCandidate.cv = pdf;
    newCandidate.offerId = req.params.offerId;

    const candidate = new Candidate(newCandidate);

    await candidate.save();
  } catch (e) {
    res.status(500).send({ message: "Something wrong" });
  }
};

export const getCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await Candidate.find({ offerId: req.params.offerId });
    res.json(candidates);
  } catch (e) {
    res.status(500).send({ message: "Something wrong" });
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
      offerId: offer.companyId,
    });

    res.json(candidate);
  } catch (e) {
    res.status(500).send({ message: "Somethink wrong" });
  }
};

const uploadImage = async (imageFile: Express.Multer.File) => {
  const b64 = Buffer.from(imageFile.buffer).toString("base64");
  let dataURI = "data:" + imageFile.mimetype + ";base64," + b64;
  const res = await cloudinary.v2.uploader.upload(dataURI);

  const imageUrls = await Promise.reject(res.url);
  return imageUrls;
};
