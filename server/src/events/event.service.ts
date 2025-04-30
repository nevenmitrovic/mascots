import { EventRepository } from "events/event.repository";

import { ErrorHandlerService } from "services/error-handler.service";

import {
  IEventDocument,
  ICreateEvent,
  ICreatedEvent,
} from "events/event.model";

export class EventService {
  private eventRepository = new EventRepository();
  private errorHandler = new ErrorHandlerService();

  async createEvent(data: ICreateEvent): Promise<ICreatedEvent> {
    try {
      const res = await this.eventRepository.createEvent(data);
      return res;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getEvents(year: number, month: number): Promise<IEventDocument[]> {
    try {
      const res = await this.eventRepository.getEvents(year, month);

      return res;
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
