import { FormInputConfig } from "./formTypes";

export type Mascot = {
  _id: string;
  name: string;
  quantity: number;
};

export const mascotInputs: FormInputConfig<Partial<Mascot>>[] = [
  { name: "name", label: "Ime", type: "text", sx: { mb: "2rem" } },
  { name: "quantity", label: "Količina", type: "text", sx: { mb: "2rem" } },
];
