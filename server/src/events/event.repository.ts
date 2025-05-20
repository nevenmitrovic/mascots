import { checkForErrors, getRangeForDates } from "utils/globalUtils";

import {
  EventModel,
  ICreateEvent,
  IEventDocument,
  ICreatedEvent,
  IUpdateEvent,
  IEvent,
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
          { path: "collector", select: "_id username" },
          { path: "animators", select: "_id username" },
          { path: "mascots", select: "_id name" },
        ])
        .lean<IEventDocument[]>()
        .exec();

      return events;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async updateEvent(
    id: string,
    data: IUpdateEvent
  ): Promise<IEventDocument | null> {
    try {
      const event = await this.eventModel
        .findByIdAndUpdate(id, data, {
          new: true,
        })
        .populate([
          { path: "collector", select: "-_id username" },
          { path: "animators", select: "-_id username" },
          { path: "mascots", select: "-_id name" },
        ])
        .lean<IEventDocument>()
        .exec();

      return event;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async deleteEvent(id: string): Promise<IEventDocument | null> {
    try {
      const event = await this.eventModel
        .findByIdAndDelete(id)
        .populate([
          { path: "collector", select: "-_id username" },
          { path: "animators", select: "-_id username" },
          { path: "mascots", select: "-_id name" },
        ])
        .lean<IEventDocument>()
        .exec();

      return event;
    } catch (err) {
      return checkForErrors(err);
    }
  }

  async patchEvent(
    id: string,
    data: Pick<IEvent, "confirmed" | "collector">
  ): Promise<IEventDocument | null> {
    try {
      const event = await this.eventModel
        .findByIdAndUpdate(
          id,
          { $set: data },
          {
            new: true,
            runValidators: true,
          }
        )
        .populate([{ path: "collector", select: "-_id username" }])
        .lean<IEventDocument>()
        .exec();

      return event;
    } catch (err) {
      return checkForErrors(err);
    }
  }
}
