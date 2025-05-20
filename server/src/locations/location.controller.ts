import { NextFunction, Request, Response } from "express";

import { BadRequestError } from "errors/bad-request.error";
import { Controller } from "interfaces/controller.interface";
import { LocationService } from "locations/location.service";
import { locationSchema } from "locations/location.validate";
import { validationMiddleware } from "middlewares/validate.middleware";
import { authMiddleware } from "middlewares/auth.middleware";
import { authorizeMiddleware } from "middlewares/authorize.middleware";

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
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.createLocation(req, res, next)
    );

    this.router.get(
      `${this.path}`,
      authMiddleware,
      authorizeMiddleware(["admin", "user"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.getLocations(req, res, next)
    );

    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      authorizeMiddleware(["admin", "user"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.getLocationById(req, res, next)
    );

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(this.schema),
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.updateLocation(req, res, next)
    );

    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      authorizeMiddleware(["admin"]),
      (req: Request, res: Response, next: NextFunction) =>
        this.deleteLocation(req, res, next)
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

  async updateLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("missing id in request params");
      }

      const updatedLocation = await this.locationService.updateLocation(
        id,
        req.body
      );
      return res.status(200).json(updatedLocation);
    } catch (err) {
      next(err);
    }
  }

  async deleteLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new BadRequestError("missing id in request params");
      }

      const deletedLocation = await this.locationService.deleteLocation(id);
      return res.status(200).json(deletedLocation);
    } catch (err) {
      next(err);
    }
  }
}
