import express from "express";
import {
  getCandidates,
  getSingleCandidates,
  sendCandidate,
  uploadPdf,
} from "../controllers/candidate";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/send", uploadPdf, sendCandidate);
router.get("/", verifyToken, getCandidates);
router.get("/:id", verifyToken, getSingleCandidates);
