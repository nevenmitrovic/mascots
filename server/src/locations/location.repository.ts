import { MongoServerError } from "mongodb";
import { Types } from "mongoose";

import {
  ILocation,
  LocationModel,
  ILocationDocument,
} from "locations/location.model";
import { DatabaseError } from "errors/database.error";
import { UniqueConstraintError } from "errors/unique-constraint.error";

export class LocationRepository {
  private locationModel = LocationModel;

  async createLocation(locationData: ILocation): Promise<ILocation> {
    try {
      return await this.locationModel.create(locationData);
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        const value = Object.values(err.keyValue)[0];
        throw new UniqueConstraintError(field, value);
      }

      if (err instanceof MongoServerError) {
        throw new DatabaseError("failed to create location: MongooseError");
      }

      throw new Error("unknown error in location repository");
    }
  }

  getLocations(): Promise<ILocationDocument[]> {
    try {
      return this.locationModel.find({});
    } catch (err) {
      if (err instanceof MongoServerError) {
        throw new DatabaseError("failed to get locations: MongooseError");
      }

      throw new Error("unknown error in location repository");
    }
  }

  getLocationById(id: Types.ObjectId): Promise<ILocationDocument | null> {
    try {
      return this.locationModel.findById(id);
    } catch (err) {
      if (err instanceof MongoServerError) {
        throw new DatabaseError("failed to get location by id: MongooseError");
      }

      throw new Error("unknown error in location repository");
    }
  }

  async updateLocation(
    id: Types.ObjectId,
    data: Partial<ILocation>
  ): Promise<ILocationDocument | null> {
    try {
      return await this.locationModel.findByIdAndUpdate(id, data, {
        new: true,
        timestamps: false,
      });
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        const value = Object.values(err.keyValue)[0];
        throw new UniqueConstraintError(field, value);
      }

      if (err instanceof MongoServerError) {
        throw new DatabaseError("failed to update location: MongooseError");
      }

      throw new Error("unknown error in location repository");
    }
  }
}
