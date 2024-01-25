import express from "express";
import verifyToken from "../middleware/auth";
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

router.get("/:offerId", getSingleOffer);

router.put("/:offerId", verifyToken, updateOffer);

router.delete("/:offerId", verifyToken, deleteOffeer);

export default router;
