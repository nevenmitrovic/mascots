import { FormInputConfig } from "./formTypes";

export interface Event {
  _id?: string;
  date: string;
  time: string;
  location: string[];
  maskotas: string[];
  animators: string[];
  price: string;
  title: string;
  collector: string;
  confirmed: string;
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
    name: "location",
    label: "Lokacija",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "lokacija1", label: "Beograd" },
      { value: "lokacija2", label: "Novi Sad" },
      { value: "lokacija3", label: "Niš" },
      { value: "lokacija4", label: "Kragujevac" },
    ],
  },
  {
    name: "maskotas",
    label: "Maskote",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "maskota1", label: "Miki Maus" },
      { value: "maskota2", label: "Elsa" },
      { value: "maskota3", label: "Spajdermen" },
      { value: "maskota4", label: "Pepa Prase" },
    ],
  },
  {
    name: "animators",
    label: "Animatori",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "1", label: "Novi Beograd" },
      { value: "2", label: "Ub" },
      { value: "3", label: "Niiiiiis" },
    ],
  },
  {
    name: "price",
    label: "Cena",
    type: "text",
    sx: { mb: "2rem" },
  },
];
