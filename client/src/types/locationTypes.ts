import { FormInputConfig } from "./formTypes";
//location type for creating or editing
export type Location = {
  name: string;
  address: string;
  phone: string;
  location: string;
};
//location type fetched from the backend
export type LocationDocument = Location & {
  _id: string;
};

//definition for table columns and form inputs

export const locationInputs: FormInputConfig<Location>[] = [
  { name: "name", label: "Ime", type: "text", sx: { mb: "2rem" } },
  { name: "address", label: "Adresa", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Telefon", type: "text", sx: { mb: "2rem" } },
  { name: "location", label: "Link", type: "text", sx: { mb: "2rem" } },
];
