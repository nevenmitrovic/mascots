import dayjs from "dayjs";

import { EventRepository } from "../../events/event.repository";
import { EventService } from "../../events/event.service";
import { ErrorHandlerService } from "../../services/error-handler.service";
import {
  createdEvent,
  newEvent,
  newEventClient,
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

  //   describe("GET /events", () => {
  //     it("should get events successfully", async () => {
  //       const year = 2023;
  //       const month = 10;
  //       const events = [
  //         {
  //           title: "Test Event 1",
  //           description: "Test Description 1",
  //           date: new Date(),
  //           time: "12:00",
  //           location: "Test Location 1",
  //         },
  //         {
  //           title: "Test Event 2",
  //           description: "Test Description 2",
  //           date: new Date(),
  //           time: "14:00",
  //           location: "Test Location 2",
  //         },
  //       ];

  //       mockEventRepository.getEvents.mockResolvedValue(events);

  //       const result = await eventService.getEvents(year, month);

  //       expect(result).toEqual(events);
  //       expect(mockEventRepository.getEvents).toHaveBeenCalledWith(year, month);
  //     });

  //     it("should handle error when getting events", async () => {
  //       const errorMessage = "Error getting events";
  //       const error = new Error(errorMessage);

  //       mockEventRepository.getEvents.mockRejectedValue(error);
  //       jest.spyOn(errorHandler, "handleError").mockReturnValue(error);

  //       await expect(eventService.getEvents(2023, 10)).rejects.toThrow(error);
  //       expect(mockEventRepository.getEvents).toHaveBeenCalled();
  //     });
  //   });
});
