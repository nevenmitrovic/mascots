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
});
