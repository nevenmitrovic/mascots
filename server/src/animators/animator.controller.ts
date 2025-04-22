import { NextFunction, Request, Response } from "express";

import { BadRequestError } from "errors/bad-request.error";
import { Controller } from "interfaces/controller.interface";

import { AnimatorService } from "animators/animator.service";

import { animatorSchema } from "animators/animator.validate";

import { validationMiddleware } from "middlewares/validate.middleware";

export class AnimatorController extends Controller {
  private readonly animatorService = new AnimatorService();
  private schema = animatorSchema;

  constructor() {
    super("/animators");
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(this.schema),
      (req: Request, res: Response, next: NextFunction) =>
        this.createAnimator(req, res, next)
    );

    this.router.get(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getAnimators(req, res, next)
    );

    this.router.get(
      `${this.path}/:id`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getAnimatorById(req, res, next)
    );

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(this.schema),
      (req: Request, res: Response, next: NextFunction) =>
        this.updateAnimator(req, res, next)
    );

    this.router.delete(
      `${this.path}/:id`,
      (req: Request, res: Response, next: NextFunction) =>
        this.deleteAnimator(req, res, next)
    );
  }

  async createAnimator(req: Request, res: Response, next: NextFunction) {
    try {
      const newAnimator = await this.animatorService.createAnimator(req.body);
      return res.status(201).json(newAnimator);
    } catch (err) {
      next(err);
    }
  }

  async getAnimators(_req: Request, res: Response, next: NextFunction) {
    try {
      const animators = await this.animatorService.getAnimators();
      return res.status(200).json(animators);
    } catch (err) {
      next(err);
    }
  }

  async getAnimatorById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new BadRequestError("missing id in request params");
      }

      const animator = await this.animatorService.getAnimatorById(id);
      return res.status(200).json(animator);
    } catch (err) {
      next(err);
    }
  }

  async updateAnimator(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new BadRequestError("missing id in request params");
      }
      const updatedAnimator = await this.animatorService.updateAnimator(
        id,
        req.body
      );

      return res.status(200).json(updatedAnimator);
    } catch (err) {
      next(err);
    }
  }

  async deleteAnimator(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!id) {
        throw new BadRequestError("missing id in request params");
      }
      const deletedAnimator = await this.animatorService.deleteAnimator(id);

      return res.status(200).json(deletedAnimator);
    } catch (err) {
      next(err);
    }
  }
}
