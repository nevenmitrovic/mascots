import { LocationRepository } from "../../locations/location.repository";
import {
  mockLocations,
  mockLocation,
  newLocation,
} from "../../../mocks/mock-data";
import { DatabaseError } from "../../errors/database.error";
import { UniqueConstraintError } from "../../errors/unique-constraint.error";

describe("Location Repository", () => {
  let locationRepository: LocationRepository;
  let validId = "67f5237dcaf56ff295efd4a9";

  beforeAll(() => {
    locationRepository = new LocationRepository();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /locations", () => {
    it("should return all locations", async () => {
      const mockGetLocations = jest
        .spyOn(locationRepository, "getLocations")
        .mockResolvedValue(mockLocations);

      const result = await locationRepository.getLocations();

      expect(result).toEqual(mockLocations);
      expect(mockGetLocations).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to create location: MongooseError"
      );
      const mockGetLocations = jest
        .spyOn(locationRepository, "getLocations")
        .mockRejectedValue(dbError);

      await expect(locationRepository.getLocations()).rejects.toThrow(
        DatabaseError
      );
      expect(mockGetLocations).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockGetLocations = jest
        .spyOn(locationRepository, "getLocations")
        .mockRejectedValue(mockError);

      await expect(locationRepository.getLocations()).rejects.toThrow(Error);
      expect(mockGetLocations).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /locations/:id", () => {
    it("should return location by id", async () => {
      const mockGetLocationById = jest
        .spyOn(locationRepository, "getLocationById")
        .mockResolvedValue(mockLocation);

      const result = await locationRepository.getLocationById(validId);

      expect(result).toEqual(mockLocation);
      expect(mockGetLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to create location: MongooseError"
      );
      const mockGetLocationById = jest
        .spyOn(locationRepository, "getLocationById")
        .mockRejectedValue(dbError);

      await expect(locationRepository.getLocationById(validId)).rejects.toThrow(
        DatabaseError
      );
      expect(mockGetLocationById).toHaveBeenCalledWith(validId);
      expect(mockGetLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockGetLocationById = jest
        .spyOn(locationRepository, "getLocationById")
        .mockRejectedValue(mockError);

      await expect(locationRepository.getLocationById(validId)).rejects.toThrow(
        Error
      );
      expect(mockGetLocationById).toHaveBeenCalledWith(validId);
      expect(mockGetLocationById).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /locations", () => {
    it("should create a new location", async () => {
      const mockCreateLocation = jest
        .spyOn(locationRepository, "createLocation")
        .mockResolvedValue(mockLocation);

      const result = await locationRepository.createLocation(newLocation);

      expect(result).toEqual(mockLocation);
      expect(mockCreateLocation).toHaveBeenCalledWith(newLocation);
      expect(mockCreateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to create location: MongooseError"
      );
      const mockCreateLocation = jest
        .spyOn(locationRepository, "createLocation")
        .mockRejectedValue(dbError);

      await expect(
        locationRepository.createLocation(newLocation)
      ).rejects.toThrow(DatabaseError);
      expect(mockCreateLocation).toHaveBeenCalledWith(newLocation);
      expect(mockCreateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unique constraint error", async () => {
      const uniqueError = new UniqueConstraintError("location", "uniqueName");
      const mockCreateLocation = jest
        .spyOn(locationRepository, "createLocation")
        .mockRejectedValue(uniqueError);

      await expect(
        locationRepository.createLocation(newLocation)
      ).rejects.toThrow(UniqueConstraintError);
      expect(mockCreateLocation).toHaveBeenCalledWith(newLocation);
      expect(mockCreateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockCreateLocation = jest
        .spyOn(locationRepository, "createLocation")
        .mockRejectedValue(mockError);

      await expect(
        locationRepository.createLocation(newLocation)
      ).rejects.toThrow(Error);
      expect(mockCreateLocation).toHaveBeenCalledWith(newLocation);
      expect(mockCreateLocation).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /locations/:id", () => {
    it("should update a location", async () => {
      const mockUpdateLocation = jest
        .spyOn(locationRepository, "updateLocation")
        .mockResolvedValue(mockLocation);

      const result = await locationRepository.updateLocation(
        validId,
        mockLocation
      );

      expect(result).toEqual(mockLocation);
      expect(mockUpdateLocation).toHaveBeenCalledWith(validId, mockLocation);
      expect(mockUpdateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to update location: MongooseError"
      );
      const mockUpdateLocation = jest
        .spyOn(locationRepository, "updateLocation")
        .mockRejectedValue(dbError);

      await expect(
        locationRepository.updateLocation(validId, mockLocation)
      ).rejects.toThrow(DatabaseError);
      expect(mockUpdateLocation).toHaveBeenCalledWith(validId, mockLocation);
      expect(mockUpdateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unique constraint error", async () => {
      const uniqueError = new UniqueConstraintError("location", "uniqueName");
      const mockUpdateLocation = jest
        .spyOn(locationRepository, "updateLocation")
        .mockRejectedValue(uniqueError);

      await expect(
        locationRepository.updateLocation(validId, mockLocation)
      ).rejects.toThrow(UniqueConstraintError);
      expect(mockUpdateLocation).toHaveBeenCalledWith(validId, mockLocation);
      expect(mockUpdateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockUpdateLocation = jest
        .spyOn(locationRepository, "updateLocation")
        .mockRejectedValue(mockError);

      await expect(
        locationRepository.updateLocation(validId, mockLocation)
      ).rejects.toThrow(Error);
      expect(mockUpdateLocation).toHaveBeenCalledWith(validId, mockLocation);
      expect(mockUpdateLocation).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /locations/:id", () => {
    it("should delete a location", async () => {
      const mockDeleteLocation = jest
        .spyOn(locationRepository, "deleteLocation")
        .mockResolvedValue(mockLocation);

      const result = await locationRepository.deleteLocation(validId);

      expect(result).toEqual(mockLocation);
      expect(mockDeleteLocation).toHaveBeenCalledWith(validId);
      expect(mockDeleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to delete location: MongooseError"
      );
      const mockDeleteLocation = jest
        .spyOn(locationRepository, "deleteLocation")
        .mockRejectedValue(dbError);

      await expect(locationRepository.deleteLocation(validId)).rejects.toThrow(
        DatabaseError
      );
      expect(mockDeleteLocation).toHaveBeenCalledWith(validId);
      expect(mockDeleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockDeleteLocation = jest
        .spyOn(locationRepository, "deleteLocation")
        .mockRejectedValue(mockError);

      await expect(locationRepository.deleteLocation(validId)).rejects.toThrow(
        Error
      );
      expect(mockDeleteLocation).toHaveBeenCalledWith(validId);
      expect(mockDeleteLocation).toHaveBeenCalledTimes(1);
    });
  });
});
