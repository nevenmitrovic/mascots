import { Types } from "mongoose";

import { LocationRepository } from "locations/location.repository";
import {
  ILocationPostResponse,
  ILocation,
  ILocationDocument,
} from "locations/location.model";
import { ErrorHandlerService } from "services/error-handler.service";
import { BadRequestError } from "errors/bad-request.error.js";
import { NotFoundError } from "errors/not-found.error";

export class LocationService {
  private locationRepository = new LocationRepository();
  private errorHandler = new ErrorHandlerService();

  async createLocation(
    locationData: ILocation
  ): Promise<ILocationPostResponse> {
    try {
      const location = await this.locationRepository.createLocation(
        locationData
      );
      return { message: "location created successfully", data: location };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getLocations(): Promise<ILocationDocument[]> {
    try {
      return await this.locationRepository.getLocations();
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getLocationById(id: string): Promise<ILocationDocument | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid ID format");
      }

      const objectId = new Types.ObjectId(id);
      const location = await this.locationRepository.getLocationById(objectId);
      if (!location) {
        throw new NotFoundError("location not found");
      }

      return location;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
