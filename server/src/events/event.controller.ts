import { NextFunction, Request, Response } from "express";

import { Controller } from "interfaces/controller.interface";

import { EventService } from "events/event.service";

export class EventController extends Controller {
  private eventService = new EventService();

  constructor() {
    super("/events");
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) =>
        this.createEvent(req, res, next)
    );
    this.router.get(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getEvents(req, res, next)
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

  async getEvents(_req: Request, res: Response, next: NextFunction) {
    try {
      const events = await this.eventService.getEvents();
      return res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  }
}
