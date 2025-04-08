import { LocationRepository } from "locations/location.repository";
import { ILocationPostResponse, ILocation } from "locations/location.model";
import { ErrorHandlerService } from "services/error-handler.service";

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

  async getLocations(): Promise<ILocation[]> {
    try {
      return await this.locationRepository.getLocations();
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
