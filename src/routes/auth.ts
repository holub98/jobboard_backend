import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import { login, logout, validate } from "../controllers/auth";

const router = express.Router();

router.post("/login", login);

router.get("/validate-token", verifyToken, validate);

router.post("/logout", logout);

export default router;
