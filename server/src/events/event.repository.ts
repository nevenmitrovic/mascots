import { checkForErrors, getRangeForDates } from "utils/globalUtils";

import {
  EventModel,
  ICreateEvent,
  IEventDocument,
  ICreatedEvent,
} from "events/event.model";

export class EventRepository {
  private readonly eventModel = EventModel;

  async createEvent(data: ICreateEvent): Promise<ICreatedEvent> {
    try {
      const res = await this.eventModel.create(data);
      return {
        ...res.toObject(),
        _id: res._id.toString(),
        mascots: res.mascots.map((mascot) => mascot.toString()),
        animators: res.animators.map((animator) => animator.toString()),
        collector: res.collector.map((collector) => collector.toString()),
      } as ICreatedEvent;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async getEvents(year: number, month: number): Promise<IEventDocument[]> {
    try {
      const { from, to } = getRangeForDates(year, month);

      const events = await this.eventModel
        .find({
          date: {
            $gte: from,
            $lt: to,
          },
        })
        .populate([
          { path: "collector", select: "-_id username" },
          { path: "animators", select: "-_id username" },
          { path: "mascots", select: "-_id name" },
        ])
        .lean<IEventDocument[]>()
        .exec();

      return events;
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

  async updateEvent(
    id: string,
    data: ICreateEvent
  ): Promise<IEventDocument | null> {
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
