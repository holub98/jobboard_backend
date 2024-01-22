import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { LoginValidation, login, logout } from "../controllers/auth";

const router = express.Router();

router.post("/login", login);

router.get("/validate-token", verifyToken, LoginValidation);

router.post("/logout", logout);

export default router;
