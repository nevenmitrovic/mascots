import { getDateFromData } from "../../utils/globalUtils";

import { EventRepository } from "../../events/event.repository";
import { EventService } from "../../events/event.service";
import { ErrorHandlerService } from "../../services/error-handler.service";
import {
  createdEvent,
  newEvent,
  newEventClient,
  newEventDocs,
  eventDoc,
} from "../../../mocks/mock-data";

jest.mock("../../events/event.repository");

describe("Event Service", () => {
  let eventService: EventService;
  let mockEventRepository: EventRepository;
  let errorHandler: ErrorHandlerService;
  let validId = "67f5237dcaf56ff295efd4a9";
  let invalidId = "invalidId";

  beforeEach(() => {
    // Create the mock repository with mock methods
    mockEventRepository = {
      createEvent: jest.fn(),
      getEvents: jest.fn(),
      updateEvent: jest.fn(),
      deleteEvent: jest.fn(),
      // add other methods your repository has
    } as unknown as jest.Mocked<EventRepository>;

    // Reset the mock and set implementation
    jest.mocked(EventRepository).mockImplementation(() => mockEventRepository);

    errorHandler = new ErrorHandlerService();

    // If EventService accepts repository as constructor parameter:
    eventService = new EventService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /events", () => {
    it("should create an event successfully", async () => {
      const expectedResponse = {
        message: "event created successfully",
        data: createdEvent,
      };
      (mockEventRepository.createEvent as jest.Mock).mockResolvedValue(
        createdEvent
      );

      const result = await eventService.createEvent(newEventClient);

      expect(result).toEqual(expectedResponse);
      expect(mockEventRepository.createEvent).toHaveBeenCalledTimes(1);
      expect(mockEventRepository.createEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          date: expect.any(Date),
          location: expect.objectContaining({
            link: newEvent.location.link,
            address: newEvent.location.address,
          }),
          price: newEvent.price,
          title: newEvent.title,
          organizer: expect.objectContaining({
            name: newEvent.organizer.name,
            phone: newEvent.organizer.phone,
            social: newEvent.organizer.social,
          }),
          mascots: newEvent.mascots,
          animators: newEvent.animators,
          confirmed: newEvent.confirmed,
          collector: newEvent.collector,
        })
      );
    });
  });

  describe("GET /events", () => {
    it("should get events successfully", async () => {
      (mockEventRepository.getEvents as jest.Mock).mockResolvedValue(
        newEventDocs
      );

      const result = await eventService.getEvents(2025, 5);

      expect(result).toEqual(newEventDocs);
      expect(mockEventRepository.getEvents).toHaveBeenCalledWith(2025, 5);
      expect(mockEventRepository.getEvents).toHaveBeenCalledTimes(1);
    });
  });

  describe("PUT /events/:id", () => {
    it("should update an event successfully", async () => {
      (mockEventRepository.updateEvent as jest.Mock).mockResolvedValue(
        eventDoc
      );

      const result = await eventService.updateEvent(validId, newEventClient);

      expect(result).toEqual({
        message: "event updated successfully",
        data: eventDoc,
      });
      expect(mockEventRepository.updateEvent).toHaveBeenCalledWith(
        validId,
        expect.objectContaining({
          date: expect.any(Date),
          location: expect.objectContaining({
            link: newEvent.location.link,
            address: newEvent.location.address,
          }),
          price: newEvent.price,
          title: newEvent.title,
          organizer: expect.objectContaining({
            name: newEvent.organizer.name,
            phone: newEvent.organizer.phone,
            social: newEvent.organizer.social,
          }),
          mascots: newEvent.mascots,
          animators: newEvent.animators,
          confirmed: newEvent.confirmed,
          collector: newEvent.collector,
        })
      );
    });

    it("should throw an error if id is invalid", async () => {
      await expect(
        eventService.updateEvent(invalidId, newEventClient)
      ).rejects.toThrow("invalid id");
    });
  });

  describe("DELETE /events/:id", () => {
    it("should delete an event successfully", async () => {
      (mockEventRepository.deleteEvent as jest.Mock).mockResolvedValue(
        eventDoc
      );

      const result = await eventService.deleteEvent(validId);

      expect(result).toEqual({
        message: "event deleted successfully",
        data: eventDoc,
      });
      expect(mockEventRepository.deleteEvent).toHaveBeenCalledWith(validId);
    });

    it("should throw an error if id is invalid", async () => {
      await expect(eventService.deleteEvent(invalidId)).rejects.toThrow(
        "invalid id"
      );
    });
  });
});
