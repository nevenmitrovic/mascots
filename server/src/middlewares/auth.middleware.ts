import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "errors/unauthorized.error";

import { env } from "config/env";

export interface AuthenticatedRequest extends Request {
  role?: "user" | "admin";
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeaeder =
    (req.headers["Authorization"] as string) ||
    (req.headers["authorization"] as string);
  if (!authHeaeder) {
    return next(new UnauthorizedError("missing authorization header"));
  }

  const token = authHeaeder.split(" ")[1];

  if (!token) {
    return next(new UnauthorizedError("missing token"));
  }

  const decoded = jwt.verify(token, env.SECRET_KEY) as {
    _id: string;
    role: "user" | "admin";
  };
  if (!decoded._id) next(new UnauthorizedError("invalid token"));
  if (!decoded.role) next(new UnauthorizedError("invalid token"));

  req.role = decoded.role;
  next();
}
