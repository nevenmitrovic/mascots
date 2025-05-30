import { NextFunction, Request, Response } from "express";

import { Controller } from "interfaces/controller.interface";

import { EventService } from "events/event.service";
import { eventPatchSchema, eventSchema } from "events/event.validate";
import { validationMiddleware } from "middlewares/validate.middleware";
import { authMiddleware } from "middlewares/auth.middleware";
import { authorizeMiddleware } from "middlewares/authorize.middleware";

export class EventController extends Controller {
  private eventService = new EventService();
  private schema = eventSchema;
  private patchSchema = eventPatchSchema;

  constructor() {
    super("/events");
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(this.schema),
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.createEvent(req, res, next)
    );
    this.router.get(
      `${this.path}/:year/:month`,
      authMiddleware,
      authorizeMiddleware(["admin", "user"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.getEvents(req, res, next)
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(this.schema),
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.updateEvent(req, res, next)
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.deleteEvent(req, res, next)
    );
    this.router.patch(
      `${this.path}/:id`,
      validationMiddleware(this.patchSchema),
      authMiddleware,
      authorizeMiddleware(["admin", "user"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.patchEvent(req, res, next)
    );
  }

  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await this.eventService.createEvent(req.body);

      return res.status(201).json(event);
    } catch (err) {
      next(err);
    }
  }

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { year, month } = req.params;
      const events = await this.eventService.getEvents(
        Number(year),
        Number(month)
      );

      return res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await this.eventService.updateEvent(id, req.body);

      return res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }

  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await this.eventService.deleteEvent(id);

      return res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }

  async patchEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const event = await this.eventService.patchEvent(id, req.body);

      return res.status(200).json(event);
    } catch (err) {
      next(err);
    }
  }
}
