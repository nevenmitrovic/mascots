import { Schema, model } from "mongoose";

export interface ILocationProp {
  link?: string;
  address: string;
}

export interface IOrganizer {
  name: string;
  phone: string;
  social: "facebook" | "instagram" | "viber" | "whatsapp";
}

export type confirmedType = "pending" | "confirmed" | "rejected";

export interface ICreateEvent {
  date: Date;
  location: ILocationProp;
  price: number;
  title: string;
  organizer: IOrganizer;
  mascots: string[];
  animators: string[];
  confirmed: confirmedType;
  collector: string[];
}
export interface ICreatedEvent extends ICreateEvent {
  _id: string;
}
export interface ICreateEventResponse {
  message: string;
  data: ICreatedEvent;
}
export interface ICreateEventClient extends Omit<ICreateEvent, "date"> {
  date: string;
  time: string;
}

export interface IEvent {
  date: Date;
  location: ILocationProp;
  title: string;
  price: number;
  organizer: IOrganizer;
  mascots: { name: string }[];
  animators: { username: string }[];
  confirmed: confirmedType;
  collector: { username: string }[];
}

export interface IEventDocument extends IEvent {
  _id: string;
}

const eventSchema = new Schema<IEvent>(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    location: {
      link: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    organizer: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      social: {
        type: String,
        enum: ["facebook", "instagram", "viber", "whatsapp"],
        required: true,
      },
    },
    mascots: [
      {
        type: Schema.Types.ObjectId,
        ref: "Mascot",
      },
    ],
    animators: [
      {
        type: Schema.Types.ObjectId,
        ref: "Animator",
      },
    ],
    confirmed: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "pending",
    },
    collector: [
      {
        type: Schema.Types.ObjectId,
        ref: "Animator",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const EventModel = model<IEvent>("Event", eventSchema);
