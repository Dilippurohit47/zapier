import { Response } from "express";
import JWT from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
export const errorResponse = (res: Response, code: number, message: string) => {
  return res.status(code).json({
    message: message,
  });
};

interface errorType {
  message: string;
}

export const formatZodError = (error: errorType[]) => {
  const formatedError: string[] = [];

  error.forEach((e) => {
    formatedError.push(e.message);
  });
  return formatedError;
};

interface UserType {
  id: number;
}
export const sendToken = (res: Response, user: UserType) => {
  if (!res || !user || !user.id) {
    console.error("Invalid response or user data provided");
    return;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const cookieName = process.env.COOKIE_NAME || "zapier-token";

  try {
    const token = JWT.sign({ id: user.id }, JWT_PASSWORD!, {
      expiresIn: "30d",
    });

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: isProduction,
      path: "/",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

  } catch (err) {
    console.error("Error generating or sending token:", err);
  }
};
