import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  deleteAccount,
  getAllCompanies,
  getSingleCompany,
  myCompany,
  register,
  updateMyCompany,
} from "../controllers/companies.js";

const router = express.Router();

router.get("/my-company", verifyToken, myCompany);

router.post("/register", register);

router.get("/", getAllCompanies);

router.get("/:companyId", getSingleCompany);

router.put("/update-me", verifyToken, updateMyCompany);
router.put("/delete-account", verifyToken, deleteAccount);

export default router;
