import { FormInputConfig } from "./formTypes";

import { Location } from "./locationTypes";

export interface EventCardProps {
  id: string | null;
}

export type confirmedType = "pending" | "confirmed" | "rejected";

export interface IEvent {
  _id?: string;
  date: string;
  time: string;
  location: Omit<Location, "_id" | "name" | "phone">[];
  mascots: string[];
  animators: string[];
  price: string;
  title: string;
  collector: string;
  confirmed: confirmedType;
}

// MOCK DATA
export const eventFormInputs: FormInputConfig<any>[] = [
  {
    name: "date",
    label: "Datum događaja",
    type: "text",
    sx: { mb: "2rem" },
  },
  {
    name: "time",
    label: "Vreme događaja",
    type: "text",
    sx: { mb: "2rem" },
  },
  {
    name: "title",
    label: "Naziv događaja",
    type: "text",
    sx: { mb: "2rem" },
  },
  {
    name: "location",
    label: "Lokacija",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      {
        value: "https://maps.app.goo.gl/Fj6R7U4AaD9wfsWL9",
        label: "Igraonica Test3",
      },
      {
        value: "https://maps.app.goo.gl/Fj6R7U4AaD9wfsWL9",
        label: "Igraonica Test2",
      },
      {
        value: "https://maps.app.goo.gl/Fj6R7U4AaD9wfsWL9",
        label: "Igraonica Test",
      },
      { value: "none", label: "Lokacija nije u ponudi" },
    ],
  },
  {
    name: "customLocationAddress",
    label: "Adresa Lokacije",
    type: "text",
    sx: { mb: "2rem", display: `none` },
  },
  {
    name: "customLocationLink",
    label: "Google maps link Lokacije",
    type: "text",
    sx: { mb: "2rem", display: `none` },
  },
  {
    name: "maskotas",
    label: "Maskote",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "1", label: "Elsa" },
      { value: "2", label: "Spajdermen" },
      { value: "3", label: "Pepa Prase" },
    ],
  },
  {
    name: "animators",
    label: "Animatori",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "1", label: "Neven" },
      { value: "2", label: "Igor" },
      { value: "3", label: "Neki Lik" },
    ],
  },
  {
    name: "price",
    label: "Cena",
    type: "text",
    sx: { mb: "2rem" },
  },
];
