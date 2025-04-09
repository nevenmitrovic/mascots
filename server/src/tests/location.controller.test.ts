import { Request, Response, NextFunction } from "express";
import request from "supertest";
import express from "express";
import { LocationController } from "../locations/location.controller";
import { LocationService } from "../locations/location.service";
import { ErrorHandlerService } from "../services/error-handler.service";
import {
  ILocation,
  ILocationDocument,
  ILocationMessageResponse,
} from "../locations/location.model";
import { errorMiddleware } from "../middlewares/error.middleware";
import { HttpError } from "../errors/http.error";
import { NotFoundError } from "../errors/not-found.error";
import { BadRequestError } from "../errors/bad-request.error";
import { DatabaseError } from "../errors/database.error";
import { UniqueConstraintError } from "../errors/unique-constraint.error";

jest.mock("../locations/location.service");

describe("LocationController", () => {
  let app: express.Application;
  let mockLocationService: jest.Mocked<LocationService>;
  let locationController: LocationController;
  let errorHandlerService: ErrorHandlerService;

  const mockDate = new Date();
  const mockLocations: ILocationDocument[] = [
    {
      _id: "67f5237dcaf56ff295efd4a9",
      location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
      name: "Mock1",
      phone: "+381656196083",
      address: "Kralja Petra 41",
      createdAt: mockDate,
    },
    {
      _id: "67f53c68bf7547741b0e2eef",
      location: "https://maps.app.goo.gl/RNH27NG3xDQipT",
      name: "Mock2",
      phone: "+381656196083",
      address: "Kralja Petra 41",
      createdAt: mockDate,
    },
    {
      _id: "67f55bcc755956e39523251a",
      location: "https://maps.app.goo.gl/RNH27NG3xDQipTqSSSSS",
      name: "Mock3",
      phone: "+381656196083",
      address: "Kralja Petra 41",
      createdAt: mockDate,
    },
    {
      _id: "67f5639fa26f52b544484236",
      location: "https://maps.app.goo.gl/RNH27NG3xDQipTqSSSS123123S",
      name: "Mock4",
      phone: "+381656196083",
      address: "Kralja Petra 41",
      createdAt: mockDate,
    },
  ];
  const mockLocation: ILocationDocument = {
    _id: "67f5237dcaf56ff295efd4a9",
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
    name: "Mock1",
    phone: "+381656196083",
    address: "Kralja Petra 41",
    createdAt: mockDate,
  };
  const mockDeleteMessageResponse: ILocationMessageResponse = {
    message: "location deleted successfully",
    data: {
      _id: "67f5237dcaf56ff295efd4a9",
      location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
      name: "Mock1",
      phone: "+381656196083",
      address: "Kralja Petra 41",
      createdAt: mockDate,
    },
  };
  const updateData: Partial<ILocation> = {
    name: "Updated Location",
    address: "Updated Address",
  };
  const uniqueData = {
    location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
  };
  const updatedLocation: ILocationMessageResponse = {
    message: "location updated successfully",
    data: {
      _id: "67f5237dcaf56ff295efd4a9",
      location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
      name: "Updated Location",
      phone: "+381656196083",
      address: "Updated Address",
      createdAt: mockDate,
    },
  };

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

  // describe("POST /locations", () => {
  //   it("should create a location with status 201", async () => {
  //     const mockDate = new Date();
  //     const newLocation = {
  //       location: "https://maps.app.goo.gl/new",
  //       name: "New Location",
  //       phone: "+381656196000",
  //       address: "New Address 123"
  //     };

  //     const createdLocation = {
  //       _id: "67f5999dcaf56ff295efd4a9",
  //       ...newLocation,
  //       createdAt: mockDate
  //     };

  //     mockLocationService.createLocation.mockResolvedValue(createdLocation);

  //     const response = await request(app)
  //       .post("/locations")
  //       .send(newLocation)
  //       .expect(201);

  //     expect(response.body).toEqual({
  //       ...createdLocation,
  //       createdAt: createdLocation.createdAt.toISOString()
  //     });
  //     expect(mockLocationService.createLocation).toHaveBeenCalledWith(newLocation);
  //   });
  // });

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
