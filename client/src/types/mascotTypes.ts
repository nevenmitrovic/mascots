import { type FormInputConfig } from "./formTypes";

export type Mascot = {
  name: string;
  quantity: number;
};

export type MascotDocument = Mascot & { _id: string };

export const mascotInputs: FormInputConfig<Mascot>[] = [
  { name: "name", label: "Ime", type: "text", sx: { mb: "2rem" } },
  { name: "quantity", label: "Količina", type: "text", sx: { mb: "2rem" } },
];
