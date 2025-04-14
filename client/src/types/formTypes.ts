import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { Control, FieldValues, Path, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options?: { value: string; label: string }[];
  type: "text" | "select";
  sx?: SxProps<Theme>;
};

export type FormInputConfig<T extends FieldValues> = Omit<
  FormInputProps<T>,
  "control"
>;

export type FormProps<T extends FieldValues> = {
  formInputs: FormInputConfig<T>[];
  handleFormSubmitt: SubmitHandler<T>;
  schema: yup.ObjectSchema<T>;
  item?: T;
};
