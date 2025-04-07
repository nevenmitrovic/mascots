import { MongoServerError } from "mongodb";

import { ILocation, LocationModel } from "locations/location.model";
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
        console.error(err);
        throw new DatabaseError("failed to create location: MongooseError");
      }

      console.error(err);
      throw new Error("unknown error in location repository");
    }
  }
}
