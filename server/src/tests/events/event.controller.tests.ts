import request from "supertest";
import { NextFunction, Request, Response } from "express";
import express from "express";

import { EventController } from "../../events/event.controller";
import { EventRepository } from "../../events/event.repository";
import { errorMiddleware } from "../../middlewares/error.middleware";
import { ErrorHandlerService } from "../../services/error-handler.service";

import { HttpError } from "../../errors/http.error";
import { NotFoundError } from "../../errors/not-found.error";
import { BadRequestError } from "../../errors/bad-request.error";
import { DatabaseError } from "../../errors/database.error";
import { UniqueConstraintError } from "../../errors/unique-constraint.error";
import { EventService } from "events/event.service";

import {
  newEventDocs,
  eventDoc,
  createdEvent,
  newEventClient,
} from "../../../mocks/mock-data";

jest.mock("../../events/event.service");

describe("Event Controller with errorMiddleware and errorHandlerService", () => {
  let app: express.Application;
  let mockEventService: jest.Mocked<EventService>;
  let eventController: EventController;
  let errorHandlerService: ErrorHandlerService;
  let validId = "1234567890abcdef12345678";
  let invalidId = "1234567890abcdef1234567";

  beforeAll(() => {
    // mock the animator service
    mockEventService = new EventService() as jest.Mocked<EventService>;
    (EventService as jest.Mock).mockImplementation(() => mockEventService);

    errorHandlerService = new ErrorHandlerService();
    eventController = new EventController();

    app = express();
    app.use(express.json());
    app.use(eventController.router);
    app.use(
      (err: HttpError, req: Request, res: Response, _next: NextFunction) => {
        errorMiddleware(err, req, res, _next);
      }
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    jest.resetAllMocks();
  });

  describe("GET /events", () => {
    it("should return all events", async () => {
      mockEventService.getEvents.mockResolvedValue(newEventDocs);

      const response = await request(app).get("/events");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newEventDocs);
    });
  });

  describe("POST /events", () => {
    it("should create a new event", async () => {
      const resolvedEvent = {
        message: "Event created successfully",
        data: createdEvent,
      };
      mockEventService.createEvent.mockResolvedValue(resolvedEvent);

      const response = await request(app).post("/events").send(newEventClient);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(resolvedEvent);
    });

    it("should return 400 if event data is invalid", async () => {
      const invalidEvent = {
        name: "",
        date: "invalid-date",
        location: "",
        description: "",
      };

      const response = await request(app).post("/events").send(invalidEvent);

      expect(response.status).toBe(400);
      expect(mockEventService.createEvent).not.toHaveBeenCalled();
    });
  });

  describe("PUT /events/:id", () => {
    it("should update an event", async () => {
      const resolvedEvent = {
        message: "Event updated successfully",
        data: eventDoc,
      };
      mockEventService.updateEvent.mockResolvedValue(resolvedEvent);

      const response = await request(app)
        .put(`/events/${validId}`)
        .send(newEventClient);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(resolvedEvent);
      expect(mockEventService.updateEvent).toHaveBeenCalledWith(
        validId,
        newEventClient
      );
    });

    it("should return 400 if event data is invalid", async () => {
      const invalidEvent = {
        name: "",
        date: "invalid-date",
        location: "",
        description: "",
      };

      const response = await request(app)
        .put(`/events/${validId}`)
        .send(invalidEvent);

      expect(response.status).toBe(400);
      expect(mockEventService.updateEvent).not.toHaveBeenCalled();
    });

    it("should return 404 if event is not found", async () => {
      mockEventService.updateEvent.mockRejectedValue(
        new NotFoundError("Event not found")
      );

      const response = await request(app)
        .put(`/events/${validId}`)
        .send(newEventClient);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Event not found",
        statusCode: 404,
      });
    });
  });

  describe("DELETE /events/:id", () => {
    it("should delete an event", async () => {
      const resolvedEvent = {
        message: "Event deleted successfully",
        data: eventDoc,
      };
      mockEventService.deleteEvent.mockResolvedValue(resolvedEvent);

      const response = await request(app).delete(`/events/${validId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(resolvedEvent);
    });

    it("should return 404 if event is not found", async () => {
      mockEventService.deleteEvent.mockRejectedValue(
        new NotFoundError("Event not found")
      );

      const response = await request(app).delete(`/events/${validId}`);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Event not found",
        statusCode: 404,
      });
    });

    it("should return 400 if id is invalid", async () => {
      const response = await request(app).delete(`/events/${invalidId}`);

      expect(response.status).toBe(400);
      expect(mockEventService.deleteEvent).not.toHaveBeenCalled();
    });
  });
});
