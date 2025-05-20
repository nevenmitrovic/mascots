import { Controller } from "interfaces/controller.interface";
import { AuthService } from "auth/auth.service";
import { loginSchema } from "auth/auth.validation";
import { validationMiddleware } from "middlewares/validate.middleware";
import { authMiddleware } from "middlewares/auth.middleware";

import { NextFunction, Request, Response } from "express";

import { BadRequestError } from "errors/bad-request.error";
import { authorizeMiddleware } from "middlewares/authorize.middleware";

export class AuthController extends Controller {
  private readonly authService = new AuthService();
  private readonly schema = loginSchema;

  constructor() {
    super("/auth");
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(this.schema),
      (req: Request, res: Response, next: NextFunction) =>
        this.login(req, res, next)
    );
    this.router.get(
      `${this.path}/me/:id`,
      authMiddleware,
      authorizeMiddleware(["admin", "user"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.isLoggedIn(req, res, next)
    );
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    try {
      const response = await this.authService.login(username, password);
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async isLoggedIn(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("missing id in request params");
    }

    try {
      const animator = await this.authService.isLoggedIn(id);
      res.status(200).json(animator);
    } catch (err) {
      next(err);
    }
  }
}
