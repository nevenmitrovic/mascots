import { EventRepository } from "../../events/event.repository";

import { newEvent, newEventDocs, createdEvent } from "../../../mocks/mock-data";

import { DatabaseError } from "../../errors/database.error";

describe("Events Repository", () => {
  let eventRepository: EventRepository;
  let validId = "67f5237dcaf56ff295efd4a9";

  beforeAll(() => {
    eventRepository = new EventRepository();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /events", () => {
    it("should create a new event", async () => {
      const mockCreateEvent = jest
        .spyOn(eventRepository, "createEvent")
        .mockResolvedValue(createdEvent);

      const res = await eventRepository.createEvent(newEvent);
      expect(res).toEqual(createdEvent);
      expect(mockCreateEvent).toHaveBeenCalledTimes(1);
      expect(mockCreateEvent).toHaveBeenCalledWith(newEvent);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to create event: MongooseError"
      );
      const mockCreateEvent = jest
        .spyOn(eventRepository, "createEvent")
        .mockRejectedValue(dbError);

      await expect(eventRepository.createEvent(newEvent)).rejects.toThrow(
        dbError
      );
      expect(mockCreateEvent).toHaveBeenCalledTimes(1);
      expect(mockCreateEvent).toHaveBeenCalledWith(newEvent);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockCreateEvent = jest
        .spyOn(eventRepository, "createEvent")
        .mockRejectedValue(mockError);

      await expect(eventRepository.createEvent(newEvent)).rejects.toThrow(
        mockError
      );
      expect(mockCreateEvent).toHaveBeenCalledTimes(1);
      expect(mockCreateEvent).toHaveBeenCalledWith(newEvent);
    });
  });

  describe("GET /events", () => {
    it("should get all events", async () => {
      const mockGetEvents = jest
        .spyOn(eventRepository, "getEvents")
        .mockResolvedValue(newEventDocs);

      const res = await eventRepository.getEvents(2025, 5);
      expect(res).toEqual(newEventDocs);
      expect(mockGetEvents).toHaveBeenCalledWith(2025, 5);
      expect(mockGetEvents).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError("failed to get events: MongooseError");
      const mockGetEvents = jest
        .spyOn(eventRepository, "getEvents")
        .mockRejectedValue(dbError);

      await expect(eventRepository.getEvents(2025, 5)).rejects.toThrow(dbError);
      expect(mockGetEvents).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockGetEvents = jest
        .spyOn(eventRepository, "getEvents")
        .mockRejectedValue(mockError);

      await expect(eventRepository.getEvents(2025, 5)).rejects.toThrow(
        mockError
      );
      expect(mockGetEvents).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /events/:id", () => {
    it("should get event by id", async () => {
      const mockGetEventById = jest
        .spyOn(eventRepository, "getEventById")
        .mockResolvedValue(newEventDocs[0]);

      const res = await eventRepository.getEventById(validId);
      expect(res).toEqual(newEventDocs[0]);
      expect(mockGetEventById).toHaveBeenCalledTimes(1);
      expect(mockGetEventById).toHaveBeenCalledWith(validId);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to get event by id: MongooseError"
      );
      const mockGetEventById = jest
        .spyOn(eventRepository, "getEventById")
        .mockRejectedValue(dbError);

      await expect(eventRepository.getEventById(validId)).rejects.toThrow(
        dbError
      );
      expect(mockGetEventById).toHaveBeenCalledTimes(1);
      expect(mockGetEventById).toHaveBeenCalledWith(validId);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockGetEventById = jest
        .spyOn(eventRepository, "getEventById")
        .mockRejectedValue(mockError);

      await expect(eventRepository.getEventById(validId)).rejects.toThrow(
        mockError
      );
      expect(mockGetEventById).toHaveBeenCalledTimes(1);
      expect(mockGetEventById).toHaveBeenCalledWith(validId);
    });
  });

  describe("PUT /events/:id", () => {
    it("should update event by id", async () => {
      const mockUpdateEvent = jest
        .spyOn(eventRepository, "updateEvent")
        .mockResolvedValue(newEventDocs[0]);

      const res = await eventRepository.updateEvent(validId, newEvent);
      expect(res).toEqual(newEventDocs[0]);
      expect(mockUpdateEvent).toHaveBeenCalledTimes(1);
      expect(mockUpdateEvent).toHaveBeenCalledWith(validId, newEvent);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to update event: MongooseError"
      );
      const mockUpdateEvent = jest
        .spyOn(eventRepository, "updateEvent")
        .mockRejectedValue(dbError);

      await expect(
        eventRepository.updateEvent(validId, newEvent)
      ).rejects.toThrow(dbError);
      expect(mockUpdateEvent).toHaveBeenCalledTimes(1);
      expect(mockUpdateEvent).toHaveBeenCalledWith(validId, newEvent);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockUpdateEvent = jest
        .spyOn(eventRepository, "updateEvent")
        .mockRejectedValue(mockError);

      await expect(
        eventRepository.updateEvent(validId, newEvent)
      ).rejects.toThrow(mockError);
      expect(mockUpdateEvent).toHaveBeenCalledTimes(1);
      expect(mockUpdateEvent).toHaveBeenCalledWith(validId, newEvent);
    });
  });

  describe("DELETE /events/:id", () => {
    it("should delete event by id", async () => {
      const mockDeleteEvent = jest
        .spyOn(eventRepository, "deleteEvent")
        .mockResolvedValue(newEventDocs[0]);

      const res = await eventRepository.deleteEvent(validId);
      expect(res).toEqual(newEventDocs[0]);
      expect(mockDeleteEvent).toHaveBeenCalledTimes(1);
      expect(mockDeleteEvent).toHaveBeenCalledWith(validId);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError(
        "failed to delete event: MongooseError"
      );
      const mockDeleteEvent = jest
        .spyOn(eventRepository, "deleteEvent")
        .mockRejectedValue(dbError);

      await expect(eventRepository.deleteEvent(validId)).rejects.toThrow(
        dbError
      );
      expect(mockDeleteEvent).toHaveBeenCalledTimes(1);
      expect(mockDeleteEvent).toHaveBeenCalledWith(validId);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockDeleteEvent = jest
        .spyOn(eventRepository, "deleteEvent")
        .mockRejectedValue(mockError);

      await expect(eventRepository.deleteEvent(validId)).rejects.toThrow(
        mockError
      );
      expect(mockDeleteEvent).toHaveBeenCalledTimes(1);
      expect(mockDeleteEvent).toHaveBeenCalledWith(validId);
    });
  });
});
