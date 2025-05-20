import e, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "errors/unauthorized.error";
import { AuthenticatedRequest } from "middlewares/auth.middleware";

export function authorizeMiddleware(requireRole: ("admin" | "user")[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.role || !requireRole.includes(req.role))
      return next(new UnauthorizedError("insufficient permissions"));

    next();
  };
}
