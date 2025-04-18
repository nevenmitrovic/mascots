import { MongoServerError } from "mongodb";

import { DatabaseError } from "errors/database.error";
import { UniqueConstraintError } from "errors/unique-constraint.error";
import {
  ILocation,
  ILocationDocument,
  LocationModel,
} from "locations/location.model";

export class LocationRepository {
  private locationModel = LocationModel;

  async createLocation(locationData: ILocation): Promise<ILocationDocument> {
    try {
      const res = await this.locationModel.create(locationData);
      return {
        ...res.toObject(),
        _id: res._id.toString(),
      } as ILocationDocument;
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

  getLocationById(id: string): Promise<ILocationDocument | null> {
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
    id: string,
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

  async deleteLocation(id: string): Promise<ILocationDocument | null> {
    try {
      return await this.locationModel.findByIdAndDelete(id);
    } catch (err) {
      if (err instanceof MongoServerError) {
        throw new DatabaseError("failed to delete location: MongooseError");
      }

      throw new Error("unknown error in location repository");
    }
  }
}
