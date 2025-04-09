import { Request, Response, NextFunction } from "express";
import request from "supertest";
import express from "express";
import { LocationController } from "../locations/location.controller";
import { LocationService } from "../locations/location.service";
import { ILocationDocument } from "../locations/location.model";
import { errorMiddleware } from "../middlewares/error.middleware";
import { HttpError } from "../errors/http.error";
import { ErrorHandlerService } from "../services/error-handler.service";

jest.mock("../locations/location.service");

describe("LocationController", () => {
  let app: express.Application;
  let mockLocationService: jest.Mocked<LocationService>;
  let errorHandlerService: jest.Mocked<ErrorHandlerService>;
  let locationController: LocationController;

  beforeEach(() => {
    jest.clearAllMocks();

    // 1. Kreiraj mock servis
    mockLocationService = new LocationService() as jest.Mocked<LocationService>;

    // 2. Mokauj LocationService konstruktor
    // Ovo će učiniti da svaka nova instanca LocationService bude tvoj mock
    (LocationService as jest.Mock).mockImplementation(
      () => mockLocationService
    );

    // 3. Tek sad kreiraj kontroler koji će interno koristiti mokovan servis
    locationController = new LocationController();

    errorHandlerService =
      new ErrorHandlerService() as jest.Mocked<ErrorHandlerService>;
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
      // Mock data
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

      // Mock service implementation
      mockLocationService.getLocations.mockResolvedValue(mockLocations);

      // Make request
      const response = await request(app).get("/locations").expect(200);

      // JSON serialization turns dates into strings, so we need to expect that
      const expectedLocations = mockLocations.map((loc) => ({
        ...loc,
        createdAt: loc.createdAt.toISOString(),
      }));

      // Assertions
      expect(response.body).toEqual(expectedLocations);
      expect(mockLocationService.getLocations).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /locations/:id", () => {
    it("should return a location by id with status 200", async () => {
      const mockDate = new Date();
      const mockLocation: ILocationDocument = {
        _id: "67f5237dcaf56ff295efd4a9",
        location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
        name: "Mock1",
        phone: "+381656196083",
        address: "Kralja Petra 41",
        createdAt: mockDate,
      };

      mockLocationService.getLocationById.mockResolvedValue(mockLocation);

      const response = await request(app)
        .get("/locations/67f5237dcaf56ff295efd4a9")
        .expect(200);

      expect(response.body).toEqual({
        ...mockLocation,
        createdAt: mockLocation.createdAt.toISOString(),
      });
      expect(mockLocationService.getLocationById).toHaveBeenCalledWith(
        "67f5237dcaf56ff295efd4a9"
      );
    });

    it("should handle error when id is not provided", async () => {
      mockLocationService.getLocationById.mockRejectedValue(
        new Error("Invalid ID")
      );

      await request(app).get("/locations/invalid").expect(500);
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

  // describe("PUT /locations/:id", () => {
  //   it("should update a location with status 200", async () => {
  //     const mockDate = new Date();
  //     const updateData = {
  //       name: "Updated Location",
  //       address: "Updated Address"
  //     };

  //     const updatedLocation = {
  //       _id: "67f5237dcaf56ff295efd4a9",
  //       location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
  //       name: "Updated Location",
  //       phone: "+381656196083",
  //       address: "Updated Address",
  //       createdAt: mockDate
  //     };

  //     mockLocationService.updateLocation.mockResolvedValue(updatedLocation);

  //     const response = await request(app)
  //       .put("/locations/67f5237dcaf56ff295efd4a9")
  //       .send(updateData)
  //       .expect(200);

  //     expect(response.body).toEqual({
  //       ...updatedLocation,
  //       createdAt: updatedLocation.createdAt.toISOString()
  //     });
  //     expect(mockLocationService.updateLocation).toHaveBeenCalledWith("67f5237dcaf56ff295efd4a9", updateData);
  //   });
  // });

  // describe("DELETE /locations/:id", () => {
  //   it("should delete a location with status 200", async () => {
  //     const mockDate = new Date();
  //     const deletedLocation = {
  //       _id: "67f5237dcaf56ff295efd4a9",
  //       location: "https://maps.app.goo.gl/RNH27NG3xDQipTFy6",
  //       name: "Mock1",
  //       phone: "+381656196083",
  //       address: "Kralja Petra 41",
  //       createdAt: mockDate
  //     };

  //     mockLocationService.deleteLocation.mockResolvedValue(deletedLocation);

  //     const response = await request(app)
  //       .delete("/locations/67f5237dcaf56ff295efd4a9")
  //       .expect(200);

  //     expect(response.body).toEqual({
  //       ...deletedLocation,
  //       createdAt: deletedLocation.createdAt.toISOString()
  //     });
  //     expect(mockLocationService.deleteLocation).toHaveBeenCalledWith("67f5237dcaf56ff295efd4a9");
  //   });
  // });
});
