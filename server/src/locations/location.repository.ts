import { ILocation, LocationModel } from "locations/location.model";

export class LocationRepository {
  private locationModel = LocationModel;

  async createLocation(locationData: ILocation): Promise<ILocation> {
    try {
      return await this.locationModel.create(locationData);
    } catch (err) {
      console.error("error with database", err);
      throw new Error("error with database");
    }
  }
}
