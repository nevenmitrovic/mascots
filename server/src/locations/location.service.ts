import { LocationRepository } from "locations/location.repository";
import { ILocationResponse, ILocation } from "locations/location.model";

export class LocationService {
  private locationRepository = new LocationRepository();

  async createLocation(locationData: ILocation): Promise<ILocationResponse> {
    try {
      const location = await this.locationRepository.createLocation(
        locationData
      );
      return { message: "location created successfully", data: location };
    } catch (err) {
      console.error(err);
      throw new Error(`error creating location: ${err}`);
    }
  }
}
