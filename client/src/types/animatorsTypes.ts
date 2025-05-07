import { FormInputConfig } from "./formTypes";

export type Animator = {
  fullName: string;
  username: string;
  password?: string;
  email: string;
  phone: string;
  paycheck: number;
};

export type AnimatorTable = Omit<AnimatorDocument, "password">;

export type AnimatorDocument = Animator & {
  _id: string;
};

export const animatorInputs: FormInputConfig<Animator>[] = [
  { name: "fullName", label: "Puno Ime", type: "text", sx: { mb: "2rem" } },
  { name: "username", label: "Username", type: "text", sx: { mb: "2rem" } },
  { name: "email", label: "E-mail", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Telefon", type: "text", sx: { mb: "2rem" } },
  { name: "paycheck", label: "Dnevnica", type: "number", sx: { mb: "2rem" } },
  { name: "password", label: "Šifra", type: "password", sx: { mb: "2rem" } },
];

export const animatorTable = [
  { name: "fullName", label: "Puno Ime", type: "text", sx: { mb: "2rem" } },
  { name: "username", label: "Username", type: "text", sx: { mb: "2rem" } },
  { name: "email", label: "E-mail", type: "text", sx: { mb: "2rem" } },
  { name: "phone", label: "Telefon", type: "text", sx: { mb: "2rem" } },
  { name: "paycheck", label: "Dnevnica", type: "number", sx: { mb: "2rem" } },
]
