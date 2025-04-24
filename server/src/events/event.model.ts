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
  collector: string;
}
