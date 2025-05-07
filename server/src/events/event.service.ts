import { EventRepository } from "events/event.repository";

import { ErrorHandlerService } from "services/error-handler.service";

import { BadRequestError } from "errors/bad-request.error";
import { NotFoundError } from "errors/not-found.error";

import {
  IEventDocument,
  ICreateEvent,
  IUpdateEvent,
  ICreateEventClient,
  ICreateEventResponse,
  IUpdateEventResponse,
  IUpdateEventClient,
} from "events/event.model";

import { getDateFromData } from "utils/globalUtils";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Types } from "mongoose";

dayjs.extend(utc);
dayjs.extend(timezone);

export class EventService {
  private eventRepository = new EventRepository();
  private errorHandler = new ErrorHandlerService();

  async createEvent(data: ICreateEventClient): Promise<ICreateEventResponse> {
    try {
      const repositoryData: ICreateEvent = getDateFromData(data);

      const res = await this.eventRepository.createEvent(repositoryData);

      return {
        message: "event created successfully",
        data: res,
      };
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

  async updateEvent(
    id: string,
    data: IUpdateEventClient
  ): Promise<IUpdateEventResponse> {
    try {
      if (!data) {
        throw new BadRequestError("data not provided");
      }
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const repositoryData: IUpdateEvent = getDateFromData(data);
      const updatedEvent = await this.eventRepository.updateEvent(
        id,
        repositoryData
      );
      if (!updatedEvent) {
        throw new NotFoundError("animator not found");
      }

      return {
        message: "event updated successfully",
        data: updatedEvent,
      };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
