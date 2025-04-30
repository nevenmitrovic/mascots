import { EventRepository } from "events/event.repository";

import { ErrorHandlerService } from "services/error-handler.service";

import {
  IEventDocument,
  ICreateEvent,
  ICreatedEvent,
  ICreateEventClient,
} from "events/event.model";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export class EventService {
  private eventRepository = new EventRepository();
  private errorHandler = new ErrorHandlerService();

  async createEvent(data: ICreateEventClient): Promise<ICreatedEvent> {
    try {
      const { date, time, ...rest } = data;
      const utcDate = dayjs.utc(`${date} ${time}`).toDate();
      const repositoryData: ICreateEvent = { ...rest, date: utcDate };

      return await this.eventRepository.createEvent(repositoryData);
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async getEvents(year: number, month: number): Promise<IEventDocument[]> {
    try {
      return await this.eventRepository.getEvents(year, month);
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
