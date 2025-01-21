declare global {
  namespace Express {
    export interface Request { 
      id:string;
    }
  }
}




import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { errorResponse } from "../utils/helper";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies["zapier-token"] as unknown as string;
    if (!token) {
      errorResponse(res, 403, "You are not logged in!");
      return;
    }
    const payload = jwt.verify(token, JWT_PASSWORD!);
    // @ts-ignore
    req.id = payload.id; ;
    next();
  } catch (error) {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
}
