import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  createOffer,
  deleteOffer,
  getCompanyOffersInfo,
  getMyOffers,
  getOffers,
  getSingleOffer,
  updateOffer,
} from "../controllers/jobOffer.js";

const router = express.Router();

router.post("/create", verifyToken, createOffer);

router.get("/", getOffers);

router.get("/my-offer", verifyToken, getMyOffers);

router.get("/my-offer-count", verifyToken, getCompanyOffersInfo);

router.get("/:offerId", getSingleOffer);

router.put("/:offerId", verifyToken, updateOffer);

router.delete("/:offerId", verifyToken, deleteOffer);

export default router;
