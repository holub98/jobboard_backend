import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import express from 'express'

const app = express()

declare global {
  namespace Express {
    interface Request {
      companyId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(401).json({ message:'unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.companyId = (decoded as JwtPayload).companyId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'unauthorized' });
  }
};

export default verifyToken;
