import { HttpError } from "errors/http.error";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "something went wrong";

  console.error(`${err.message}`);

  return res.status(statusCode).json({ statusCode, message });
}
