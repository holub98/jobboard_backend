import express, { Request, Response } from "express";
import Company from "../models/company.js";
import jwt from "jsonwebtoken";

import { CompanyType } from "../models/type.js";

const router = express.Router();

export const myCompany = async (req: Request, res: Response) => {
  const companyId = req.companyId;

  try {
    const company = await Company.findById(companyId).select("-password");
    if (!company) {
      return res.status(400).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const newCompany: CompanyType = req.body;

    const company = new Company(newCompany);

    await company.save();

    const token = jwt.sign(
      { companyId: company.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).send({ id: company.id, name: company.name });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

export default router;
