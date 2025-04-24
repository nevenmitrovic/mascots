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

export interface IEvent {
  date: Date;
  location: ILocationProp;
  price: number;
  organizer: IOrganizer;
  mascots: string[];
  animators: string[];
  confirmed: confirmedType;
  collector: string[];
}

export interface IEventDocument extends IEvent {
  _id: string;
}

const eventSchema = new Schema<IEventDocument>(
  {
    date: {
      type: Date,
      required: true,
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

export const EventModel = model<IEventDocument>("Event", eventSchema);
