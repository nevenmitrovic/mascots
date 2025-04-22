import { checkForErrors } from "utils/globalUtils";

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
      return checkForErrors(err);
    }
  }

  getLocations(): Promise<ILocationDocument[]> {
    try {
      return this.locationModel.find({});
    } catch (err) {
      return checkForErrors(err);
    }
  }

  getLocationById(id: string): Promise<ILocationDocument | null> {
    try {
      return this.locationModel.findById(id);
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async updateLocation(
    id: string,
    data: ILocation
  ): Promise<ILocationDocument | null> {
    try {
      return await this.locationModel.findByIdAndUpdate(id, data, {
        new: true,
        timestamps: false,
      });
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async deleteLocation(id: string): Promise<ILocationDocument | null> {
    try {
      return await this.locationModel.findByIdAndDelete(id);
    } catch (err) {
      return checkForErrors(err);
    }
  }
}
