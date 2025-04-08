import { NextFunction, Request, Response } from "express";

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

    this.router.get(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getLocations(req, res, next)
    );

    this.router.get(
      `${this.path}/:id`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getLocationById(req, res, next)
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

  async getLocations(_req: Request, res: Response, next: NextFunction) {
    try {
      const locations = await this.locationService.getLocations();
      return res.status(200).json(locations);
    } catch (err) {
      next(err);
    }
  }

  async getLocationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("missing id in request params");
      }

      const location = await this.locationService.getLocationById(id);
      return res.status(200).json(location);
    } catch (err) {
      next(err);
    }
  }
}
