import express from "express";
import {
  getCandidates,
  getSingleCandidates,
  sendCandidate,
  uploadPdf,
} from "../controllers/candidate.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/:offerId/send", uploadPdf, sendCandidate);
router.get("/:offerId", verifyToken, getCandidates);
router.get("/:offerId/:candidateId", verifyToken, getSingleCandidates);

export default router;
