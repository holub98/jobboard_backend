import express from "express";
import { sendCandidate, uploadPdf } from "../controllers/candidate";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post("/send", uploadPdf, sendCandidate);
router.get("/", verifyToken);
router.get("/:id");
