import { HttpError } from "errors/http.error";
import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const name = err.name || "InternalServerError";
  const message = err.message || "something went wrong";

  console.error(`${name}: ${err.message}`);

  return res.status(statusCode).json({ statusCode, name, message });
}
