import dayjs from "dayjs";

import { checkForErrors } from "utils/globalUtils";

import { EventModel, IEvent, IEventDocument } from "events/event.model";

export class EventRepository {
  private readonly eventModel = EventModel;

  async createEvent(data: IEvent): Promise<IEventDocument> {
    try {
      const res = await this.eventModel.create(data);
      return {
        ...res.toObject(),
        _id: res._id.toString(),
      } as IEventDocument;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getEvents(): Promise<IEventDocument[]> {
    try {
      return this.eventModel.find({});
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getEventById(id: string): Promise<IEventDocument | null> {
    try {
      return this.eventModel.findById(id);
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async updateEvent(id: string, data: IEvent): Promise<IEventDocument | null> {
    try {
      return this.eventModel.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async deleteEvent(id: string): Promise<IEventDocument | null> {
    try {
      return this.eventModel.findByIdAndDelete(id);
    } catch (err) {
      return checkForErrors(err);
    }
  }
}
