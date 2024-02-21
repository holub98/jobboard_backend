import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import Company from "../models/company.js";

export const LoginValidation = [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

export const validate = async (req: Request, res: Response) => {
  const companyId = req.companyId;
  const isAuth = true;
  try {
    res.status(200).send({ companyId, isAuth });
  } catch (e) {
    res.status(404).send({ e });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { companyId: company.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      domain: "",
      httpOnly: false,
      secure: true,
      maxAge: 86400000,
    });
    res.status(200).json({
      data: { id: company.id, name: company.name },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const vaidation = (req: Request, res: Response) => {
  res.status(200).send({ companyId: req.companyId });
};

export const logout = (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
};
