import { Response } from "express";
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
