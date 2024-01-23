import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { JobOfferType } from "../models/type";
import JobOffer from "../models/jobOffer";
import {
  createOffer,
  deleteOffeer,
  getOffers,
  getSingleOffer,
  updateOffer,
} from "../controllers/jobOffer";

const router = express.Router();

router.post("/", verifyToken, createOffer);

router.get("/", getOffers);

router.get("/id", getSingleOffer);

router.put("/id", verifyToken, updateOffer);

router.delete("/id", verifyToken, deleteOffeer);

export default router;
