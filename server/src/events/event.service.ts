import { EventRepository } from "events/event.repository";
import { AnimatorRepository } from "animators/animator.repository";

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
  IDeleteEventResponse,
  IEvent,
} from "events/event.model";

import { getDateFromData } from "utils/globalUtils";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Types } from "mongoose";
import { transporter } from "config/nodemailer";

dayjs.extend(utc);
dayjs.extend(timezone);

export class EventService {
  private eventRepository = new EventRepository();
  private animatorRepository = new AnimatorRepository();
  private errorHandler = new ErrorHandlerService();

  async createEvent(data: ICreateEventClient): Promise<ICreateEventResponse> {
    try {
      const repositoryData: ICreateEvent = getDateFromData(data);

      const res = await this.eventRepository.createEvent(repositoryData);
      this.sendMail(res.animators);

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

  async deleteEvent(id: string): Promise<IDeleteEventResponse> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const deletedEvent = await this.eventRepository.deleteEvent(id);
      if (!deletedEvent) {
        throw new NotFoundError("event not found");
      }

      return {
        message: "event deleted successfully",
        data: deletedEvent,
      };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  async patchEvent(id: string, data: Pick<IEvent, "confirmed" | "collector">) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestError("invalid id");
      }

      const patchedEvent = await this.eventRepository.patchEvent(id, data);
      if (!patchedEvent) {
        throw new NotFoundError("event not found");
      }

      return {
        message: "event patched successfully",
        data: patchedEvent,
      };
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }

  private async sendMail(ids: string[]): Promise<void> {
    try {
      const allAnimatorsEmails =
        await this.animatorRepository.getAnimatorsEmails();

      const filteredEmails = allAnimatorsEmails
        .filter((animator) => ids.includes(animator._id))
        .map((animator) => animator.email);

      // email will go to promotion section in inbox (this can be resolved by implementing @getbrevo package)
      await transporter.sendMail({
        from: '"prolearner" <nevenmitrovic4@gmail.com>',
        replyTo: "nevenmitrovic4@gmail.com, igor.sasic.coding@gmail.com",
        to: filteredEmails.join(", "),
        subject: "Dogadjaj kreiran",
        text:
          "Postovani,\n\n" +
          "Dogadjaj u kom ste navedeni je kreiran, molimo vas udjite na website i pogledajte detaljne informacije.\n\n" +
          "Srdacan pozdrav,\n" +
          "Vas nadredjeni.",
      });
    } catch (err) {
      const error = this.errorHandler.handleError(err as Error);
      throw error;
    }
  }
}
