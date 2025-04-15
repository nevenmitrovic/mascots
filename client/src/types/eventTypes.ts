import { FormInputConfig } from "./formTypes";

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
      { value: "anim1", label: "Marko Marković" },
      { value: "anim2", label: "Ana Anić" },
      { value: "anim3", label: "Petar Petrović" },
    ],
  },
  {
    name: "price",
    label: "Cena",
    type: "text",
    sx: { mb: "2rem" },
  },
];
