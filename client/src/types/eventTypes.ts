import { type FormInputConfig } from "./formTypes";

export interface EventCardProps {
  id: string | null;
}

export type ConfirmedType = "pending" | "confirmed" | "rejected";

export type LocationSelect = { link: string; address: string };

export interface IEvent {
  _id?: string;
  date: string;
  time: string;
  location: LocationSelect;
  mascots: string[];
  animators: string[];
  price: string;
  title: string;
  collector: string;
  confirmed: ConfirmedType;
}

// MOCK DATA
export const eventFormInputs: FormInputConfig<any>[] = [
  {
    name: "date",
    label: "Datum događaja",
    type: "picker",
    sx: { mb: "2rem" },
  },
  {
    name: "time",
    label: "Vreme događaja",
    type: "picker",
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
        value: "https://maps.app.goo.gl/Fj6R7U4AaD9wfsWL91",
        label: "Igraonica Test3",
      },
      {
        value: "https://maps.app.goo.gl/Fj6R7U4AaD9wfsWL92",
        label: "Igraonica Test2",
      },
      {
        value: "https://maps.app.goo.gl/Fj6R7U4AaD9wfsWL93",
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
    name: "mascots",
    label: "Maskote",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "68079441488398d9cb229792", label: "Elsa" },
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
      { value: "6814b85276bf4fd4d785d8ef", label: "Neven" },
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
  {
    name: "name",
    label: "Ime organizatora",
    type: "text",
    sx: { mb: "2rem" },
  },
  {
    name: "phone",
    label: "Telefon",
    type: "number",
    sx: { mb: "2rem" },
  },
  {
    name: "social",
    label: "Način dogovora",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "facebook", label: "Facebook" },
      { value: "instagram", label: "Instagram" },
      { value: "viber", label: "Viber" },
      { value: "whatsapp", label: "Whats app" },
    ],
  },
];
