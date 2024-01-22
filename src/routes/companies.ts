import express from "express";
import verifyToken from "../middleware/auth";
import {
  myCompany,
  register,
  registerValidation,
  uploadImg,
} from "../controllers/companies";

const router = express.Router();

router.get("/my-company", verifyToken, myCompany);

router.post("/register", registerValidation, uploadImg, register);

export default router;
