import { BadRequestError } from "errors/bad-request.error";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { Controller } from "interfaces/controller.interface";
import { validationMiddleware } from "middlewares/validate.middleware";
import { MascotService } from "mascots/mascot.service";
import { mascotSchema } from "mascots/mascot.validate";
import { authMiddleware } from "middlewares/auth.middleware";
import { authorizeMiddleware } from "middlewares/authorize.middleware";

export class MascotController extends Controller {
  private mascotService = new MascotService();
  private schema = mascotSchema;

  constructor() {
    super("/mascots");
    this.initializeRoutes();
  }

  protected async initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(this.schema),
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.createMascot(req, res, next)
    );
    this.router.get(
      `${this.path}`,
      authMiddleware,
      authorizeMiddleware(["admin", "user"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.getMascots(req, res, next)
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(this.schema),
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.updateMascot(req, res, next)
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.deleteMascot(req, res, next)
    );
  }

  async createMascot(req: Request, res: Response, next: NextFunction) {
    try {
      const newMascota = await this.mascotService.createMascot(req.body);
      return res.status(201).json(newMascota);
    } catch (error) {
      next(error);
    }
  }

  async getMascots(_req: Request, res: Response, next: NextFunction) {
    try {
      const mascots = await this.mascotService.getMascots();
      return res.status(200).json(mascots);
    } catch (error) {
      next(error);
    }
  }

  async updateMascot(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const updatedMascot = await this.mascotService.updateMascot(id, req.body);
      return res.status(200).json(updatedMascot);
    } catch (error) {
      next(error);
    }
  }

  async deleteMascot(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!id) {
        throw new BadRequestError("missing id in request params");
      }

      const deletedMascot = await this.mascotService.deleteMascot(id);
      return res.status(200).json(deletedMascot);
    } catch (err) {
      next(err);
    }
  }
}
