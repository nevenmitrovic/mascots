import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "errors/unauthorized.error";

import { env } from "config/env";
import { AuthService } from "auth/auth.service";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authService = new AuthService();

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

  const decoded = jwt.verify(token, env.SECRET_KEY) as { _id: string };
  if (!decoded._id) return next(new UnauthorizedError("invalid token"));

  const user = authService.isLoggedIn(decoded._id);
  if (!user) return next(new UnauthorizedError("invalid token"));

  next();
}
