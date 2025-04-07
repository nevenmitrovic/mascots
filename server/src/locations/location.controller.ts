import { Router, NextFunction, Request, Response } from "express";

import { LocationService } from "locations/location.service";
import { ILocation } from "locations/location.model";
import { Controller } from "interfaces/controller.interface";
import { validationMiddleware } from "middlewares/validate.middleware";
import { locationSchema } from "locations/location.validate";
import { BadRequestError } from "errors/bad-request.error.js";

export class LocationController extends Controller {
  private readonly locationService = new LocationService();
  private schema = locationSchema;

  constructor() {
    super("/locations");
    this.initializeRoutes();
  }

  protected async initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(this.schema),
      (req: Request, res: Response, next: NextFunction) =>
        this.createLocation(req, res, next)
    );
  }

  async createLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const newLocation = await this.locationService.createLocation(req.body);
      return res.status(201).json(newLocation);
    } catch (err) {
      next(err);
    }
  }
}
