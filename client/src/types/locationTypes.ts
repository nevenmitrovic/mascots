import { FormInputConfig } from "./formTypes";

export type Location = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: string;
};

//definition for table columns and form inputs

export const locationInputs: FormInputConfig<Partial<Location>>[] = [
  { name: "name", label: "Ime", type: "text", sx: { mb: "2rem" } },
  { name: "address", label: "Adresa", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Telefon", type: "text", sx: { mb: "2rem" } },
  { name: "location", label: "Link", type: "text", sx: { mb: "2rem" } },
];
