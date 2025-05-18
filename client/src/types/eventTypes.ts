export interface EventCardProps {
  id: string | null;
}

export type ConfirmedType = "pending" | "confirmed" | "rejected";

export type LocationSelect = { link: string; address: string };

export interface IOrganizer {
  name: string;
  phone: string;
  social: "facebook" | "instagram" | "viber" | "whatsapp";
}

export interface IEventFormType {
  date: string;
  time: string;
  location: Array<LocationSelect | "none">;
  customLocationAddress?: string;
  customLocationLink?: string;
  mascots: string[];
  animators: string[];
  price: string;
  title: string;
  name: string;
  phone: string;
  social: Array<"facebook" | "instagram" | "viber" | "whatsapp">;
}

export interface IEventFormTypeDocument extends IEventFormType {
  _id: string;
}

export interface ICreateEvent {
  date: string;
  time: string;
  location: LocationSelect;
  mascots: string[];
  animators: string[];
  price: string;
  title: string;
  organizer: IOrganizer;
}

export interface ICreateEventDocument extends ICreateEvent {
  _id: string;
}

export interface IEvent {
  _id: string;
  date: Date;
  location: LocationSelect;
  title: string;
  price: number;
  organizer: IOrganizer;
  mascots: { name: string; _id: string }[];
  animators: { username: string; _id: string }[];
  confirmed: ConfirmedType;
  collector: { username: string; _id: string }[];
}
