import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth.js";
import { login, logout, validate } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.get("/validate-token", verifyToken, validate);

router.post("/logout", logout);

export default router;
