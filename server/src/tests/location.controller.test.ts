import request from "supertest";
import { NextFunction, Request, Response } from "express";
import express from "express";
import { LocationController } from "../locations/location.controller";
import { LocationService } from "../locations/location.service";
import { ErrorHandlerService } from "../services/error-handler.service";
import { errorMiddleware } from "../middlewares/error.middleware";
import {
  mockLocations,
  mockLocation,
  mockDeleteMessageResponse,
  updateData,
  uniqueData,
  updatedLocation,
  newLocation,
  createdLocation,
  newLocationBadRequest,
  newLocationBadRequestName,
} from "../../mock-data/mock-data";
import { HttpError } from "../errors/http.error";
import { NotFoundError } from "../errors/not-found.error";
import { BadRequestError } from "../errors/bad-request.error";
import { DatabaseError } from "../errors/database.error";
import { UniqueConstraintError } from "../errors/unique-constraint.error";

jest.mock("../locations/location.service");

describe("Location Controller with errorMiddleware and validationMiddleware", () => {
  let app: express.Application;
  let mockLocationService: jest.Mocked<LocationService>;
  let locationController: LocationController;
  let errorHandlerService: ErrorHandlerService;

  beforeEach(() => {
    jest.clearAllMocks();

    // implementation of mockLocationService
    mockLocationService = new LocationService() as jest.Mocked<LocationService>;
    (LocationService as jest.Mock).mockImplementation(
      () => mockLocationService
    );

    errorHandlerService = new ErrorHandlerService();
    locationController = new LocationController();

    app = express();
    app.use(express.json());
    app.use(locationController.router);
    app.use(
      (err: HttpError, req: Request, res: Response, _next: NextFunction) => {
        errorMiddleware(err, req, res, _next);
      }
    );
  });

  describe("GET /locations", () => {
    it("should return all locations with status 200", async () => {
      mockLocationService.getLocations.mockResolvedValue(mockLocations);

      const response = await request(app).get("/locations").expect(200);

      const expectedLocations = mockLocations.map((loc) => ({
        ...loc,
        createdAt: loc.createdAt?.toISOString(),
      }));

      expect(response.body).toEqual(expectedLocations);
      expect(mockLocationService.getLocations).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error in location repository");
      mockLocationService.getLocations.mockRejectedValue(mockError);

      const response = await request(app).get("/locations").expect(500);

      expect(response.body).toEqual({
        message: "unknown error in location repository",
        statusCode: 500,
        name: "Error",
      });
      expect(mockLocationService.getLocations).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an database throw error ", async () => {
      const mockError = new DatabaseError(
        "failed to get locations: MongooseError"
      );
      mockLocationService.getLocations.mockRejectedValue(mockError);

      const response = await request(app).get("/locations").expect(500);

      expect(response.body).toEqual({
        message: "failed to get locations: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockLocationService.getLocations).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /locations/:id", () => {
    it("should return a location by id with status 200", async () => {
      mockLocationService.getLocationById.mockResolvedValue(mockLocation);

      const response = await request(app)
        .get("/locations/67f5237dcaf56ff295efd4a9")
        .expect(200);

      expect(response.body).toEqual({
        ...mockLocation,
        createdAt: mockLocation.createdAt?.toISOString(),
      });
      expect(mockLocationService.getLocationById).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.getLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle error when id is not valid", async () => {
      const mockError = new BadRequestError("invalid id");
      mockLocationService.getLocationById.mockRejectedValue(mockError);

      const response = await request(app)
        .get("/locations/invalid-id")
        .expect(400);

      expect(response.body).toEqual({
        message: "invalid id",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockLocationService.getLocationById).toHaveBeenCalledWith(
        "invalid-id"
      );
      expect(mockLocationService.getLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle error when location is not found", async () => {
      const mockError = new NotFoundError("location not found");
      mockLocationService.getLocationById.mockRejectedValue(mockError);

      const response = await request(app)
        .get("/locations/67f5237dcaf56ff295efd4a9")
        .expect(404);

      expect(response.body).toEqual({
        message: "location not found",
        statusCode: 404,
        name: "NotFoundError",
      });
      expect(mockLocationService.getLocationById).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.getLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error in location repository");
      mockLocationService.getLocationById.mockRejectedValue(mockError);

      const response = await request(app)
        .get("/locations/67f5237dcaf56ff295efd4a9")
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error in location repository",
        statusCode: 500,
        name: "Error",
      });
      expect(mockLocationService.getLocationById).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.getLocationById).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an database throw error ", async () => {
      const mockError = new DatabaseError(
        "failed to get location by id: MongooseError"
      );
      mockLocationService.getLocationById.mockRejectedValue(mockError);

      const response = await request(app)
        .get("/locations/67f5237dcaf56ff295efd4a9")
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to get location by id: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockLocationService.getLocationById).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.getLocationById).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /locations", () => {
    it("should create a location with status 201", async () => {
      mockLocationService.createLocation.mockResolvedValue(createdLocation);

      const response = await request(app)
        .post("/locations")
        .send(newLocation)
        .expect(201);

      expect(response.body).toEqual({
        message: "location created successfully",
        data: {
          ...newLocation,
          _id: "67f5999dcaf56ff295efd4a9",
          createdAt: createdLocation.data.createdAt?.toISOString(),
        },
      });
      expect(mockLocationService.createLocation).toHaveBeenCalledWith(
        newLocation
      );
      expect(mockLocationService.createLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error with bad request when location is not valid", async () => {
      const mockError = new BadRequestError(
        "location must be a valid Google Maps link (https://maps.app.goo.gl/...)"
      );
      mockLocationService.createLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .post("/locations")
        .send(newLocationBadRequest)
        .expect(400);

      expect(response.body).toEqual({
        message:
          "location must be a valid Google Maps link (https://maps.app.goo.gl/...)",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockLocationService.createLocation).toHaveBeenCalledTimes(0);
    });

    it("should handle error with bad request name required", async () => {
      const mockError = new BadRequestError("name is required");
      mockLocationService.createLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .post("/locations")
        .send(newLocationBadRequestName)
        .expect(400);

      expect(response.body).toEqual({
        message: "name is required",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockLocationService.createLocation).toHaveBeenCalledTimes(0);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error in location repository");
      mockLocationService.createLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .post("/locations")
        .send(newLocation)
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error in location repository",
        statusCode: 500,
        name: "Error",
      });
      expect(mockLocationService.createLocation).toHaveBeenCalledWith(
        newLocation
      );
      expect(mockLocationService.createLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when a database error occurs", async () => {
      const mockError = new DatabaseError(
        "failed to create location: MongooseError"
      );
      mockLocationService.createLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .post("/locations")
        .send(newLocation)
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to create location: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockLocationService.createLocation).toHaveBeenCalledWith(
        newLocation
      );
      expect(mockLocationService.createLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when unique constraint error occurs", async () => {
      const mockError = new UniqueConstraintError(
        "location",
        uniqueData.location
      );
      const handledError = errorHandlerService.handleError(mockError);
      mockLocationService.createLocation.mockRejectedValue(handledError);

      const response = await request(app)
        .post("/locations")
        .send(newLocation)
        .expect(409);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("statusCode");
      expect(response.body).toHaveProperty("name");
      expect(mockLocationService.createLocation).toHaveBeenCalledWith(
        newLocation
      );
      expect(mockLocationService.createLocation).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /locations/:id", () => {
    it("should update a location with status 200", async () => {
      mockLocationService.updateLocation.mockResolvedValue(updatedLocation);

      const response = await request(app)
        .put("/locations/67f5237dcaf56ff295efd4a9")
        .send(updateData)
        .expect(200);

      expect(response.body).toEqual({
        message: "location updated successfully",
        data: {
          ...updatedLocation.data,
          createdAt: updatedLocation.data.createdAt?.toISOString(),
        },
      });
      expect(mockLocationService.updateLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9",
        updateData
      );
      expect(mockLocationService.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error with bad request when location is not valid", async () => {
      const mockError = new BadRequestError(
        "location must be a valid Google Maps link (https://maps.app.goo.gl/...)"
      );
      mockLocationService.createLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .put("/locations/67f5237dcaf56ff295efd4a9")
        .send(newLocationBadRequest)
        .expect(400);

      expect(response.body).toEqual({
        message:
          "location must be a valid Google Maps link (https://maps.app.goo.gl/...)",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockLocationService.updateLocation).toHaveBeenCalledTimes(0);
    });

    it("should handle error when location is not found", async () => {
      const mockError = new NotFoundError("location not found");
      mockLocationService.updateLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .put("/locations/67f5237dcaf56ff295efd4a9")
        .send(updateData)
        .expect(404);

      expect(response.body).toEqual({
        message: "location not found",
        statusCode: 404,
        name: "NotFoundError",
      });
      expect(mockLocationService.updateLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9",
        updateData
      );
      expect(mockLocationService.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when id is not valid", async () => {
      const mockError = new BadRequestError("invalid id");
      mockLocationService.updateLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .put("/locations/invalid-id")
        .send(updateData)
        .expect(400);

      expect(response.body).toEqual({
        message: "invalid id",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockLocationService.updateLocation).toHaveBeenCalledWith(
        "invalid-id",
        updateData
      );
      expect(mockLocationService.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error in location repository");
      mockLocationService.updateLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .put("/locations/67f5237dcaf56ff295efd4a9")
        .send(updateData)
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error in location repository",
        statusCode: 500,
        name: "Error",
      });
      expect(mockLocationService.updateLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9",
        updateData
      );
      expect(mockLocationService.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an database throw error ", async () => {
      const mockError = new DatabaseError(
        "failed to update location: MongooseError"
      );
      mockLocationService.updateLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .put("/locations/67f5237dcaf56ff295efd4a9")
        .send(updateData)
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to update location: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockLocationService.updateLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9",
        updateData
      );
      expect(mockLocationService.updateLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when unique constraint error occurs", async () => {
      const mockError = new UniqueConstraintError(
        "location",
        uniqueData.location
      );
      const handledError = errorHandlerService.handleError(mockError);
      mockLocationService.updateLocation.mockRejectedValue(handledError);

      const response = await request(app)
        .put("/locations/67f5237dcaf56ff295efd4a9")
        .send(uniqueData)
        .expect(409);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("statusCode");
      expect(response.body).toHaveProperty("name");
      expect(mockLocationService.updateLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9",
        uniqueData
      );
      expect(mockLocationService.updateLocation).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /locations/:id", () => {
    it("should delete a location with status 200", async () => {
      mockLocationService.deleteLocation.mockResolvedValue(
        mockDeleteMessageResponse
      );

      const response = await request(app)
        .delete("/locations/67f5237dcaf56ff295efd4a9")
        .expect(200);

      expect(response.body).toEqual({
        message: "location deleted successfully",
        data: {
          ...mockDeleteMessageResponse.data,
          createdAt: mockDeleteMessageResponse.data.createdAt?.toISOString(),
        },
      });
      expect(mockLocationService.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when location is not found", async () => {
      const mockError = new NotFoundError("location not found");
      mockLocationService.deleteLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .delete("/locations/67f5237dcaf56ff295efd4a9")
        .expect(404);

      expect(response.body).toEqual({
        message: "location not found",
        statusCode: 404,
        name: "NotFoundError",
      });
      expect(mockLocationService.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when id is not valid", async () => {
      const mockError = new BadRequestError("invalid id");
      mockLocationService.deleteLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .delete("/locations/insadd213gdgfas1324")
        .expect(400);

      expect(response.body).toEqual({
        message: "invalid id",
        statusCode: 400,
        name: "BadRequestError",
      });
      expect(mockLocationService.deleteLocation).toHaveBeenCalledWith(
        "insadd213gdgfas1324"
      );
      expect(mockLocationService.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when location is not found", async () => {
      const mockError = new NotFoundError("location not found");
      mockLocationService.deleteLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .delete("/locations/67f5237dcaf56ff295efd4a9")
        .expect(404);

      expect(response.body).toEqual({
        message: "location not found",
        statusCode: 404,
        name: "NotFoundError",
      });
      expect(mockLocationService.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an unknown error occurs", async () => {
      const mockError = new Error("unknown error in location repository");
      mockLocationService.deleteLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .delete("/locations/67f5237dcaf56ff295efd4a9")
        .expect(500);

      expect(response.body).toEqual({
        message: "unknown error in location repository",
        statusCode: 500,
        name: "Error",
      });
      expect(mockLocationService.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.deleteLocation).toHaveBeenCalledTimes(1);
    });

    it("should handle error when an database throw error ", async () => {
      const mockError = new DatabaseError(
        "failed to delete location: MongooseError"
      );
      mockLocationService.deleteLocation.mockRejectedValue(mockError);

      const response = await request(app)
        .delete("/locations/67f5237dcaf56ff295efd4a9")
        .expect(500);

      expect(response.body).toEqual({
        message: "failed to delete location: MongooseError",
        statusCode: 500,
        name: "DatabaseError",
      });
      expect(mockLocationService.deleteLocation).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
      expect(mockLocationService.deleteLocation).toHaveBeenCalledTimes(1);
    });
  });
});
