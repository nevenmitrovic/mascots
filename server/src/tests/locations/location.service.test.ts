import { LocationService } from "../../locations/location.service";
import { ErrorHandlerService } from "../../services/error-handler.service";
import { LocationRepository } from "../../locations/location.repository";
import {
  mockLocations,
  mockLocation,
  uniqueData,
  newLocation,
  mockDeleteMessageResponse,
} from "../../../mocks/mock-data";
import { HttpError } from "../../errors/http.error";
import { DatabaseError } from "../../errors/database.error";
import { UniqueConstraintError } from "../../errors/unique-constraint.error";

jest.mock("../../locations/location.repository");

describe("Location Service with error-handler.service", () => {
  let locationService: LocationService;
  let errorHandlerService: ErrorHandlerService;
  let mockLocationRepository: jest.Mocked<LocationRepository>;

  beforeAll(() => {
    // mock the location repository
    mockLocationRepository =
      new LocationRepository() as jest.Mocked<LocationRepository>;
    (LocationRepository as jest.Mock).mockImplementation(
      () => mockLocationRepository
    );

    errorHandlerService = new ErrorHandlerService();
    locationService = new LocationService();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /locations", () => {
    it("should return all locations", async () => {
      mockLocationRepository.getLocations.mockResolvedValue(mockLocations);

      const result = await locationService.getLocations();

      expect(result).toEqual(mockLocations);
      expect(mockLocationRepository.getLocations).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const handledError = errorHandlerService.handleError(
        new DatabaseError("failed to create location: MongooseError")
      );
      mockLocationRepository.getLocations.mockRejectedValue(handledError);

      await expect(locationService.getLocations()).rejects.toThrow(HttpError);
      expect(mockLocationRepository.getLocations).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const handledError = errorHandlerService.handleError(mockError);
      mockLocationRepository.getLocations.mockRejectedValue(handledError);

      await expect(locationService.getLocations()).rejects.toThrow(HttpError);
      expect(mockLocationRepository.getLocations).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET locations/:id", () => {
    it("should return a location by id", async () => {
      mockLocationRepository.getLocationById.mockResolvedValue(mockLocation);

      const result = await locationService.getLocationById(
        "67f5237dcaf56ff295efd4a9"
      );

      expect(result).toEqual(mockLocation);
      expect(mockLocationRepository.getLocationById).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationRepository.getLocationById).toHaveBeenCalledTimes(1);
    });

    it("should throw BadRequestError for invalid id", async () => {
      const invalidId = "invalid-id";

      await expect(locationService.getLocationById(invalidId)).rejects.toThrow(
        HttpError
      );
      expect(mockLocationRepository.getLocationById).not.toHaveBeenCalled();
    });

    it("should throw NotFoundError when location not found", async () => {
      const validId = "507f1f77bcf86cd799439011";
      mockLocationRepository.getLocationById.mockResolvedValue(null);

      await expect(locationService.getLocationById(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockLocationRepository.getLocationById).toHaveBeenCalledWith(
        validId
      );
      expect(mockLocationRepository.getLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const validId = "507f1f77bcf86cd799439011";
      const handledError = errorHandlerService.handleError(
        new DatabaseError("failed to create location: MongooseError")
      );
      mockLocationRepository.getLocationById.mockRejectedValue(handledError);

      await expect(locationService.getLocationById(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockLocationRepository.getLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const validId = "507f1f77bcf86cd799439011";
      const mockError = new Error("unknown error");
      const handledError = errorHandlerService.handleError(mockError);
      mockLocationRepository.getLocationById.mockRejectedValue(handledError);

      await expect(locationService.getLocationById(validId)).rejects.toThrow(
        HttpError
      );
      expect(mockLocationRepository.getLocationById).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /locations", () => {
    it("should create a location successfully", async () => {
      mockLocationRepository.createLocation.mockResolvedValue(mockLocation);

      const result = await locationService.createLocation(mockLocation);

      expect(result).toEqual({
        message: "location created successfully",
        data: mockLocation,
      });
      expect(mockLocationRepository.createLocation).toHaveBeenCalledWith(
        mockLocation
      );
      expect(mockLocationRepository.createLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle UniqueConstraintError", async () => {
      const mockError = new UniqueConstraintError("location", "uniqueName");
      mockLocationRepository.createLocation.mockRejectedValue(mockError);

      await expect(locationService.createLocation(newLocation)).rejects.toThrow(
        HttpError
      );
      expect(mockLocationRepository.createLocation).toHaveBeenCalledWith(
        newLocation
      );
      expect(mockLocationRepository.createLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const mockError = new DatabaseError(
        "failed to create location: MongooseError"
      );
      mockLocationRepository.createLocation.mockRejectedValue(mockError);

      await expect(locationService.createLocation(newLocation)).rejects.toThrow(
        HttpError
      );
      expect(mockLocationRepository.createLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const handledError = errorHandlerService.handleError(mockError);
      mockLocationRepository.createLocation.mockRejectedValue(handledError);

      await expect(locationService.createLocation(newLocation)).rejects.toThrow(
        HttpError
      );
      expect(mockLocationRepository.createLocation).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /locations/:id", () => {
    it("should update a location successfully", async () => {
      mockLocationRepository.updateLocation.mockResolvedValue(mockLocation);

      const result = await locationService.updateLocation(
        "67f5237dcaf56ff295efd4a9",
        mockLocation
      );

      expect(result).toEqual({
        message: "location updated successfully",
        data: mockLocation,
      });
      expect(mockLocationRepository.updateLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9",
        mockLocation
      );
    });

    it("should throw BadRequestError for invalid id", async () => {
      await expect(
        locationService.updateLocation("invalid-id", mockLocation)
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.updateLocation).not.toHaveBeenCalled();
    });

    it("should throw NotFoundError when location not found", async () => {
      mockLocationRepository.updateLocation.mockResolvedValue(null);

      await expect(
        locationService.updateLocation("67f5237dcaf56ff295efd4a9", mockLocation)
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle UniqueConstraintError", async () => {
      const mockError = new UniqueConstraintError("location", "name");
      mockLocationRepository.updateLocation.mockRejectedValue(mockError);

      await expect(
        locationService.updateLocation("67f5237dcaf56ff295efd4a9", mockLocation)
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.updateLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9",
        mockLocation
      );
      expect(mockLocationRepository.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const mockError = new DatabaseError(
        "failed to update location: MongooseError"
      );
      mockLocationRepository.updateLocation.mockRejectedValue(mockError);

      await expect(
        locationService.updateLocation("67f5237dcaf56ff295efd4a9", mockLocation)
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const handledError = errorHandlerService.handleError(mockError);
      mockLocationRepository.updateLocation.mockRejectedValue(handledError);

      await expect(
        locationService.updateLocation("67f5237dcaf56ff295efd4a9", mockLocation)
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.updateLocation).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /locations/:id", () => {
    it("should delete a location successfully", async () => {
      mockLocationRepository.deleteLocation.mockResolvedValue(mockLocation);

      const result = await locationService.deleteLocation(
        "67f5237dcaf56ff295efd4a9"
      );

      expect(result).toEqual({
        message: "location deleted successfully",
        data: mockDeleteMessageResponse.data,
      });
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should throw BadRequestError for invalid id", async () => {
      await expect(
        locationService.deleteLocation("invalid-id")
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.deleteLocation).not.toHaveBeenCalled();
    });

    it("should throw NotFoundError when location not found", async () => {
      mockLocationRepository.deleteLocation.mockResolvedValue(null);

      await expect(
        locationService.deleteLocation("67f5237dcaf56ff295efd4a9")
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const mockError = new DatabaseError(
        "failed to delete location: MongooseError"
      );
      mockLocationRepository.deleteLocation.mockRejectedValue(mockError);

      await expect(
        locationService.deleteLocation("67f5237dcaf56ff295efd4a9")
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const handledError = errorHandlerService.handleError(mockError);
      mockLocationRepository.deleteLocation.mockRejectedValue(handledError);

      await expect(
        locationService.deleteLocation("67f5237dcaf56ff295efd4a9")
      ).rejects.toThrow(HttpError);
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationRepository.deleteLocation).toHaveBeenCalledTimes(1);
    });
  });
});
