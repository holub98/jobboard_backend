import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { JobOfferType } from "../models/type";
import JobOffer from "../models/jobOffer";
import { createOffer, getOffers } from "../controllers/jobOffer";

const router = express.Router();

router.post("/", verifyToken, createOffer);

router.get("/", getOffers);

export default router;
