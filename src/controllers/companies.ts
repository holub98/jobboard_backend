import express, { Request, Response } from "express";
import Company from "../models/company";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import multer from "multer";
import cloudinary from "cloudinary";
import { CompanyType } from "../models/type";

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

export const registerValidation = [
  check("name", "Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters required").isLength({
    min: 6,
  }),
];

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
export const uploadImg = upload.array("imageFiles", 10);

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newCompany: CompanyType = req.body;

    const images = await uploadImages(imageFiles);

    newCompany.imageUrls = images;

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
    return res.status(200).send({ message: "Company registered OK" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
};

export default router;
