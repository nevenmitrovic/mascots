import { EventRepository } from "../../events/event.repository";

import { newEvent, newEventDocs } from "../../../mocks/mock-data";

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
        .mockResolvedValue(newEventDocs[0]);

      const res = await eventRepository.createEvent(newEvent);
      expect(res).toEqual(newEventDocs[0]);
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

      const res = await eventRepository.getEvents();
      expect(res).toEqual(newEventDocs);
      expect(mockGetEvents).toHaveBeenCalledTimes(1);
    });

    it("should handle database error", async () => {
      const dbError = new DatabaseError("failed to get events: MongooseError");
      const mockGetEvents = jest
        .spyOn(eventRepository, "getEvents")
        .mockRejectedValue(dbError);

      await expect(eventRepository.getEvents()).rejects.toThrow(dbError);
      expect(mockGetEvents).toHaveBeenCalledTimes(1);
    });

    it("should handle unknown error", async () => {
      const mockError = new Error("unknown error");
      const mockGetEvents = jest
        .spyOn(eventRepository, "getEvents")
        .mockRejectedValue(mockError);

      await expect(eventRepository.getEvents()).rejects.toThrow(mockError);
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
});
