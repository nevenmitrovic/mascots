import { FormInputConfig } from "./formTypes";
import { Location } from "./locationTypes";

export const eventInputs: FormInputConfig<Partial<Location>>[] = [
  { name: "name", label: "Ime", type: "text", sx: { mb: "2rem" } },
  { name: "address", label: "Adresa", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Telefon", type: "text", sx: { mb: "2rem" } },
  {
    //ovako treba da izgleda za select
    name: "location",
    label: "Link",
    type: "select",
    sx: { mb: "2rem" },
    options: [
      { value: "1", label: "Novi Beograd" },
      { value: "2", label: "Ub" },
      { value: "3", label: "Niiiiiis" },
    ],
  },
];
