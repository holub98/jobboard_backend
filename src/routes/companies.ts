import express from "express";
import verifyToken from "../middleware/auth.js";
import { myCompany, register } from "../controllers/companies.js";

const router = express.Router();

router.get("/my-company", verifyToken, myCompany);

router.post("/register", register);

export default router;
