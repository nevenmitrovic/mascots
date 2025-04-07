import { LocationRepository } from "locations/location.repository";
import { ILocationResponse, ILocation } from "locations/location.model";
import { ErrorHandlerService } from "services/error-handler.service";
import { HttpError } from "errors/http.error";

export class LocationService {
  private locationRepository = new LocationRepository();
  private errorHandler = new ErrorHandlerService();

  async createLocation(
    locationData: ILocation
  ): Promise<ILocationResponse | HttpError> {
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
}
